<template lang="pug">
  #app.app
    o-header.app_header
    .app_nav
      router-link.app_link(to="/") Go to Home
      | &nbsp;|&nbsp;
      router-link.app_link(to="/about") Go to About
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OHeader from '@/components/organisms/o-header/o-header.vue'

@Component({
  name: 'App',
  components: {
    OHeader,
  },
})

export default class App extends Vue { }
</script>
