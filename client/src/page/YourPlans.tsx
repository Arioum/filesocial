import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProSubsciptionCard from '@/components/ProSubsciptionCard';
import UpgradePlan from '@/components/UpgradePlan';
import { subscriptionDetails, userSubscriptionLevel } from '@/recoil/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAuth, useUser } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProCard from '@/components/ProCard';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const YourPlans = () => {
  const subscriptionLevel = useRecoilValue(userSubscriptionLevel);
  const setSubscriptionDetails = useSetRecoilState(subscriptionDetails);
  const [showUpgradePlan, setShowUpgradePlan] = useState<boolean>(false);

  const user = useUser();
  const { token } = useAuth();
  console.log(user);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('subscribe') === 'pro') {
      setShowUpgradePlan(true);
    }
  }, [location]);

  useEffect(() => {
    const getSubscriptionInfo = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/your-plan-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubscriptionDetails(response.data.subscription);
    };
    if (subscriptionLevel && subscriptionLevel > 0) {
      getSubscriptionInfo();
    }
  }, [subscriptionLevel, token, setSubscriptionDetails]);

  return (
    <main className="mx-auto flex flex-col gap-[2em] items-center justify-start py-[2em] min-h-[100vh]">
      <section className="flex flex-col gap-1 items-center justify-start">
        <h1>Your Plans</h1>
        <p className="font-[500] text-[#5a5a5a]">
          {subscriptionLevel === 0 ? 'Upgrade to pro to enjoy multiple benefits' : 'Wohooo!!! You have an active plan'}
        </p>
      </section>
      {subscriptionLevel === 0 ? (
        <>
          <ProCard />
          {showUpgradePlan ? (
            <Elements stripe={stripePromise}>
              <UpgradePlan />
            </Elements>
          ) : null}
        </>
      ) : (
        <ProSubsciptionCard />
      )}
    </main>
  );
};

export default YourPlans;
