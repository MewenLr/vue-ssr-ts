<template lang="pug">
  svg.icon(
    :class="compClass"
    aria-hidden="true"
  )
    use(:xlink:href="name")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const typeValidator = ['primary', 'secondary']

@Component({
  name: 'AIcon',
})

export default class AIcon extends Vue {

  @Prop({
    default: 'primary',
    validator: (prop) => typeValidator.includes(prop),
  }) private type!: string
  @Prop({ required: true }) private iconName!: string

  get name(): string {
    const icon = this.iconName
    return icon ? `#icon-${icon}` : ''
  }

  get compClass(): string {
    let className = ''
    for (const type of this.type.split(' ')) className += ` icon--${type}`
    return className.substr(1)
  }

}
</script>

<style lang="sass">
.icon
  fill: black
  width: inherit
  height: inherit
  overflow: hidden
</style>