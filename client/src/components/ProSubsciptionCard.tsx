import { formattedSubscriptionDetails } from '@/recoil/auth';
import { useRecoilValue } from 'recoil';

const ProSubsciptionCard = () => {
  const subscriptionEndDate = useRecoilValue(formattedSubscriptionDetails);

  return (
    <section className="w-[560px] flex items-center gap-[1em] bg-gradient-to-b from-[#FF0000] to-[#540000] border-[#B70000] border rounded-[6px] p-[2em]">
      <div className="flex flex-col gap-4 justify-between h-[100%]">
        <div className="flex items-center gap-[.6em]">
          <span className="font-secondary text-[1.8rem] font-[900] text-[#fff] leading-[1]">Pro membership</span>
          <span className="font-secondary font-[900] text-[#FF0000] bg-[#fff] leading-[1.4] p-[.2em_.4em] rounded-[4px]">ACTIVE</span>
        </div>
        <p className="text-[.9rem] text-[#FFCDCD] font-[500]">
          Access exclusive benefits like unlimited file uploads, increased limits on upload size up to 2GB per file
        </p>
        <div className="text-[.9rem] font-[600] flex flex-col">
          <span className="text-[#fff]">Your pro membership ends on: </span>
          <span className="text-[#FFD480]">{subscriptionEndDate}</span>
        </div>
      </div>
      <div className="min-w-fit">
        <img src="/filesocial-pro.png" alt="" className="w-[127px] h-[127px]" />
      </div>
    </section>
  );
};

export default ProSubsciptionCard;
