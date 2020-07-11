import { shallowMount } from '@vue/test-utils'
import AImage from '@/components/atoms/a-image/a-image.vue'
import config from '@/components/atoms/a-image/a-image.dataset'

const propsData = config.props

describe('[AImage]', () => {

  const { props } = config

  props.source = 'http://test-source.jpg'
  props.placeholder = 'http://test-placeholder.jpg'

  describe('Props :', () => {

    it('should render props alt in .image_picture alt attributes', () => {
      const wrapper = shallowMount(AImage, { propsData })
      const image = wrapper.find('.image_picture')
      expect(image.attributes('alt')).toEqual(props.alt)
    })

    it('should render props source in .image_picture src attributes', () => {
      const wrapper = shallowMount(AImage, { propsData })
      const image = wrapper.find('.image_picture')
      expect(image.attributes('src')).toEqual(props.source)
    })

    it('should render props placeholder in .image_placeholder src attributes', () => {
      const wrapper = shallowMount(AImage, { propsData })
      const placeholder = wrapper.find('.image_placeholder')
      expect(placeholder.attributes('src')).toEqual(props.placeholder)
    })
  })

  describe('Computed :', () => {

    it('should return true if props source is http url', () => {
      const wrapper = shallowMount(AImage, { propsData }) as any
      expect(wrapper.vm.compSource).toBeTruthy()
    })

    it('should return true if props placeholder is http url', () => {
      const wrapper = shallowMount(AImage, { propsData }) as any
      expect(wrapper.vm.compPlaceholder).toBeTruthy()
    })
  })
})
