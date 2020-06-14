import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
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

  describe('Props :', () => {

    it('should render props msg in .example__prop', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue })
      const prop = wrapper.find('.example__prop')
      expect(prop.text()).toEqual(props.msg)
    })
  })

  describe('Computed :', () => {

    it('should return concatenated props msg', () => {
      // 'as any' required to test method and computed
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      expect(wrapper.vm.compMsg).toEqual(`computed ${props.msg.split(' ')[1]}`)
    })
  })

  describe('Methods :', () => {

    it('shoudl return concatenated user name and age', () => {
      // 'as any' required to test method and computed
      const wrapper = shallowMount(Example, { propsData, store, localVue }) as any
      expect(wrapper.vm.fullName(data.user)).toEqual(`${data.user.name}-${data.user.age}`)
    })
  })

  describe('States :', () => {

    it('should render state endpoints apiClick .example__state attributes', () => {
      const wrapper = shallowMount(Example, { propsData, store, localVue })
      const state = wrapper.find('.example__state')
      expect(state.attributes('test-attribute')).toEqual(endpoints.state.apiClick)
      // use props() when Element is a Vue Component
      // expect(state.props('test-attribute')).toEqual(endpoints.state.apiClick)
    })
  })
})