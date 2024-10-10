import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';

interface ProfileCardProps {
  userName: string;
  className?: string;
}

export function ProfileCard({
  userName = 'User',
  className,
}: ProfileCardProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <Card
      className={clsx(
        className,
        'w-full bg-slate-100 p-[8px_12px] flex justify-between items-center'
      )}
    >
      <div className='flex flex-col'>
        <CardHeader className='p-0 leading-0'>
          <CardTitle className='text-[.9rem] m-0 p-0'>{userName}</CardTitle>
        </CardHeader>
        <Link
          to={`${pathname}/profile`}
          className='hover:underline text-[.80rem] m-0 p-0 leading-0'
        >
          View profile
        </Link>
      </div>
      <Button className='max-h-fit max-w-fit p-2' onClick={handleLogout}>
        <LogOut className='h-5 w-5' />
      </Button>
    </Card>
  );
}
