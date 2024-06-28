import { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';

const uploadFileInChunks = async (file: File) => {
  const chunkSize = 5 * 1024 * 1024; // 5MB per chunk
  const totalChunks = Math.ceil(file.size / chunkSize);
  const fileIdentifier = `${Date.now()}`;

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());
    formData.append('fileIdentifier', fileIdentifier);
    formData.append('originalFileName', file.name);

    try {
      await axios.post('http://localhost:4000/api/v1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const total = progressEvent.total ?? file.size;
          const progress = Math.round((progressEvent.loaded * 100) / total);
          console.log(
            `Chunk ${chunkIndex + 1} of ${totalChunks} - ${progress}% uploaded`
          );
        },
      });
    } catch (error) {
      console.error(`Error uploading chunk ${chunkIndex + 1}`, error);
    }
  }
};

const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadFileInChunks(file);
    }
  };

  return (
    <div className='flex flex-col items-center p-[1em]'>
      <input type='file' onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className='bg-[#e7e7e7] rounded-[6px] p-[.8em_1.6em] text-[.85rem] font-[500] text-[#666666] w-fit'
      >
        Choose Files to Upload
      </button>
    </div>
  );
};

export default UploadButton;
