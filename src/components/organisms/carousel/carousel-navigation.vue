<template lang="pug">
  .carousel-navigation(
    :class="`carousel-navigation--${type}`"
  )
    button.carousel-navigation_previous(
      aria-label="Previous Slide"
      v-click-down="changeSlide.bind(null, -1)"
      @keydown.enter="changeSlide(-1, $event)"
    ) <
    button.carousel-navigation_next(
      aria-label="Next Slide"
      v-click-down="changeSlide.bind(null, 1)"
      @keydown.enter="changeSlide(1, $event)"
    ) >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import directives from './directives-carousel'

@Component({
  name: 'CarouselNavigation',
  directives: {
    'click-down': directives.clickDown,
  },
})

export default class CarouselNavigation extends Vue {

  @Prop({ required: true }) private type!: string

  public changeSlide(direction: number, event: MouseEvent | TouchEvent): void {
    this.$emit('change-slide', direction, event)
  }

}
</script>

<style lang="sass">
.carousel-navigation
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
</style>
