
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NetworkStatus from "./components/NetworkStatus";

// Lazy-loaded components for better code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Matches = lazy(() => import("./pages/Matches"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Newly added feature pages
const SkillProgressPage = lazy(() => import("./pages/SkillProgress"));
const GroupLearningPage = lazy(() => import("./pages/GroupLearning"));
const GamificationPage = lazy(() => import("./pages/Gamification"));
const VideoChatPage = lazy(() => import("./pages/VideoChat"));
const SchedulingPage = lazy(() => import("./pages/Scheduling"));
const AIToolsPage = lazy(() => import("./pages/AITools"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" 
           role="status" 
           aria-label="Loading"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Configure React Query with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NetworkStatus />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:matchId" element={<Chat />} />
              
              {/* New routes for feature pages */}
              <Route path="/skill-progress" element={<SkillProgressPage />} />
              <Route path="/group-learning" element={<GroupLearningPage />} />
              <Route path="/gamification" element={<GamificationPage />} />
              <Route path="/video-chat" element={<VideoChatPage />} />
              <Route path="/video-chat/:userId" element={<VideoChatPage />} />
              <Route path="/scheduling" element={<SchedulingPage />} />
              <Route path="/ai-tools" element={<AIToolsPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
