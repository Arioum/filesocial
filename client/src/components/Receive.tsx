import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useUser } from '@/hooks/useAuth';
import FileSocialLogo from '@/assets/logo';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { receiveFilesList, receiveState, ReceiveData, FileData } from '@/recoil/share';
import { Button } from './ui/button';

const Receive: React.FC = () => {
  const user = useUser();
  const navigate = useNavigate();
  const { sharableCode } = useParams<{ sharableCode: string }>();
  const setReceive = useSetRecoilState(receiveState);
  const files = useRecoilValue(receiveFilesList);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      navigate('/app/share');
    }
  }, [user, navigate]);

  const checkExpiration = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  useEffect(() => {
    const getShareInfo = async () => {
      try {
        const res = await axios.get<ReceiveData>(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/share/${sharableCode}`);
        setReceive(res.data);
        setIsExpired(checkExpiration(res.data.expiresAt));
        setIsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'An error occurred');
          toast(err.response?.data?.message || 'An error occurred');
        } else {
          setError('An unexpected error occurred');
          toast('An unexpected error occurred');
        }
        setIsLoading(false);
      }
    };

    getShareInfo();
  }, [sharableCode, setReceive]);

  const downloadFile = async (file: FileData) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/download-file/${file._id}`);

      if (response.data.isExpired) {
        setIsExpired(true);
        toast.error('This share has expired.');
        return;
      }

      const downloadUrl = response.data.downloadUrl;

      const fileResponse = await fetch(downloadUrl);
      if (!fileResponse.ok) {
        throw new Error(`HTTP error! status: ${fileResponse.status}`);
      }
      const blob = await fileResponse.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast(`Downloaded: ${file.fileName}`);
    } catch (err) {
      console.error(`Error downloading file ${file.fileName}:`, err);
      if (axios.isAxiosError(err) && err.response?.status === 410) {
        setIsExpired(true);
        toast.error('This share has expired.');
      } else {
        toast.error(`Failed to download ${file.fileName}`);
      }
    }
  };

  const downloadFiles = async () => {
    if (isExpired) {
      toast.error('This share has expired.');
      navigate(0);
      return;
    }

    if (!files || files.length === 0) {
      toast('No files to download');
      return;
    }

    setIsDownloading(true);

    for (const file of files) {
      await downloadFile(file);
      if (isExpired) break;
    }

    setIsDownloading(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <FileSocialLogo />
      <div className="h-[90vh] flex flex-col items-center gap-3">
        <h1>Receive</h1>
        <FileInfo files={files} sharableCode={sharableCode} />
        <Button onClick={downloadFiles} disabled={isDownloading || isExpired} className="mt-4">
          {isDownloading ? 'Downloading...' : 'Download All Files'}
        </Button>
      </div>
    </main>
  );
};

const LoadingScreen: React.FC = () => (
  <main className="w-full h-screen flex flex-col gap-3 justify-center items-center">
    <FileSocialLogo />
    <h3 className="bg-black p-[2px_8px] rounded font-[500] text-white">Loading...</h3>
  </main>
);

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => (
  <main className="w-full h-screen flex flex-col gap-3 justify-center items-center">
    <FileSocialLogo />
    <h3 className="bg-black p-[2px_8px] rounded font-[500] text-white">{message}</h3>
  </main>
);

interface FileInfoProps {
  files: FileData[] | undefined;
  sharableCode: string | undefined;
}

const FileInfo: React.FC<FileInfoProps> = ({ files, sharableCode }) => {
  const receive = useRecoilValue(receiveState);

  return (
    <div className="flex flex-col gap-2 items-center">
      <h4 className="text-[1.4rem] font-[700] font-secondary">{receive?.user.userName} wants to share</h4>
      <p className="text-center font-[700] font-secondary">{files?.length} files associated with</p>
      <p className="text-red-500 font-[700]">Code: {sharableCode}</p>
      {files?.map((file) => (
        <div key={file._id}>
          <p>{file.fileName}</p>
        </div>
      ))}
    </div>
  );
};

export default Receive;
