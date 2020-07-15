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
