require('dotenv').config()
const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')

const serverBundle = require('../public/vue-ssr-server-bundle.json')
const clientManifest = require('../public/vue-ssr-client-manifest.json')

const { env } = process
const server = new Koa()
const router = new Router()

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest,
  runInNewContext: false,
})

server.use(serve(path.resolve(__dirname, '..', 'public')))

router.get('*', async (ctx) => {
  try {
    const context = { url: ctx.url }
    const html = await renderer.renderToString(context)
    return ctx.body = html
  } catch (e) {
    if (e.code === 404) {
      ctx.status = 404
      return ctx.body = 'Page not found'
    }
    console.error(`[error] : ${e}`)
    ctx.status = 500
    return ctx.body = 'Internal Server Error'
  }
})

server.use(router.routes()).use(router.allowedMethods())

server.listen(env.APP_PORT, () => console.info(`[info] Server is running on : http://localhost:${env.APP_PORT}/`))
