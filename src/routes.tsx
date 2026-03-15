import App from "./App";
import Layout, { loader as layoutLoader } from "./components/layout/Layout"; 
import Index, { loader as indexLoader } from "./pages/Index";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import Contact, { loader as contactLoader } from "./pages/Contact";
import About, { loader as aboutLoader } from "./pages/About";
import Team, { loader as teamLoader } from "./pages/Team";
import EngineerAsAService, { loader as engServiceLoader } from "./pages/services/EngineerAsAService";
import DataEngineering, { loader as dataEngineeringLoader } from "./pages/services/DataEngineering";
import AIMLSolutions, { loader as AIMLSolutionsLoader } from "./pages/services/AIMLSolutions";
import DataScience, { loader as dataScienceLoader } from "./pages/services/DataScience";
import TermsConditions, {loader as dataTermsLoader} from "./pages/TermsConditions";
import PrivacyPolicy, {loader as dataPrivacyLoader} from "./pages/PrivacyPolicy";

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
            path: "team",
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
          {
            path: "services/data-engineering",
            Component: DataEngineering,
            loader: dataEngineeringLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "services/ai-ml-solutions",
            Component: AIMLSolutions,
            loader: AIMLSolutionsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "services/data-science",
            Component: DataScience,
            loader: dataScienceLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "terms-conditions",
            Component: TermsConditions,
            loader: dataTermsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "privacy-policy",
            Component: PrivacyPolicy,
            loader: dataPrivacyLoader,
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
