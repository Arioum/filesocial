import { ModeToggle } from '@/components/ThemeToggle';

const Settings = () => {
  return (
    <main className='mx-auto flex flex-col gap-[2em] items-center justify-start py-[2em] min-h-[100vh]'>
      <section className='flex flex-col gap-1 items-center justify-start'>
        <h1>Settings</h1>
      </section>
      <section className='w-[400px] flex justify-between items-center'>
        <div className='flex flex-col justify-start'>
          <h4 className='text-[1.2rem] font-[700]'>Preferences</h4>
          <p>Theme</p>
        </div>
        <ModeToggle />
      </section>
    </main>
  );
};

export default Settings;
