<template lang="pug">
  .header
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class OHeader extends Vue { }
</script>

<style lang="sass">
.header
  height: 50px
  width: inherit
  background-color: $faded-green
</style>
