import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Serve static files
  app.use(express.static(path.resolve(__dirname, 'dist/client'), { index: false }))

  app.use('*', async (req, res) => {
    try {
      const url = req.protocol + '://' + req.get('host') + req.originalUrl

      // Read the template
      let template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      )

      // Load the server entry
      const { render } = await import('./dist/server/entry-server.js')

      // Render the app
      const { html: appHtml } = await render(url)

      // Inject the app HTML
      const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.error(e)
      res.status(500).end('Internal Server Error')
    }
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`)
  })
}

createServer()