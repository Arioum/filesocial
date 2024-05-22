import { useState } from 'react';
import { Button } from './button';

const CopyLinkField = ({ url }: { url: string }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      tickTimer();
    } catch (err) {
      setCopySuccess(false);
    }
  };

  const tickTimer = () => {
    setTimeout(() => {
      console.log('hu');
      setCopySuccess(false);
    }, 500);
  };

  return (
    <div className='bg-[#F1F5F9] border-2 border-[#E2E8F0] rounded-[6px] flex gap-4 items-center p-1 pl-4'>
      <span className='text-[#334155] font-[600]'>{url}</span>
      <Button size='icon' onClick={copyToClipboard}>
        {copySuccess ? (
          <img src='tick-icon.svg' alt='tick-icon' />
        ) : (
          <img src='copy-icon.svg' alt='copy-icon' />
        )}
      </Button>
    </div>
  );
};

export default CopyLinkField;
