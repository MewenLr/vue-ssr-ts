<template lang="pug">
  .home
    //- example(msg="Example message")

    carousel.home_carousel(
      pagination="dash"
      :is-cross="false"
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
import axios from 'axios'
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
    // 'surf.jpg',
    // 'mountain.jpg',
    // 'greece.jpg',
    // 'snow.jpg',
  ]

  async mounted() {
    try {
      const listImg = []
      for(let i = 0; i < 4; i += 1) {
        const img = await axios.get(`https://picsum.photos/id/2${i}/1200/600`)
        listImg.push(img.config.url)
      }
      this.slides = listImg
    } catch(e) {
      console.error(e)
    }
  }

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
