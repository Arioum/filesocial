import { ProfileForm } from '@/components/Form';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <main className='w-full min-h-[100dvh] flex'>
      <section className='flex-1 bg-black text-white flex flex-col gap-10 items-center justify-center'>
        <div className='flex gap-10 items-center justify-center'>
          <div>
            <h2 className='text-2 font-medium'>Total files shared till date</h2>
            <h3 className='text-5xl font-[800]'>1000+</h3>
          </div>
          <div>
            <h2 className='text-2 font-medium'>Total users</h2>
            <h3 className='text-5xl font-[800]'>25+</h3>
          </div>
          <div>
            <h2 className='text-2 font-medium'>Total files shared till date</h2>
            <h3 className='text-5xl font-[800]'>1000+</h3>
          </div>
        </div>
        <div className='max-w-[90%]'>
          <p className='text-[10px] text-center'>
            *Platform stats shown here just for demonstation purposes as the app
            is still in pre-alpha. Actual stats will be shown once the app makes
            it into production.
          </p>
        </div>
      </section>
      <section className='flex-1 flex'>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <ProfileForm />
          <Link to='/app'>Skip for now</Link>
        </div>
      </section>
    </main>
  );
};

export default Auth;
