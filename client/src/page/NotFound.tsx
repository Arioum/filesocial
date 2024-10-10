import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="h-[100dvh] w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-5xl font-[700]">404 </h2>
          <h3 className="tracking-[6px] font-[600]">NOT FOUND</h3>
        </div>
        <p className="font-[500]">🤔The resource your looking for does not exist</p>
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </main>
  );
};

export default NotFound;
