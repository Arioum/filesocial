import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Check } from '../assets/icons';

const ProCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary p-6 lg:p-8 rounded-lg shadow-lg flex flex-col gap-6 text-primary-foreground w-[400px]">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Pro</h3>
        <p className="text-4xl font-bold">$9</p>
        <p className="text-primary-foreground">per month</p>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 fill-primary-foreground" />
          <p>2GB Upload Limit</p>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 fill-primary-foreground" />
          <p>Unlimited file uploads</p>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 fill-primary-foreground" />
          <p>Share time up to 30mins</p>
        </div>
      </div>
      <Button className="w-full bg-white text-black hover:bg-slate-200" onClick={() => navigate('?subscribe=pro')}>
        Get Pro
      </Button>
    </div>
  );
};

export default ProCard;
