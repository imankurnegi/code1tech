// proxy.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 4500;

const API_BASE = process.env.VITE_WEB_URL;
const AUTH_TOKEN = process.env.VITE_AUTH_TOKEN;

app.get('/api/*', async (req, res) => {
  try {
    const apiPath = req.originalUrl.replace('/api', '');
    const response = await fetch(`${API_BASE}${apiPath}`, {
      headers: {
        Accept: application/json,
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${AUTH_TOKEN}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        'Referer': 'https://code1tech.page.gd/',
        'Origin': 'https://code1tech.page.gd'
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Proxy fetch failed' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
