import FileSocialLogo from '@/assets/logo';
import Navigation from '@/components/Navigation';
import { ModeToggle } from '@/components/ThemeToggle';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/app') navigate('./share');
  }, [navigate, pathname]);

  return (
    <>
      <header className='h-[100vh] w-[200px] p-[1rem] flex flex-col gap-[2rem] justify-start items-center border-r-[2px] border-[#ececec] dark:border-[#191919]'>
        <FileSocialLogo />
        <Navigation />
        <ModeToggle />
      </header>
      <Outlet />
    </>
  );
};

export default SideBar;
