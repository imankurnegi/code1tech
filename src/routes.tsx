import App from "./App";
import Layout, { loader as layoutLoader } from "./components/layout/Layout"; 
import Index, { loader as indexLoader } from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

export const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: Layout,
        loader: layoutLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            Component: Index,
            loader: indexLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "about",
            Component: About,
          },
        ],
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
];
