<template lang="pug">
  .carousel(
    ref="carousel"
    v-drag-up="stopDrag"
    v-drag-move="doDrag"
    v-click-down="startDrag"
  )
    slider.carousel_slider(
      ref="carouselSlider"
      @count-slides="countSlides"
    )
      slot
    .carousel_nav
      button.carousel_nav_previous(
        aria-label="Previous Slide"
        v-click-down="goTo.bind(null, -1)"
        @keydown.enter="goTo(-1, $event)"
      ) <
      button.carousel_nav_next(
        aria-label="Next Slide"
        v-click-down="goTo.bind(null, 1)"
        @keydown.enter="goTo(1, $event)"
      ) >
    .carousel_pagination
      button.carousel_pagination_btn(
        v-for="n in nbSlides"
        :aria-label="`Slide ${n}`"
        :class="{'carousel_pagination_btn--active': (n - 1) === (paginationPosition - nbSlides)}"
        v-click-down="goTo.bind(null, n + nbSlides - 1)"
        @keydown.enter="goTo(n + nbSlides - 1, $event)"
      )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Slider from './slider.vue'
import directives from './directives-carousel'

@Component({
  name: 'Carousel',
  components: {
    Slider,
  },
  directives: {
    'drag-up': directives.dragUp,
    'drag-move': directives.dragMove,
    'click-down': directives.clickDown,
  },
})

export default class Carousel extends Vue {

  $refs!: {
    carouselSlider: Vue;
    carousel: HTMLElement;
  }

  private delta = 0
  private nbSlides = 0
  private position = 0
  private dragOn = false
  private animationOn = false
  private animationDelay = 300
  private paginationPosition = 0
  private startPoint: number | undefined = undefined

  mounted() {
    this.defaultPosition()
    this.paginationPosition = this.nbSlides
  }

  public countSlides(payload: number): void {
    this.nbSlides = payload
  }

  public defaultPosition(): void {
    this.position = this.nbSlides
    this.positionSlider(false)
  }

  public positionSlider(animated = true): void {
    const el = this.$refs.carouselSlider.$el as HTMLElement
    if (animated) this.animateSlider()
    el.style.transform = `translateX(-${this.position * 100}%)`
  }

  public animateSlider(): void {
    this.animationOn = true
    const el = this.$refs.carouselSlider.$el as HTMLElement
    el.style.transition = `transform ease-in ${this.animationDelay}ms`
    setTimeout(() => {
      this.animationOn = false
      el.style.transition = ''
      if (this.position >= (this.nbSlides * 2) || this.position <= 0) this.defaultPosition()
    }, this.animationDelay)
  }

  public positionPagination(): void {
    if (this.position >= (this.nbSlides * 2) || this.position === 0) this.paginationPosition = this.nbSlides
    else if (this.position < this.nbSlides) this.paginationPosition = this.position + this.nbSlides
    else this.paginationPosition = this.position
  }

  public goTo(index: number, event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    if (!this.animationOn) {
      if (index === 1) this.position += 1
      else if (index === -1) this.position -= 1
      else this.position = index
      this.positionSlider()
      this.positionPagination()
    }
  }

  public startDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    if (!this.animationOn) {
      this.dragOn = true
      this.startPoint = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
    }
  }

  public doDrag(event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    if (this.dragOn && this.startPoint) {
      const clientx = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
      this.delta = ((clientx - this.startPoint) / this.$refs.carousel.offsetWidth) * 100 * -1
      const el = this.$refs.carouselSlider.$el as HTMLElement
      el.style.transform = `translateX(-${this.delta + (this.position * 100)}%)`
    }
  }

  public stopDrag(event: MouseEvent | TouchEvent): void {
    if (this.dragOn) {
      const roundDelta = Math.round(this.delta / 100)
      const btwZeroAndTen = this.delta > -10 && this.delta < 0 || this.delta > 0 && this.delta < 10
      if (this.delta === 0) this.goTo(1, event)
      else if (btwZeroAndTen) this.goTo(this.position, event)
      else if (this.delta >= 10 && roundDelta < 2) this.goTo(1, event)
      else if (this.delta <= -10 && roundDelta > -2) this.goTo(-1, event)
      else this.goTo(Math.round(this.delta / 100) + this.position, event)
      this.delta = 0
      this.dragOn = false
      this.startPoint = undefined
    }
  }

}
</script>

<style lang="sass">
.carousel
  width: inherit
  height: inherit
  overflow: hidden
  user-select: none
  position: relative
  touch-action: none

  &_slider
    margin: 0
    padding: 0
    display: flex
    width: inherit
    height: inherit

  &_nav
    top: 50%
    width: 100%
    z-index: 101
    display: flex
    position: absolute
    transform: translateY(-50%)
    justify-content: space-between

    &_previous, &_next
      padding: 0
      width: 50px
      height: 50px
      border: none
      color: white
      cursor: pointer
      font-size: 20px
      background-color: rgba(black, 0.8)

  &_pagination
    width: 100%
    bottom: 5px
    z-index: 100
    display: flex
    position: absolute
    justify-content: center

    &_btn
      padding: 0
      width: 15px
      height: 15px
      margin: 0 5px
      cursor: pointer
      border-radius: 100%
      border: 1px solid white
      background-color: transparent

      &--active
        background-color: white
</style>
