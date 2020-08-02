import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import ModExample from '@/store/modules/mod-example'

Vue.use(Vuex)

export default (): Store<object> => {
  const store = new Vuex.Store({
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
    modules: {
      ModExample,
    },
  })

  return store
}
