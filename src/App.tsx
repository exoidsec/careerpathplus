import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CareersPage from "./pages/CareersPage";
import CommunityPage from "./pages/CommunityPage";
import SkillsPage from "./pages/SkillsPage";
import InternshipsPage from "./pages/InternshipsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import CollegesPage from "./pages/CollegesPage";
import NGOsPage from "./pages/NGOsPage";
import CommunityChatPage from "./pages/CommunityChatPage";
import AIChatPage from "./pages/AIChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/colleges" element={<CollegesPage />} />
              <Route path="/ngos" element={<NGOsPage />} />
              <Route path="/chat" element={<CommunityChatPage />} />
              <Route path="/ai-chat" element={<AIChatPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
