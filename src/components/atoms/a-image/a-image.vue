<template lang="pug">
  .image(v-lazy-load="!!placeholder")
    img.image_placeholder(
      v-if="placeholder"
      :src="compPlaceholder"
    )
    img.image_picture(
      :alt="alt"
      :data-url="compSource"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { lazyLoadDirective } from '@/assets/scripts/directives'

@Component({
  name: 'Piction',
  directives: { lazyLoadDirective },
})

export default class Piction extends Vue {

  @Prop({ default: '' }) private alt!: string
  @Prop({ required: true }) private source!: string
  @Prop({ default: '' }) private placeholder!: string

  get compSource(): boolean {
    return /^http/.test(this.source) ? this.source : require(`@/assets/images/${this.source}`)
  }

  get compPlaceholder(): boolean {
    return /^http/.test(this.placeholder) ? this.placeholder : require(`@/assets/images/${this.placeholder}`)
  }

}
</script>

<style lang="sass">
.image
  $self: &
  width: inherit
  height: inherit

  &_placeholder, &_picture
    width: inherit
    height: inherit

  &_placeholder
    z-index: 0
    position: absolute

  &_picture
    z-index: 1
    position: relative

  &--loaded

    #{ $self }_placeholder
      display: none
</style>
