const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const template = require('fs').readFileSync(path.join(__dirname, './index.html'), 'utf-8')

const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const server = new Koa()
const router = new Router()

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest,
  runInNewContext: false,
})

server.use(serve(path.resolve(__dirname, '..', 'dist')))

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
    console.error('[err] >>', e)
    ctx.status = 500
    return ctx.body = 'Internal Server Error'
  }
})

server.use(router.routes()).use(router.allowedMethods())

server.listen(process.env.APP_PORT)
