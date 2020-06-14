<template lang="pug">
  .home.block
    example(msg="Example message")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Example from '@/components/example/example.vue'

@Component({
  name: 'PHome',
  components: {
    Example,
  },
})

export default class PHome extends Vue { }
</script>

<style lang="sass">
.home
  height: 450px
  color: $stern-brown
  background-color: $sand-yellow
</style>
