import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import mockAxios from '@/__mocks__/axios'
import endpoints from '@/store/modules/endpoints'
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
        Endpoints: {
          namespaced: true,
          state: endpoints.state,
        },
      },
    })
  })

  describe('Props', () => {

    it('should render props msg in .example_prop', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue })
      const prop = wrapper.find('.example_prop')
      expect(prop.text()).toEqual(props.msg)
    })
  })

  describe('States', () => {

    it('should render state endpoints apiClick .example_state attributes', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue })
      const state = wrapper.find('.example_state')
      expect(state.attributes('test-attribute')).toEqual(endpoints.state.apiClick)
      // use props() when Element is a Vue Component
      // expect(state.props('test-attribute')).toEqual(endpoints.state.apiClick)
    })
  })

  describe('Computed', () => {

    it('compMsg: should return concatenated props msg', () => {
      // 'as any' required to test method and computed
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      expect(wrapper.vm.compMsg).toEqual(`Computed ${props.msg.split(' ')[1]}`)
    })
  })

  describe('Methods', () => {

    it('fullName: should return concatenated user name and age', () => {
      // 'as any' required to test method and computed
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      expect(wrapper.vm.fullName(data.user)).toEqual(`${data.user.name}-${data.user.age}`)
    })

    it('fetchApi: should fetch api once and return data', async () => {
      console.log(mockAxios.get)
      mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: 3 }))
      // 'as any' required to test method and computed
      // const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      // const res = await wrapper.vm.fetchApi()
      // expect(res).toEqual({ data: 3 })
      expect(mockAxios.get).toHaveBeenCalledTimes(1)
      expect(mockAxios.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/comments', { params: { postId: 1 } },
      )
    })
  })
})
