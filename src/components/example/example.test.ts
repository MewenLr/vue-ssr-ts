import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import mockAxios from '@/__mocks__/axios'
import flushPromises from 'flush-promises'
import ModExample from '@/store/modules/mod-example'
import Example from '@/components/example/example.vue'
import config from '@/components/example/example.dataset'

const propsData = config.props
const localVue = createLocalVue()

localVue.use(Vuex)

describe('[Example]', () => {

  let store: Store<object>

  const { data, props } = config

  beforeEach(() => {

    store = new Vuex.Store({
      modules: {
        ModExample: {
          namespaced: true,
          state: ModExample.state,
          actions: ModExample.actions,
          mutations: ModExample.mutations,
        },
      },
    })

    jest.clearAllMocks()
    mockAxios.get.mockResolvedValue({ data: undefined })
  })

  describe('Props', () => {

    it('should render props msg in .example_prop', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      const prop = wrapper.find('.example_prop')
      expect(prop.text()).toEqual(props.msg)
    })
  })

  describe('States', () => {

    it('should render stUrlExample in .example_state attributes', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      const state = wrapper.find('.example_state')
      expect(state.attributes('test-attribute')).toEqual(ModExample.state.stUrlExample)
      // use props() when Element is a Vue Component
      // expect(state.props('test-attribute')).toEqual(ModExample.state.stUrlExample)
    })
  })

  describe('Computed', () => {

    it('compMsg: should return concatenated props msg', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      expect(wrapper.vm.compMsg).toEqual(`Computed ${props.msg.split(' ')[1]}`)
    })
  })

  describe('Lifecyle', () => {

    it('Mounted', async () => {
      mockAxios.get.mockResolvedValue({ data: 'test' })
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      await flushPromises()
      expect(wrapper.vm.comments).toEqual('test')
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get).toHaveBeenCalledWith('/comments', { params: { postId: 1 } })
    })
  })

  describe('Methods', () => {

    it('fullName: should return concatenated user name and age', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      expect(wrapper.vm.fullName(data.user)).toEqual(`${data.user.name}-${data.user.age}`)
    })

    it('fetchApi: should fetch api and return data', async () => {
      mockAxios.get.mockResolvedValue({ data: 'test' })
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      const res = await wrapper.vm.fetchApi()
      expect(res).toEqual({ data: 'test' })
      expect(mockAxios.get).toHaveBeenCalledTimes(2) // once on mounted, once in test
      expect(mockAxios.get).toHaveBeenCalledWith('/comments', { params: { postId: 1 } })
    })

    it('updateUrlExample: should mutate stUrlExample', () => {
      const updatedUrl = 'https://updated-url.com'
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      wrapper.vm.updateUrlExample(updatedUrl)
      expect(wrapper.vm.stUrlExample).toEqual(updatedUrl)
    })
  })
})
