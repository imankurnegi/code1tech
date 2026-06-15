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
import JobDetail from "./pages/JobDetail";
import Careers from "./pages/Careers";
import OnDemandEngineers from "./pages/services/eaas/OnDemandEngineers";
import OffshoreNearshore from "./pages/services/eaas/OffshoreNearshore";
import TechTeamBuilding from "./pages/services/eaas/TechTeamBuilding";
import ManagedServices from "./pages/services/eaas/ManagedServices";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import AuthorProfile from "./pages/AuthorProfile";

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
        <Route path="/services/eaas/on-demand-engineers" element={<OnDemandEngineers />} />
        <Route path="/services/eaas/offshore-nearshore" element={<OffshoreNearshore />} />
        <Route path="/services/eaas/tech-team-building" element={<TechTeamBuilding />} />
        <Route path="/services/eaas/managed-services" element={<ManagedServices />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<JobDetail />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/author/:slug" element={<AuthorProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;