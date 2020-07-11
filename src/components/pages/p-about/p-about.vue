<template lang="pug">
  .about Here in About component
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'PAbout',
})

export default class PAbout extends Vue { }
</script>

<style lang="sass">
.about
  height: 500px
  color: $stern-brown
  background-color: $sand-yellow
</style>
