import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'

import App from './app.vue'

const localVue = createLocalVue()
const router = new VueRouter()

localVue.use(Vuex)
localVue.use(VueRouter)

describe('[App]', () => {
  let store
  let state
  let actions

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
