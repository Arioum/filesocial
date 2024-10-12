import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRecoilState, useRecoilValue } from 'recoil';
import { receiveState, receiveFilesList, ReceiveData, FileData } from '@/recoil/share';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Button } from '@/components/ui/button';

const SharableCodeInput = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [receive, setReceive] = useRecoilState(receiveState);
  const files = useRecoilValue(receiveFilesList);

  const handleComplete = (value: string) => {
    const formattedCode = value.match(/.{1,3}/g)?.join('-') || '';
    setCode(formattedCode);
  };

  const checkExpiration = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const handleReceive = async () => {
    if (code.length !== 11) {
      // 9 characters + 2 separators
      toast.error('Please enter a valid 9-character code');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get<ReceiveData>(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/share/${code}`);
      setReceive(res.data);
      setIsExpired(checkExpiration(res.data.expiresAt));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

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

      toast.success(`Downloaded: ${file.fileName}`);
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
      return;
    }

    if (!files || files.length === 0) {
      toast.warning('No files to download');
      return;
    }

    setIsDownloading(true);

    for (const file of files) {
      await downloadFile(file);
      if (isExpired) break;
    }

    setIsDownloading(false);
  };

  const handleStopReceive = () => {
    setReceive(null);
    setCode('');
    setIsExpired(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h4 className="text-[1.4rem] font-[700] font-secondary">Enter the sharable code</h4>
      <InputOTP
        maxLength={9}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={code.replace(/-/g, '')} // Remove hyphens for input
        onChange={(value) => !receive && setCode(value.match(/.{1,3}/g)?.join('-') || '')}
        onComplete={handleComplete}
        disabled={!!receive}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
          <InputOTPSlot index={8} />
        </InputOTPGroup>
      </InputOTP>
      {!receive ? (
        <Button onClick={handleReceive} disabled={isLoading || code.length !== 11}>
          {isLoading ? 'Loading...' : 'Receive Files'}
        </Button>
      ) : (
        <Button onClick={handleStopReceive} variant="destructive">
          Stop Receive
        </Button>
      )}
      {files && files.length > 0 && (
        <div className="mt-4">
          <h5 className="text-[1.2rem] font-[600] mb-2">Files to download:</h5>
          <ul className="list-disc pl-5 mb-4">
            {files.map((file) => (
              <li key={file._id}>{file.fileName}</li>
            ))}
          </ul>
          <Button onClick={downloadFiles} disabled={isDownloading || isExpired}>
            {isDownloading ? 'Downloading...' : 'Download All Files'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SharableCodeInput;
