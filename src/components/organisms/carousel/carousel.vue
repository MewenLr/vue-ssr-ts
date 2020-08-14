<template lang="pug">
  .carousel(
    ref="carousel"
    :class="{'carousel--pagination': hasPagination}"
    v-drag-up="stopDrag"
    v-drag-move="doDrag"
    v-click-down="startDrag"
    v-resize-carousel="setSlideSize"
  )
    carousel-slider.carousel_slider(
      ref="carouselSlider"
      :is-infinite="isInfinite"
      @count-slides="countSlides"
    )
      slot
    carousel-navigation(
      :type="navigation"
      v-if="hasNavigation"
      @change-slide="goTo"
    )
    carousel-pagination(
      ref="carouselPagination"
      :type="pagination"
      :nbSlides="nbSlides"
      :position="position"
      :is-infinite="isInfinite"
      v-if="hasPagination"
      @select-slide="goTo"
    )
</template>

<script lang="ts">
import { wait } from '@/scripts/utils'
import { Component, Prop, Vue } from 'vue-property-decorator'
import directives from './directives-carousel'
import CarouselSlider from './carousel-slider.vue'
import CarouselPagination from './carousel-pagination.vue'
import CarouselNavigation from './carousel-navigation.vue'

const navigationValidator = ['arrow', 'none']
const paginationValidator = ['dash', 'dot', 'fraction', 'none']

@Component({
  name: 'Carousel',
  components: {
    CarouselSlider,
    CarouselPagination,
    CarouselNavigation,
  },
  // TODO: outsource directives
  directives: {
    'drag-up': directives.dragUp,
    'drag-move': directives.dragMove,
    'click-down': directives.clickDown,
    'resize-carousel': directives.resizeCarousel,
  },
})

export default class Carousel extends Vue {

  $refs!: {
    carousel: HTMLElement;
    carouselSlider: CarouselSlider;
    carouselPagination: CarouselPagination;
  }

  @Prop({ default: false }) private isCross!: boolean
  @Prop({ default: false }) private isInfinite!: boolean
  @Prop({
    default: 'dot',
    validator: (prop) => paginationValidator.includes(prop),
  }) private pagination!: string
  @Prop({
    default: 'arrow',
    validator: (prop) => navigationValidator.includes(prop),
  }) private navigation!: string

  private delta = 0
  private nbSlides = 0
  private position = 0
  private dragOn = false
  private animationOn = false
  private animationDelay = 300
  private startPoint: number | null = null

  get hasPagination(): boolean {
    return !!this.nbSlides && this.pagination !== 'none'
  }

  get hasNavigation(): boolean {
    return !!this.nbSlides && this.navigation !== 'none'
  }

  get compIsFirstIndex(): boolean {
    return this.position === 0
  }

  get compIsLastIndex(): boolean {
    return this.position === this.nbSlides - 1
  }

  get compGoNext(): boolean {
    return this.delta >= 10 && Math.round(this.delta / 100) < 2
  }

  get compGoPrevious(): boolean {
    return this.delta <= -10 && Math.round(this.delta / 100) > -2
  }

  mounted(): void {
    this.setSlideSize()
    this.defaultPosition()
  }

  public setSlideSize(): void {
    this.$refs.carouselSlider.$el.querySelectorAll('.carousel-slide').forEach((slide) => {
      const slideElement = slide as HTMLStyleElement
      slideElement.style.minWidth = `${this.$refs.carousel.offsetWidth * (this.isCross ? 0.8 : 1)}px`
      if (this.isCross) slideElement.style.padding = `0 ${this.$refs.carousel.offsetWidth * 0.025}px`
    })
  }

  public countSlides(payload: number): void {
    this.nbSlides = payload
  }

  public defaultPosition(): void {
    if (this.isInfinite) this.position = this.nbSlides
    else this.position = 0
    this.moveSlider(false)
  }

  public moveSlider(animated = true): void {
    const el = this.$refs.carouselSlider.$el as HTMLElement
    if (animated) this.animateSlider()
    el.style.transform = `translateX(-${this.position * (this.isCross ? 85 : 100)}%)`
  }

  public async animateSlider(): Promise<void> {
    this.animationOn = true
    const el = this.$refs.carouselSlider.$el as HTMLElement
    el.style.transition = `transform ease-in ${this.animationDelay}ms`
    await wait(this.animationDelay)
    this.animationOn = false
    el.style.transition = ''
    if (this.position >= (this.nbSlides * 2) || this.position <= 0) this.defaultPosition()
  }

  public goTo(index: number | string, event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    if (!this.animationOn) {
      if (index === 'next') this.position += 1
      else if (index === 'previous') this.position -= 1
      else if (typeof index !== 'string') this.position = index
      this.moveSlider()
      this.$refs.carouselPagination.movePagination()
    }
  }

  public startDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    if (!this.dragOn && !this.animationOn) {
      this.dragOn = true
      this.startPoint = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
    }
  }

  public doDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    if (this.dragOn && this.startPoint) {
      const clientx = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
      this.delta = ((clientx - this.startPoint) / this.$refs.carousel.offsetWidth) * 100 * -1
      const el = this.$refs.carouselSlider.$el as HTMLElement
      const translate = (this.delta + this.position * (this.isCross ? 85 : 100)) * -1
      el.style.transform = `translateX(${translate}%)`
    }
  }

  public stopDrag(event: MouseEvent | TouchEvent): void {
    // TODO: recheck normal slider && infinite slider && navigation && pagination
    if (this.dragOn) {
      const roundDelta = Math.round(this.delta / 100)
      const btwZeroAndTen = (this.delta > -10 && this.delta < 0) || (this.delta > 0 && this.delta < 10)

      if (
        (!this.isInfinite && this.compIsFirstIndex && this.compGoPrevious)
        || (!this.isInfinite && this.compIsLastIndex && this.compGoNext)
      ) this.goTo(this.position, event)
      else if (this.delta === 0) this.goTo('next', event)
      else if (btwZeroAndTen) this.goTo(this.position, event)
      else if (this.compGoNext) this.goTo('next', event)
      else if (this.compGoPrevious) this.goTo('previous', event)
      else this.goTo(roundDelta + this.position, event) // go next / previous position

      // if (this.delta === 0) this.goTo('next', event)
      // else if (btwZeroAndTen) this.goTo(this.position, event)
      // else if (this.delta >= 10 && roundDelta < 2) this.goTo('next', event)
      // else if (this.delta <= -10 && roundDelta > -2) this.goTo('previous', event)
      // else {
      //   console.log('position ', this.position)
      //   console.log('roundDelta ', roundDelta)
      //   console.log('goTo ', roundDelta + this.position)
      //   this.goTo(roundDelta + this.position, event) // go next / previous position
      // }

      this.delta = 0
      this.dragOn = false
      this.startPoint = null
    }
  }

}
</script>
