import Vue from 'vue'
import Vuex from 'vuex'
import { storiesOf } from '@storybook/vue'
import endpoints from '@/store/modules/endpoints'
import Example from '@/components/example/example.vue'
import config from '@/components/example/example.dataset'

Vue.use(Vuex)

const { props } = config

storiesOf('Example', module).add('Example', () => ({
  components: { Example },
  data: () => ({ msg: props.msg }),
  store: new Vuex.Store({
    modules: {
      Endpoints: {
        namespaced: true,
        state: endpoints.state,
      },
    },
  }),
  template: `<example
    :msg="msg"
  />`,
}))
