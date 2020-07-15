<template lang="pug">
  svg.icon(
    :class="`icon--${type}`"
    aria-hidden="true"
  )
    use(:xlink:href="`#icon-${icon}`")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const typeValidator = ['primary', 'secondary']

@Component({
  name: 'AIcon',
})

export default class AIcon extends Vue {

  @Prop({ required: true }) private icon!: string
  @Prop({
    default: 'primary',
    validator: (prop) => typeValidator.includes(prop),
  }) private type!: string

}
</script>
