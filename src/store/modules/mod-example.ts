import {
  Action,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ModExample extends VuexModule {

  public stUrlExample = 'https://example-url.com'

  @Mutation
  public mutUrlExample(payload: string): void {
    this.stUrlExample = payload
  }

  @Action
  public actUrlExample(payload: string): void {
    this.context.commit('mutUrlExample', payload)
  }

}
