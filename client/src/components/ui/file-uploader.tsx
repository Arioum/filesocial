import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fileIdsState, uploadCountState, progressState } from '@/recoil/file';
import { useAuth, useUser } from '@/hooks/useAuth';
import { Progress } from './progress';
import { CloudUploadIcon } from 'lucide-react';
import { shareLimits } from '@/recoil/auth';
import { Button } from './button';

export const FileUploader = () => {
  const user = useUser();
  const uploadLimits = useRecoilValue(shareLimits);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useRecoilState(progressState);
  const [uploadedFileIds, setUploadedFileIds] = useRecoilState(fileIdsState);
  const [uploadCount, setUploadCount] = useRecoilState(uploadCountState);
  const [fileDragging, setFileDragging] = useState(false);
  const { token } = useAuth();

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
    await processFiles(files);
    e.target.value = ''; // Reset file input after upload
  };

  const processFiles = async (files: File[]) => {
    const uploadLimit = uploadLimits?.uploadLimit || 1;

    if (uploadCount + files.length > uploadLimit) {
      toast.error(`You can only upload up to ${uploadLimit} files in total.`);
      return;
    }

    setIsUploading(true);
    const uploadPromises = files.map(uploadFile);
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((id): id is string => id !== null);

    setUploadCount((prev) => prev + successfulUploads.length);
    setUploadedFileIds((prev) => [...prev, ...successfulUploads]);
    setIsUploading(false);

    if (uploadCount + successfulUploads.length >= uploadLimit) {
      toast.info(`You have reached the maximum upload limit of ${uploadLimit} files.`);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const resetUploadCount = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/cancel-uploads`,
      {
        userId: user?.userId,
        fileIds: uploadedFileIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    setUploadCount(0);
    setUploadedFileIds([]);
    setProgress({});
    toast.success('Upload count reset. You can upload new files now.');
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit bg-background">
      <div
        className={`relative flex flex-col items-center justify-center w-full max-w-md p-8 border-2 border-dashed rounded-lg transition-colors ${
          fileDragging ? 'border-primary' : 'border-muted'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={() => setFileDragging(false)}
      >
        <CloudUploadIcon className="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 className="mb-2 text-xl font-bold">Drag and drop files here</h3>
        <p className="text-muted-foreground">or</p>
        <label
          htmlFor="file-input"
          className="inline-flex items-center justify-center px-4 py-2 mt-4 text-sm font-medium text-primary-foreground bg-primary rounded-md cursor-pointer hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[#e7e7e7] p-[.8em_1.6em] text-[.85rem] text-[#666666] w-fit"
        >
          <input
            id="file-input"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            multiple
            disabled={uploadCount >= (uploadLimits?.uploadLimit || 1)}
          />
          Select files
        </label>
      </div>
      {isUploading && <p>Uploading...</p>}

      <div className="border border-[#eee] rounded-[8px] px-4 my-3 w-full max-w-md">
        {Object.entries(progress).map(([fileName, value]) => (
          <div key={fileName} className="flex justify-between items-center py-2 border-b">
            <p>{fileName}</p>
            <Progress value={value} className="h-[10px] w-[100px]" />
          </div>
        ))}
      </div>

      {/* <p>Uploaded File IDs:</p>
      {uploadedFileIds.map((fileId) => (
        <p key={fileId}>{fileId}</p>
      ))} */}
      {uploadedFileIds.length > 0 && <Button onClick={resetUploadCount}>Reset Uploads</Button>}
      <p className='my-2'>
        Files uploaded: ({uploadCount}/{uploadLimits?.uploadLimit})
      </p>
    </div>
  );
};
