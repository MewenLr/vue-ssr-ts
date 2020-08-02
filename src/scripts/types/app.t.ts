import Vue from 'vue'
import { Store } from 'vuex'
import Router from 'vue-router'

/**
 * @param app - The app
 * @param store - The app's store
 * @param router - The app's router
*/

type TUserExample = {
  app: Vue,
  router: Router,
  store: Store<object>,
}

export default TUserExample
