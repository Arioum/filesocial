import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <NavigationMenu className='w-[100%]'>
      <NavigationMenuList>
        <NavigationMenuItem className='w-[100%]'>
          <Link to={'/'}>
            <NavigationMenuTrigger
              className={pathname === '/' ? 'bg-[#202020]  text-[#fff]' : ''}
            >
              Share
            </NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='w-[100%]'>
          <Link to={'/all-files'}>
            <NavigationMenuTrigger
              className={
                pathname === '/all-files' ? 'bg-[#202020]  text-[#fff]' : ''
              }
            >
              All Files
            </NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='w-[100%]'>
          <Link to={'/history'}>
            <NavigationMenuTrigger
              className={
                pathname === '/history' ? 'bg-[#202020]  text-[#fff]' : ''
              }
            >
              History
            </NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='w-[100%]'>
          <Link to={'/your-plans'}>
            <NavigationMenuTrigger
              className={
                pathname === '/your-plans' ? 'bg-[#202020] text-[#fff]' : ''
              }
            >
              Your Plans
            </NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='w-[100%]'>
          <Link to={'/settings'}>
            <NavigationMenuTrigger
              className={
                pathname === '/settings' ? 'bg-[#202020]  text-[#fff]' : ''
              }
            >
              Settings
            </NavigationMenuTrigger>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
