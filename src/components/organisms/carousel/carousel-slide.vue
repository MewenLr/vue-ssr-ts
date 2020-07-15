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
