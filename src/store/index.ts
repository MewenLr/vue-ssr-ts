import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => new Vuex.Store({

  state: () => ({
    stCount: 0,
    stTestClient: 'State Test from Vuex Client',
  }),

  actions: {
    actIncCount: ({ commit }) => commit('mutIncCount'),
  },

  mutations: {
    mutIncCount: (state) => state.stCount += 1,
  },

})
