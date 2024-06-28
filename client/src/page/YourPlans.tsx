const YourPlans = () => {
  const planActive = true;
  return (
    <main className='mx-auto flex flex-col gap-[2em] items-center justify-start py-[2em] min-h-[100vh]'>
      <section className='flex flex-col gap-1 items-center justify-start'>
        <h1>Your Plans</h1>
        <p className='font-[500] text-[#5a5a5a]'>
          {planActive
            ? 'Wohooo!!! You have an active plan'
            : 'Upgrade to pro to enjoy multiple benefits'}
        </p>
      </section>
      <section className='w-[560px] h-[205px] flex items-center gap-[1em] bg-gradient-to-b from-[#FF0000] to-[#540000] border-[#B70000] border rounded-[6px] p-[2em]'>
        <div className='flex flex-col justify-between h-[100%]'>
          <div className='flex items-center gap-[.6em]'>
            <span className='font-secondary text-[1.8rem] font-[900] text-[#fff] leading-[1]'>
              Pro membership
            </span>
            <span className='font-secondary font-[900] text-[#FF0000] bg-[#fff] leading-[1.4] p-[.2em_.4em] rounded-[4px]'>
              ACTIVE
            </span>
          </div>
          <p className='text-[.9rem] text-[#FFCDCD] font-[500]'>
            Access exclusive benefits like unlimited file uploads, increased
            limits on upload size up to 2GB per file
          </p>
          <div className='text-[.9rem] font-[600]'>
            <span className='text-[#fff]'>Your pro membership ends on: </span>
            <span className='text-[#FFD480]'>29 October 2024</span>
          </div>
        </div>
        <div className='min-w-fit'>
          <img
            src='/filesocial-pro.png'
            alt=''
            className='w-[127px] h-[127px]'
          />
        </div>
      </section>
    </main>
  );
};

export default YourPlans;
