import createApp from '../src/app.ts'

export default (context) => new Promise((res, rej) => {
  const { app, router, store } = createApp()

  const meta = app.$meta()

  router.push(context.url)

  context.meta = meta

  router.onReady(() => {
    context.rendered = () => context.state = store.state
    const matchedComponents = router.getMatchedComponents()
    if (!matchedComponents.length) return rej({ code: 404 })
    return res(app)
  }, rej)
})
