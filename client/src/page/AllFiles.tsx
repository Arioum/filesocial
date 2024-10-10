import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/hooks/useAuth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fileState, getFormattedTableView } from '@/recoil/file';
import { FileTable } from '@/components/FileTable';

const AllFiles = () => {
  const [message, setMessage] = useState(null);
  const setFiles = useSetRecoilState(fileState);
  const files = useRecoilValue(getFormattedTableView);
  const user = useUser();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/get-all-files`, {
        params: { userId: user?.userId },
      })
      .then((res) => {
        setFiles(res.data.fileList);
        setMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className='mx-auto flex flex-col gap-4 items-center justify-start py-[2em] min-h-[100vh]'>
      <section className='flex flex-col gap-1 items-center justify-start'>
        <h1>All Files</h1>
        <p className='font-[500] text-[#5a5a5a]'>
          Contains files that are currently on our servers shared by you
        </p>
      </section>
      {files.length === 0 ? (
        <h4 className='py-16'>{message}</h4>
      ) : (
        <FileTable />
      )}
    </main>
  );
};

export default AllFiles;
