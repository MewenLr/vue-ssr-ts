import Vuex, { Store } from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

// @ts-ignore
import App from './app.vue'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('[App]', () => {
  let state
  let actions
  let store: Store<any>

  beforeEach(() => {
    state = {
      stCount: 0,
      stTestClient: 'State Test from Vuex Client',
    }
    actions = {
      actIncCount: jest.fn(),
    }
    store = new Vuex.Store({ state, actions })
  })

  test('App has a class .app', () => {
    const wrapper = shallowMount(App, { localVue, router, store })
    expect(wrapper.classes()).toContain('app')
  })
})
