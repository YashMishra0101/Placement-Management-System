import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Footer from "./components/landing/Footer";
import NotFound from "./pages/NotFound";
import Faqs from "./pages/Faqs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RecruiterJobPostPage from "./pages/RecruiterJobPostPage "
import JobListingsPage from "./pages/JobListingsPage";
import ContactUs from "./pages/ContactUs"


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/dashboard" element={<AdminDashboard/>} />
          <Route path="/recruiterjobpostpage" element={<RecruiterJobPostPage/>} />
          <Route path="/joblistingspage" element={<JobListingsPage/>} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
