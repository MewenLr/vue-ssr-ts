<template lang="pug">
  .home
    //- example(msg="Example message")

    carousel.home_carousel
      slide.home_slide(
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
import Slide from '@/components/organisms/carousel/slide.vue'
import Carousel from '@/components/organisms/carousel/carousel.vue'

@Component({
  name: 'PHome',
  components: {
    AImage,
    Slide,
    Example,
    Carousel,
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
    // width: 750px
    width: 75vw
    margin-left: 12.5vw
    height: 500px
</style>
