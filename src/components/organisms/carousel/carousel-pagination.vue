<template lang="pug">
  .carousel-pagination(
    :class="`carousel-pagination--${type}`"
  )
    .carousel-pagination_fraction(
      v-if="type === 'fraction'"
    ) {{ paginationPosition - nbSlides + 1 }} / {{ nbSlides }}
    button.carousel-pagination_btn(
      :aria-label="`Slide ${n}`"
      :class="{'carousel-pagination_btn--active': (n - 1) === (paginationPosition - nbSlides)}"
      v-else
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

  @Prop({ required: true }) private type!: string
  @Prop({ required: true }) private nbSlides!: number
  @Prop({ required: true }) private position!: number

  private paginationPosition = 0

  mounted(): void {
    this.paginationPosition = this.nbSlides
  }

  public selectSlide(pageSelected: number, event: MouseEvent | TouchEvent): void {
    this.$emit('select-slide', pageSelected, event)
  }

  public movePagination(): void {
    this.$nextTick(() => {
      if (this.position >= (this.nbSlides * 2) || this.position === 0) this.paginationPosition = this.nbSlides
      else if (this.position < this.nbSlides) this.paginationPosition = this.position + this.nbSlides
      else this.paginationPosition = this.position
    })
  }

}
</script>
