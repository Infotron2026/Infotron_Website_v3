import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import ManagedServices from "@/pages/ManagedServices";
import StaffAugmentation from "@/pages/StaffAugmentation";
import BusinessConsulting from "@/pages/BusinessConsulting";
import CapitalProjects from "@/pages/CapitalProjects";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import Careers from "@/pages/Careers";
import JobDetail from "@/pages/JobDetail";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/managed-services" element={<ManagedServices />} />
          <Route path="/services/staff-augmentation" element={<StaffAugmentation />} />
          <Route path="/services/business-consulting" element={<BusinessConsulting />} />
          <Route path="/capital-projects" element={<CapitalProjects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/case-studies/:id" element={<Resources />} />
          <Route path="/resources/blog/:slug" element={<Resources />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:jobId" element={<JobDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
