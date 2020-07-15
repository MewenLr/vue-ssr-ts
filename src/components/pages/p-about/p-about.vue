<template lang="pug">
  .about
    | Here in About component
    example(msg="Example message")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Example from '@/components/example/example.vue'

@Component({
  name: 'PAbout',
  components: {
    Example,
  },
})

export default class PAbout extends Vue { }
</script>
