import fs from 'node:fs/promises'
import express from 'express'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000
const base = process.env.BASE || '/'

const app = express()

// Production: serve built client files
if (isProduction) {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default

  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
} else {
  // Development: use Vite dev server
  const { createServer } = await import('vite')
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
}

// SSR handler
app.use('*', async (req, res, next) => {
  if (/\.(js|css|map|png|jpg|jpeg|svg|webp|ico|json)$/i.test(req.originalUrl)) {
    return next()
  }

  try {
    const url = req.originalUrl
    let template, render

    if (isProduction) {
      // Production: import built SSR entry-server.js
      template = await fs.readFile('./dist/client/index.html', 'utf-8')
      render = (await import('./dist/server/entry-server.js')).render
    } else {
      // Dev: load Vite modules
      const fsDefault = fs
      template = await fsDefault.readFile('./index.html', 'utf-8')
      const vite = globalThis.viteDevServer || await import('vite')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    }

    const rendered = await render(url)
    const html = template
      .replace('<!--app-head-->', rendered.head ?? '')
      .replace('<!--app-html-->', rendered.html ?? '')
      .replace(
        '<!--app-state-->',
        `<script>window.__REACT_QUERY_STATE__ = ${rendered.state.replace(/</g, '\\u003c')}</script>`
      )

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    console.error(e)
    res.status(500).end(e.stack)
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})