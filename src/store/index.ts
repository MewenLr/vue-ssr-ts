import Vue from 'vue'
import Vuex from 'vuex'
import Endpoints from '@/store/modules/endpoints'

Vue.use(Vuex)

export default () => {
  const store = new Vuex.Store({
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
    modules: { Endpoints },
  })

  return store
}
