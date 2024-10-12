import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fileIdsState, uploadCountState, progressState } from '@/recoil/file';
import { useUser } from '@/hooks/useAuth';
import { Progress } from './ui/progress';
import { shareLimits } from '@/recoil/auth';

export const FileUpload = () => {
  const user = useUser();
  const uploadLimits = useRecoilValue(shareLimits);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useRecoilState(progressState);
  const [uploadedFileIds, setUploadedFileIds] = useRecoilState(fileIdsState);
  const [uploadCount, setUploadCount] = useRecoilState(uploadCountState);

  console.log('Upload Limits:', uploadLimits);

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
    [user, uploadLimits, setProgress]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const uploadLimit = uploadLimits?.uploadLimit || 1;

    console.log('Files selected:', files.length);
    console.log('Current upload count:', uploadCount);
    console.log('Upload limit:', uploadLimit);

    if (uploadCount + files.length > uploadLimit) {
      toast.error(`You can only upload up to ${uploadLimit} files in total.`);
      e.target.value = ''; // Reset file input
      return;
    }

    setIsUploading(true);
    const uploadPromises = files.map(uploadFile);
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((id): id is string => id !== null);

    setUploadCount((prev) => prev + successfulUploads.length);
    setUploadedFileIds((prev) => [...prev, ...successfulUploads]);
    setIsUploading(false);
    e.target.value = ''; // Reset file input after upload

    if (uploadCount + successfulUploads.length >= uploadLimit) {
      toast.info(`You have reached the maximum upload limit of ${uploadLimit} files.`);
    }
  };

  const resetUploadCount = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/cancel-uploads`, {
      userId: user?.userId,
      fileIds: uploadedFileIds,
    });
    console.log(response.data);

    setUploadCount(0);
    setUploadedFileIds([]);
    setProgress({});
    toast.success('Upload count reset. You can upload new files now.');
  };

  return (
    <div className='flex flex-col gap-4'>
      <input type="file" onChange={handleFileChange} multiple disabled={uploadCount >= (uploadLimits?.uploadLimit || 1)} />
      {isUploading && <p>Uploading...</p>}

      <div className="border border-[#eee] rounded-[8px] px-4 my-3">
        {Object.entries(progress).map(([fileName, value]) => (
          <div key={fileName} className="flex justify-between items-center py-2 border-b">
            <p>{fileName}</p>
            <Progress value={value} className="h-[10px] w-[100px]" />
          </div>
        ))}
      </div>

      <p>Uploaded File IDs:</p>
      {uploadedFileIds.map((fileId) => (
        <p key={fileId}>{fileId}</p>
      ))}
      <p>Files uploaded: ({uploadCount}/{uploadLimits?.uploadLimit})</p>
      {uploadedFileIds.length > 0 && <button onClick={resetUploadCount}>Reset Upload Count</button>}
    </div>
  );
};
