import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AppHome = () => {
  return (
    <main className="mx-auto flex flex-col gap-10 items-center justify-center py-[2em] min-h-[100vh]">
      <h1>Send and Receive files</h1>
      <img src="share-link.svg" alt="app-home" />
      <div className="flex gap-[1em]">
        <Link to="/app/share?action=send" reloadDocument>
          <Button className="w-[160px] h-[50px]">Send</Button>
        </Link>
        <Link to="/app/share?action=receive" reloadDocument>
          <Button className="w-[160px] h-[50px]">Receive</Button>
        </Link>
      </div>
    </main>
  );
};

export default AppHome;
