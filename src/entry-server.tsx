import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';
import { routes } from './routes';
import App from './App';
import './index.css';

export async function render(url: string) {
  const handler = createStaticHandler(routes);

  const context = await handler.query(new Request(url));

  if (context instanceof Response) {
    throw context;
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  const html = renderToString(
    <StaticRouterProvider router={router} context={context}>
      <App />
    </StaticRouterProvider>
  );

  return { html };
}