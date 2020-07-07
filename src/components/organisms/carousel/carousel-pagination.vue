<template lang="pug">
  .carousel-pagination(
    :class=`{
      'carousel-pagination--dot': mode === 'dot',
      'carousel-pagination--dash': mode === 'dash',
    }`
  )
    button.carousel-pagination_btn(
      :aria-label="`Slide ${n}`"
      :class="{'carousel-pagination_btn--active': (n - 1) === (paginationPosition - nbSlides)}"
      v-for="n in nbSlides"
      v-click-down="selectSlide.bind(null, n + nbSlides - 1)"
      @keydown.enter="selectSlide(n + nbSlides - 1, $event)"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import directives from './directives-carousel'

@Component({
  name: 'CarouselPagination',
  directives: {
    'click-down': directives.clickDown,
  },
})

export default class CarouselPagination extends Vue {

  @Prop({ required: true }) private mode!: string
  @Prop({ required: true }) private nbSlides!: number
  @Prop({ required: true }) private position!: number

  private paginationPosition = 0

  mounted() {
    this.paginationPosition = this.nbSlides
  }

  public selectSlide(pageSelected: number, event: MouseEvent | TouchEvent): void {
    this.$emit('select-slide', pageSelected, event)
  }

  public movePagination(): void {
    this.$nextTick(() => {
      if (this.position >= (this.nbSlides * 2) || this.position === 0) this.paginationPosition = this.nbSlides
      else if (this.position < this.nbSlides) this.paginationPosition = this.position + this.nbSlides
      else this.paginationPosition = this.position
    })
  }

}
</script>

<style lang="sass">
.carousel-pagination
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
