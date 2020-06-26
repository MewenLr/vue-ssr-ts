import Vue from 'vue'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import App from './app.vue'
import createStore from './store'
import createRouter from './router'
import svgIcon from './scripts/modules/svg-icon'

Vue.use(Meta)

svgIcon()

export default () => {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    store,
    router,
    render: (h) => h(App),
  })

  return { app, router, store }
}
