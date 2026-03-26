import fs from 'node:fs/promises'
import express from 'express'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || (isProduction ? 3000 : 3500)
const base = process.env.BASE || '/'

const app = express()

// 👇 Vite instance (dev ke liye)
let vite

// Production: serve built client files
if (isProduction) {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default

  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
} else {
  // Development: use Vite dev server
  const { createServer } = await import('vite')

  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })

  app.use(vite.middlewares)
}

// SSR handler
app.use('*', async (req, res, next) => {
  // Static assets skip
  if (/\.(js|css|map|png|jpg|jpeg|svg|webp|ico|json)$/i.test(req.originalUrl)) {
    return next()
  }

  try {
    const url = req.originalUrl
    let template, render

    if (isProduction) {
      // Production
      template = await fs.readFile('./dist/client/index.html', 'utf-8')
      render = (await import('./dist/server/entry-server.js')).render
    } else {
      // Development
      template = await fs.readFile('./index.html', 'utf-8')

      // 👇 correct usage (no import('vite') here)
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

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
  console.log(`Mode: ${isProduction ? 'Production' : 'Development'}`)
})