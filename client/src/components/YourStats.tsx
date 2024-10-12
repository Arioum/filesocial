import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import StatCard from './StatCard';

const YourStats = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    const getStats = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/get-user-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('stats', response.data.userStats);
      setStats(response.data.userStats);
    };
    getStats();
  }, []);

  // Map the fetched stats into the card data structure
  const cardData = stats
    ? [
        {
          title: 'Shared more than',
          value: `${stats.totalFilesShared}`,
          footer: 'files till date',
        },
        {
          title: 'Share sessions',
          value: `${stats.shareSessions}`,
          footer: 'till date',
        },
        {
          title: 'A total size of',
          value: stats.totalFileSize,
          footer: 'was shared till date',
        },
      ]
    : [];

  return (
    <section className="mx-auto flex flex-col gap-3 rounded-[10px] items-center justify-center py-3">
      <section className="flex flex-col gap-1 items-center justify-center p-2">
        <h2 className="text-[24px] font-[800] font-secondary">Your Stats</h2>
      </section>
      <div className="flex gap-3">
        {cardData.map((card, index) => (
          <StatCard key={index} title={card.title} footer={card.footer} value={card.value} />
        ))}
      </div>
    </section>
  );
};

export default YourStats;
