<template lang="pug">
  .home
    //- example(msg="Example message")

    carousel.home_carousel(
      pagination="dash"
      :is-cross="true"
      v-if="slides.length"
    )
      carousel-slide.home_slide(
        :key="i"
        v-for="(img, i) in slides"
      )
        a-image(
          :source="img"
        )

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Example from '@/components/example/example.vue'
import AImage from '@/components/atoms/a-image/a-image.vue'
import Carousel from '@/components/organisms/carousel/carousel.vue'
import CarouselSlide from '@/components/organisms/carousel/carousel-slide.vue'

@Component({
  name: 'PHome',
  components: {
    AImage,
    Example,
    Carousel,
    CarouselSlide,
  },
})

export default class PHome extends Vue {

  private slides: (string | undefined)[] = [
    'beach.jpg',
    'cloud.jpg',
    'celtic.jpg',
    'farmer.jpg',
  ]

}
</script>

<style lang="sass">
.home
  color: $stern-brown
  background-color: $sand-yellow

  &_carousel
    width: 100%
    height: 500px
</style>
