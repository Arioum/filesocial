import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './lib/theme-provider';
import Share from './page/Share';
import AllFiles from './page/AllFiles';
import History from './page/History';
import YourPlans from './page/YourPlans';
import Settings from './page/Settings';
import Auth from './page/Auth';
import SideBar from './layouts/SideBar';
import Landing from './page/Landing';
import AppHome from './page/AppHome';

const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Router>
        <div className='flex dark:bg-[#09090b] dark:text-[#fff]'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='app' element={<SideBar />}>
              <Route index element={<AppHome />} />
              <Route path='share' element={<Share />} />
              <Route path='all-files' element={<AllFiles />} />
              <Route path='history' element={<History />} />
              <Route path='your-plans' element={<YourPlans />} />
              <Route path='settings' element={<Settings />} />
            </Route>
            <Route path='auth' element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
