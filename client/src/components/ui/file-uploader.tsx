import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 100);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-fit bg-background'>
      <div
        className={`relative flex flex-col items-center justify-center w-full max-w-md p-8 border-2 border-dashed rounded-lg transition-colors ${
          file ? 'border-primary' : 'border-muted'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CloudUploadIcon className='w-12 h-12 mb-4 text-muted-foreground' />
        <h3 className='mb-2 text-xl font-bold'>Drag and drop files here</h3>
        <p className='text-muted-foreground'>or</p>
        <label
          htmlFor='file-input'
          className='inline-flex items-center justify-center px-4 py-2 mt-4 text-sm font-medium text-primary-foreground bg-primary rounded-md cursor-pointer hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[#e7e7e7] p-[.8em_1.6em] text-[.85rem] text-[#666666] w-fit'
        >
          <input
            id='file-input'
            type='file'
            className='sr-only'
            onChange={handleFileSelect}
          />
          Select a file
        </label>
      </div>
      {file && (
        <div className='flex min-w-[300px]'>
          <div className='flex items-center justify-between mb-2'>
            <p className='text-sm font-medium'>{file.name}</p>
          </div>
          <Progress value={progress} className='h-[10px] w-[100px]' />
          {/* <p className='text-sm text-muted-foreground'>
          {progress.toFixed(2)}%
        </p> */}
        </div>
      )}
    </div>
  );
}

function CloudUploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' />
      <path d='M12 12v9' />
      <path d='m16 16-4-4-4 4' />
    </svg>
  );
}
