import ShareTabs from '@/components/ShareTabs';

const Share = () => {
  return (
    <main className='mx-auto flex flex-col gap-4 items-center justify-center py-[2em] min-h-[100vh]'>
      <h1>Send and Receive files</h1>
      <ShareTabs />
    </main>
  );
};

export default Share;
