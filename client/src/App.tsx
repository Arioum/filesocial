import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from './lib/theme-provider';
import { ProtectedRoute } from './lib/protected-routes';
import Auth from './page/Auth';
import SideBar from './layouts/SideBar';
import AppHome from './page/AppHome';
import Share from './page/Share';
import AllFiles from './page/AllFiles';
import History from './page/History';
import YourPlans from './page/YourPlans';
import Settings from './page/Settings';
import Landing from './page/Landing';
import NotFound from './page/NotFound';
import Receive from './components/Receive';
import { Toaster } from './components/ui/sonner';
import Profile from './page/Profile';

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <SideBar />
            </ProtectedRoute>
          }
        >
          <Route index element={<AppHome />} />
          <Route path="share" element={<Share />} />
          <Route path="all-files" element={<AllFiles />} />
          <Route path="history" element={<History />} />
          <Route path="your-plans" element={<YourPlans />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="auth" element={<Auth />} />
        <Route path="share/:sharableCode" element={<Receive />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="flex dark:bg-[#09090b] dark:text-[#fff]">
          <AppContent />
          <Toaster className="border" position="bottom-right" />
        </div>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
