<template lang="pug">
  svg.icon(
    :class="className"
    aria-hidden="true"
  )
    use(:xlink:href="name")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const req = require.context('../../../assets/icons', false, /\.svg$/)
requireAll(req)

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

  public apiClick!: string

  get name(): string {
    const icon = this.iconName
    return icon ? `#icon-${icon}` : ''
  }

  // get svgClass(): string {
  //   const className = this.types
  //   return className ? `icon ${className}` : 'svg-icon'
  // }

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