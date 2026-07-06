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
import DataIngestion from "./pages/services/data-engineering/DataIngestion";
import DataWarehousing from "./pages/services/data-engineering/DataWarehousing";
import DataModelling from "./pages/services/data-engineering/DataModelling";
import DataQualityGovernance from "./pages/services/data-engineering/DataQualityGovernance";
import DataOpsPipelineAutomation from "./pages/services/data-engineering/DataOpsPipelineAutomation";
import CloudDataMigration from "./pages/services/data-engineering/CloudDataMigration";
import BusinessIntelligence from "./pages/services/data-science/BusinessIntelligence";
import PredictiveAdvancedAnalytics from "./pages/services/data-science/PredictiveAdvancedAnalytics";
import BigDataSolutions from "./pages/services/data-science/BigDataSolutions";
import Databricks from "./pages/services/tools/Databricks";
import Snowflake from "./pages/services/tools/Snowflake";
import AWS from "./pages/services/tools/AWS";
import PowerBI from "./pages/services/tools/PowerBI";
import Tableau from "./pages/services/tools/Tableau";
import N8N from "./pages/services/tools/N8N";
import Oracle from "./pages/services/tools/Oracle";

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
        <Route path="/services/data-engineering/data-ingestion" element={<DataIngestion />} />
        <Route path="/services/data-engineering/data-warehousing" element={<DataWarehousing />} />
        <Route path="/services/data-engineering/data-modelling" element={<DataModelling />} />
        <Route path="/services/data-engineering/data-quality-governance" element={<DataQualityGovernance />} />
        <Route path="/services/data-engineering/dataops-pipeline-automation" element={<DataOpsPipelineAutomation />} />
        <Route path="/services/data-engineering/cloud-data-migration" element={<CloudDataMigration />} />
        <Route path="/services/data-science/business-intelligence" element={<BusinessIntelligence />} />
        <Route path="/services/data-science/predictive-advanced-analytics" element={<PredictiveAdvancedAnalytics />} />
        <Route path="/services/data-science/big-data-solutions" element={<BigDataSolutions />} />
        <Route path="/databricks" element={<Databricks />} />
        <Route path="/snowflake" element={<Snowflake />} />
        <Route path="/aws" element={<AWS />} />
        <Route path="/power-bi" element={<PowerBI />} />
        <Route path="/tableau" element={<Tableau />} />
        <Route path="/n8n" element={<N8N />} />
        <Route path="/oracle" element={<Oracle />} />
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