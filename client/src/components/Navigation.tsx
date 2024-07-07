import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  {
    path: 'share',
    name: 'Share',
  },
  {
    path: 'all-files',
    name: 'All Files',
  },
  {
    path: 'history',
    name: 'History',
  },
  {
    path: 'your-plans',
    name: 'Your Plans',
  },
  {
    path: 'settings',
    name: 'Settings',
  },
];

const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <NavigationMenu className='w-[100%]'>
      <NavigationMenuList>
        {navLinks.map((link, index) => (
          <NavigationMenuItem key={index} className='w-[100%]'>
            <Link to={link.path}>
              <NavigationMenuTrigger
                className={
                  pathname === link.path
                    ? 'bg-[#202020]  text-white dark:bg-white dark:text-black dark:focus:bg-white dark:focus:text-black '
                    : 'dark:bg-transparent'
                }
              >
                {link.name}
              </NavigationMenuTrigger>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
