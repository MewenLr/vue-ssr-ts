<script lang="ts">
import { CreateElement, VNode } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

function cloneNode(h: CreateElement, vNode: VNode) {
  if (vNode.componentOptions) {
    const children = vNode.children || vNode.componentOptions.children || vNode.text
    const tag = vNode.componentOptions.Ctor

    return h(tag, vNode.data, children)
  }
  return
}

function renderSlides(h: CreateElement, context: Vue): VNode {
  const children = context.$slots.default
  const childrenCount = children ? children.length : 0

  let idx = 0
  const slides = []
  /* slides */
  for (let i = 0; i < childrenCount; i++) {
    const child = children ? children[i] : {} as VNode

    if (child && child.data) {
      child.data.key = idx
      child.key = idx
      child.data.props = {
        ...(child.data.props || {}),
        isClone: false,
        index: idx++
      }

      slides.push(child)
    }
  }

  const before = []
  const after = []
  const slidesCount = slides.length
  for (let i = 0; i < slidesCount; i++) {
    const slide = slides[i]

    /* before */
    const clonedBefore = cloneNode(h, slide)
    let slideIndex = i - slidesCount
    if (clonedBefore && clonedBefore.data) {
      clonedBefore.data.key = `before_${i}`
      clonedBefore.key = clonedBefore.data.key
      clonedBefore.data.props = {
        index: slideIndex,
        isClone: true
      }
      before.push(clonedBefore)
    }

    /* after */
    const clonedAfter = cloneNode(h, slide)
    slideIndex = i + slidesCount
    if (clonedAfter && clonedAfter.data) {
      clonedAfter.data.key = `after_${slideIndex}`
      clonedAfter.key = clonedAfter.data.key
      clonedAfter.data.props = {
        index: slideIndex,
        isClone: true
      }
    }
    after.push(clonedAfter)
  }

  (context as CarouselSlider).nbSlides = slides.length

  return h('ul', { class: 'slider' }, [...before, ...slides, ...after])
}

@Component({
  name: 'CarouselSlider',
  render(h) {
    return renderSlides(h, this)
  },
})

export default class CarouselSlider extends Vue {

  public nbSlides = 0

  mounted() {
    this.$emit('count-slides', this.nbSlides)
  }

}
</script>
