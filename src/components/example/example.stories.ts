import Vue from 'vue'
import Vuex from 'vuex'
import { storiesOf } from '@storybook/vue'
import ModExample from '@/store/modules/mod-example'
import mocks from '@/components/example/example.mocks'
import Example from '@/components/example/example.vue'
import config from '@/components/example/example.dataset'

Vue.use(Vuex)

const { props } = config

storiesOf('Example', module)
  .add('Example', () => ({
    components: { Example },
    data: () => ({
      msg: props.msg,
    }),
    store: new Vuex.Store({
      modules: {
        ModExample: {
          namespaced: true,
          state: ModExample.state,
          actions: ModExample.actions,
          mutations: ModExample.mutations,
        },
      },
    }),
    mocks,
    template: `
      <example
        :msg="msg"
      />
    `,
  }))
