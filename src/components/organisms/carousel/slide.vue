<template lang="pug">
  li.slide
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Slide',
})

export default class Slide extends Vue { }
</script>

<style lang="sass">
.slide
  width: inherit
  height: inherit
</style>
