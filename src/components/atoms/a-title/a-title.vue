<template lang="pug">
  component.title(:is="tag")
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const tagValidator = ['h1', 'h2', 'h3']

@Component({
  name: 'ATitle',
})

export default class ATitle extends Vue {

  @Prop({
    default: 'h1',
    validator: (prop) => tagValidator.includes(prop),
  }) private tag!: string

}
</script>

<style lang="sass">
.title
</style>
