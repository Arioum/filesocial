import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { shareHistoryState } from '@/recoil/share';
import { useAuth } from '@/hooks/useAuth';
import { HistoryTable } from '@/components/HistoryTable';

const History = () => {
  const [message, setMessage] = useState(null);
  const [shares, setShares] = useRecoilState(shareHistoryState);
  const { token } = useAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/get-share-history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setShares(res.data.shareList);
        setMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="mx-auto flex flex-col gap-4 items-center justify-start py-[2em] min-h-[100vh]">
      <section className="flex flex-col gap-1 items-center justify-start">
        <h1>History</h1>
        <p className="font-[500] text-[#5a5a5a]">Shows your recent shares and receives</p>
      </section>
      {shares.length === 0 ? <h4 className="py-16">{message}</h4> : <HistoryTable />}
    </main>
  );
};

export default History;
