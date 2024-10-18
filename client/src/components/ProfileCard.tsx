import { useUser } from '@/hooks/useAuth';
import { formattedUserCreatedAt, userSubscriptionLevel } from '@/recoil/auth';
import { useRecoilValue } from 'recoil';
import { EditUserDialog } from './EditUserDialog';
import ProBadge from '@/assets/pro-badge';

const ProfileCard = () => {
  const user = useUser();
  const subscriptionLevel = useRecoilValue(userSubscriptionLevel);
  const joinedDate = useRecoilValue(formattedUserCreatedAt);
  
  return (
    <section className="w-[400px] mx-auto flex gap-6 rounded-[10px] items-center justify-center">
      <div className="w-[120px] h-[120px] rounded-[100px]">
        <img src="/avatar.svg" alt="avatar" className="w-full" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[20px] font-[900] text-[#292929] font-secondary leading-3">{user?.userName}</h2>
          {subscriptionLevel === 1 && <ProBadge />}
        </div>
        <div className="">
          <p className="text-[14px] text-[#64748B] font-[900] font-secondary leading-3">Joined on {joinedDate}</p>
        </div>
        <EditUserDialog>Edit</EditUserDialog>
      </div>
    </section>
  );
};

export default ProfileCard;
