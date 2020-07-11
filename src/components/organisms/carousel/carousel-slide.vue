<template lang="pug">
  li.carousel-slide
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'CarouselSlide',
})

export default class CarouselSlide extends Vue { }
</script>

<style lang="sass">
.carousel-slide
  left: 50%
  height: 100%
  display: flex
  position: relative
  align-items: center
  justify-content: center
  transform: translateX(-50%)
</style>
