// proxy.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 5500;

const API_BASE = process.env.VITE_BASE_URL;
const AUTH_TOKEN = process.env.VITE_AUTH_TOKEN;

app.get('/api/*', async (req, res) => {
  try {
    const apiPath = req.originalUrl.replace('/api', '');
    const response = await fetch(`${API_BASE}${apiPath}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
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
