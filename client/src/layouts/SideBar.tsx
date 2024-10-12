import { Link, Outlet } from 'react-router-dom';
import { useUser } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import FileSocialLogo from '@/assets/logo';
import { ProfileViewerCard } from '@/components/ProfileViewerCard';

const SideBar = () => {
  const user = useUser();

  return (
    <>
      <header className="h-[100vh] w-[200px] p-[1rem] flex flex-col justify-between items-center border-r-[2px] border-[#ececec] dark:border-[#191919]">
        <div className="w-full flex flex-col gap-[2rem] justify-start items-center">
          <Link to={'/app'}>
            <FileSocialLogo />
          </Link>
          <Navigation />
        </div>
        {user && <ProfileViewerCard userName={user.userName} />}
      </header>
      <Outlet />
    </>
  );
};

export default SideBar;
