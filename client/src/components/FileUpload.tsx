import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fileIdsState } from '@/recoil/file';
import { useUser } from '@/hooks/useAuth';
import { Progress } from './ui/progress';
import { shareLimits } from '@/recoil/auth';

export const FileUpload = () => {
  const user = useUser();
  const uploadLimits = useRecoilValue(shareLimits);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFileIds, setUploadedFileIds] = useRecoilState(fileIdsState);

  const uploadFile = useCallback(
    async (file: File) => {
      const { name: fileName, type: fileType, size: fileSize } = file;
      setProgress((prev) => ({ ...prev, [fileName]: 0 }));

      const maxUploadSize = uploadLimits?.maxUploadSize || (user?.subscriptionLevel === 1 ? 2048 : 10);

      if (fileSize > maxUploadSize * 1024 * 1024) {
        toast.error(`File ${fileName} exceeds size limit. Max allowed size: ${maxUploadSize}MB`);
        return null;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/get-presigned-url`, {
          fileName,
          fileType,
          fileSize,
          userId: user?.userId,
        });

        const { url, fileId } = response.data;

        await axios.put(url, file, {
          headers: { 'Content-Type': fileType },
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
            setProgress((prev) => ({ ...prev, [fileName]: percentCompleted }));
          },
        });

        toast.success(`File ${fileName} uploaded successfully!`);
        return fileId;
      } catch (err) {
        console.error(`Error uploading file ${fileName}:`, err);
        toast.error(`Upload failed for ${fileName}: ${axios.isAxiosError(err) ? err.response?.data.message || err.message : 'Unexpected error'}`);
        return null;
      }
    },
    [user, uploadLimits]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadLimit = uploadLimits?.uploadLimit || 1;

    if (files.length > uploadLimit) {
      toast.error(`You can only upload up to ${uploadLimit} files at a time.`);
      return;
    }

    setIsUploading(true);
    const uploadPromises = files.map(uploadFile);
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((id): id is string => id !== null);

    setUploadedFileIds((prev) => [...prev, ...successfulUploads]);
    setIsUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      {isUploading && <p>Uploading...</p>}
      {Object.entries(progress).map(([fileName, value]) => (
        <div key={fileName}>
          <p>{fileName}</p>
          <Progress value={value} className="h-[10px] w-[100px]" />
        </div>
      ))}
      <p>Uploaded File IDs:</p>
      {uploadedFileIds.map((fileId) => (
        <p key={fileId}>{fileId}</p>
      ))}
    </div>
  );
};
