<template lang="pug">
  .header
    .header_btn
      a-icon(icon="menu")
    .header_btn
      a-icon(icon="user")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AIcon from '@/components/atoms/a-icon/a-icon.vue'

@Component({
  name: 'OHeader',
  components: {
    AIcon,
  },
})

export default class OHeader extends Vue { }
</script>

<style lang="sass">
.header
  height: 50px
  display: flex
  width: inherit
  justify-content: space-between
  background-color: $faded-green

  &_btn
    width: 30px
    height: 30px
    padding: 10px
</style>
