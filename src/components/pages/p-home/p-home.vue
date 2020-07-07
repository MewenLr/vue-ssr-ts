<template lang="pug">
  .home
    //- example(msg="Example message")

    carousel.home_carousel(
      :is-cross="true"
    )
      carousel-slide.home_slide(
        v-for="(img, i) in images"
        :key="i"
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

  private images = [
    'surf.jpg',
    'mountain.jpg',
    'greece.jpg',
    'snow.jpg',
  ]

}
</script>

<style lang="sass">
@import '@/_main.sass'

.home
  color: $stern-brown
  background-color: $sand-yellow

  &_carousel
    width: 100%
    height: 500px
</style>
