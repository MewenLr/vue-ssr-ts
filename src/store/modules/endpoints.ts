import { VuexModule, Module } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class Endpoints extends VuexModule {

  public apiClick = 'https://my.api.com'

}
