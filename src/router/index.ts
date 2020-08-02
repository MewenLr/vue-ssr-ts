import Vue from 'vue'
import Router from 'vue-router'
import PHome from '@/components/pages/p-home/p-home.vue'

Vue.use(Router)

export default (): Router => new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: PHome,
    },
    {
      name: 'about',
      path: '/about',
      component: () => import(/* webpackChunkName: "about" */ '@/components/pages/p-about/p-about.vue'),
    },
  ],
})
