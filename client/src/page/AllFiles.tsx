import { FileTable } from '@/components/FileTable';

const AllFiles = () => {
  return (
    <main className='mx-auto flex flex-col gap-4 items-center justify-start py-[2em] min-h-[100vh]'>
      <section className='flex flex-col gap-1 items-center justify-start'>
        <h1>All Files</h1>
        <p className='font-[500] text-[#5a5a5a]'>
          Contains files that are currently on our servers shared by you
        </p>
      </section>
      <FileTable />
    </main>
  );
};

export default AllFiles;
