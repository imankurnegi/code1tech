import Layout from "./components/layout/Layout"; 
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Team from "./pages/Team";
import EngineerAsAService from "./pages/services/EngineerAsAService";
import DataEngineering from "./pages/services/DataEngineering";
import AIMLSolutions from "./pages/services/AIMLSolutions";
import DataScience from "./pages/services/DataScience";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/services/engineer-as-a-service" element={<EngineerAsAService />} />
        <Route path="/services/data-science" element={<DataScience />} />
        <Route path="/services/ai-ml-solutions" element={<AIMLSolutions />} />
        <Route path="/services/data-engineering" element={<DataEngineering />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;