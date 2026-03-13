import App from "./App";
import Layout, { loader as layoutLoader } from "./components/layout/Layout"; 
import Index, { loader as indexLoader } from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Contact, { loader as contactLoader } from "./pages/Contact";
import About, { loader as aboutLoader } from "./pages/About";
import Team, { loader as teamLoader } from "./pages/Team";
import EngineerAsAService, { loader as engServiceLoader } from "./pages/services/EngineerAsAService";

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
            path: "contactus",
            Component: Contact,
            loader: contactLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "about",
            Component: About,
            loader: aboutLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "teams",
            Component: Team,
            loader: teamLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "services/engineer-as-a-service",
            Component: EngineerAsAService,
            loader: engServiceLoader,
            errorElement: <ErrorPage />,
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
