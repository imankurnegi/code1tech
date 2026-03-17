## Code1 Tech – React + Vite + TypeScript

Modern marketing site for Code1 Tech built with React, Vite, TypeScript, Tailwind CSS and shadcn-ui, with static site generation using `vite-react-ssg`.

### Scripts

- **Development**: `npm run dev`
- **SPA build**: `npm run build`
- **SSG build**: `npm run build:ssg`
- **Preview**: `npm run preview`

### Tech stack

- **Bundler**: Vite
- **Language**: TypeScript
- **UI**: React 18, shadcn-ui, Tailwind CSS
- **Routing + SSG**: `react-router-dom`, `vite-react-ssg`
- **Data fetching**: `@tanstack/react-query`

### Environment variables

Create a `.env.local` for local dev and `.env.production` for production:

```env
VITE_API_URL="https://your-api.example.com/wp-json/v1"
VITE_AUTH_TOKEN="your-api-token"
```

### Building & deployment

1. Install dependencies: `npm install`
2. Generate static site: `npm run build:ssg`
3. Deploy the contents of the `dist/` folder to your static hosting (e.g. Nginx, S3, Netlify, Cloudflare Pages).
