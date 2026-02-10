// proxy.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 4500;

const API_BASE = 'https://code1.dev/code1new/wp-json/v1';
const AUTH_TOKEN = 'a3f1c5d9b8e7f2c4d6a1b0e9c3d4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b1ry432';

app.get('/api/*', async (req, res) => {
  try {
    const apiPath = req.originalUrl.replace('/api', '');
    const response = await fetch(`${API_BASE}${apiPath}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${AUTH_TOKEN}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        'Referer': 'https://code1.dev',
        'Origin': 'https://code1.dev'
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