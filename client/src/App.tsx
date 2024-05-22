import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Share from './page/Share';
import AllFiles from './page/AllFiles';

const App = () => {
  return (
    <Router>
      <div className='flex'>
        <header className='h-[100vh] w-[200px] p-[1rem] flex flex-col gap-[2rem] justify-start items-center border-r-[2px] border-[#ececec]'>
          <img src='logo.svg' alt='logo' width={150} />
          <Navigation />
        </header>
        <Routes>
          <Route path='/' element={<Share />} />
          <Route path='/all-files' element={<AllFiles />} />
          <Route path='/history' element={<Share />} />
          <Route path='/your-plans' element={<Share />} />
          <Route path='/settings' element={<Share />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
