<template lang="pug">
  .image(
    v-lazy-load="!!placeholder"
    :key="source"
  )
    img.image_placeholder(
      v-if="placeholder"
      :src="compPlaceholder ? placeholder : require(`@/assets/images/${placeholder}`)"
    )
    img.image_picture(
      :alt="alt"
      :data-url="compSource ? source : require(`@/assets/images/${source}`)"
    )
</template>

<script lang="ts">
import { lazyLoadDirective } from '@/scripts/directives'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Piction',
  directives: { lazyLoadDirective },
})

export default class Piction extends Vue {

  @Prop({ default: '' }) private alt!: string
  @Prop({ required: true }) private source!: string
  @Prop({ default: '' }) private placeholder!: string

  get compSource(): boolean {
    return /^http/.test(this.source)
  }

  get compPlaceholder(): boolean {
    return /^http/.test(this.placeholder)
  }

}
</script>
