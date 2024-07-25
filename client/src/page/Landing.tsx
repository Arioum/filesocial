import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className='flex flex-col'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <Link to='#' className='flex items-center justify-center'>
          <img
            src='logo.svg'
            alt='fileSocial'
            className='mx-auto aspect-video overflow-hidden object-contain'
          />
          <span className='sr-only'>Acme File Sharing</span>
        </Link>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <Link
            to='#'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            Features
          </Link>
          <Link
            to='#'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            Pricing
          </Link>
          <Link
            to='#'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            About
          </Link>
          <Link
            to='#'
            className='text-sm font-medium hover:underline underline-offset-4'
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_550px]'>
              <div className='flex flex-col justify-center space-y-4 order-first'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold  tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Secure file sharing for your team
                  </h1>
                  <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                    Easily share files, collaborate in real-time, and keep your
                    data secure with our powerful file sharing app.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Link
                    to='/auth'
                    className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-[#fff] shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  >
                    Try it Free
                  </Link>
                  <Link
                    to='#'
                    className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src='hero.svg'
                width='550'
                height='550'
                alt='Hero'
                className='mx-auto aspect-video overflow-hidden rounded-xl object-contain sm:w-full lg:order-first lg:aspect-square'
              />
            </div>
          </div>
        </section>

        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
                  Secure File Sharing
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Protect your data with end-to-end encryption
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our file sharing app uses the latest encryption technology to
                  keep your data safe and secure, so you can share with
                  confidence.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
              <img
                src='secure.svg'
                width='550'
                height='310'
                alt='Secure File Sharing'
                className='mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last'
              />
              <div className='flex flex-col justify-center space-y-4'>
                <ul className='grid gap-6'>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        End-to-End Encryption
                      </h3>
                      <p className='text-muted-foreground'>
                        Your files are encrypted before they leave your device,
                        ensuring only you and your team can access them.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>Instant Sharing</h3>
                      <p className='text-muted-foreground'>
                        Share files with your team in seconds, no matter where
                        they are.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        Real-Time Collaboration
                      </h3>
                      <p className='text-muted-foreground'>
                        Work together on documents, spreadsheets, and more in
                        real-time, with changes synced instantly.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
                  Remote Work
                </div>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Empower your remote team
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our file sharing app makes it easy for remote teams to
                  collaborate, share files, and stay connected, no matter where
                  they are.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
              <img
                src='colab.svg'
                width='550'
                height='310'
                alt='Remote Work'
                className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full'
              />
              <div className='flex flex-col justify-center space-y-4'>
                <ul className='grid gap-6'>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        Seamless Collaboration
                      </h3>
                      <p className='text-muted-foreground'>
                        Work together on projects in real-time, with changes
                        synced instantly across your team.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        Centralized File Management
                      </h3>
                      <p className='text-muted-foreground'>
                        Keep all your team's files in one secure location,
                        accessible from anywhere.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>Instant Sharing</h3>
                      <p className='text-muted-foreground'>
                        Share files with your team in seconds, no matter where
                        they are.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 mb-6 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Key Features
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our file sharing app offers a range of powerful features to
                  streamline your workflow and keep your data secure.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3'>
              <div className='grid gap-1'>
                <div className='flex items-center gap-2'>
                  <LockIcon className='h-6 w-6 text-primary' />
                  <h3 className='text-lg font-bold'>Advanced Security</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Protect your files with end-to-end encryption and multi-factor
                  authentication.
                </p>
              </div>
              <div className='grid gap-1'>
                <div className='flex items-center gap-2'>
                  <TabletsIcon className='h-6 w-6 text-primary' />
                  <h3 className='text-lg font-bold'>Seamless Collaboration</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Invite team members to view, edit, and comment on shared files
                  in real-time.
                </p>
              </div>
              <div className='grid gap-1'>
                <div className='flex items-center gap-2'>
                  <DownloadIcon className='h-6 w-6 text-primary' />
                  <h3 className='text-lg font-bold'>Fast File Transfers</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Enjoy lightning-fast file uploads and downloads, even for
                  large files.
                </p>
              </div>
              <div className='grid gap-1'>
                <div className='flex items-center gap-2'>
                  <FolderIcon className='h-6 w-6 text-primary' />
                  <h3 className='text-lg font-bold'>Organized Storage</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Keep your files organized with a user-friendly folder
                  structure and powerful search.
                </p>
              </div>
              <div className='grid gap-1'>
                <div className='flex items-center gap-2'>
                  <ActivityIcon className='h-6 w-6 text-primary' />
                  <h3 className='text-lg font-bold'>Activity Tracking</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Monitor file activity, access history, and version changes
                  with detailed logs.
                </p>
              </div>
              <div className='grid gap-1'>
                <div className='flex items-center gap-2'>
                  <CloudIcon className='h-6 w-6 text-primary' />
                  <h3 className='text-lg font-bold'>Scalable Cloud Storage</h3>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Enjoy unlimited cloud storage that scales with your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container px-4 md:px-6 grid gap-8 md:gap-12 lg:gap-16'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Pricing
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Choose the plan that fits your needs. Get started with our
                  free tier or unlock more features with our Pro plan.
                </p>
              </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
              <div className='bg-background p-6 lg:p-8 rounded-lg shadow-lg flex flex-col gap-6'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold'>Free</h3>
                  <p className='text-4xl font-bold'>$0</p>
                  <p className='text-muted-foreground'>per month</p>
                </div>
                <div className='grid gap-4'>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary' />
                    <p>1GB storage</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary' />
                    <p>5 file uploads per month</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary' />
                    <p>View-only access</p>
                  </div>
                </div>
                <Button variant='outline' className='w-full'>
                  Get Started
                </Button>
              </div>
              <div className='bg-primary p-6 lg:p-8 rounded-lg shadow-lg flex flex-col gap-6 text-primary-foreground'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold'>Pro</h3>
                  <p className='text-4xl font-bold'>$9</p>
                  <p className='text-primary-foreground'>per month</p>
                </div>
                <div className='grid gap-4'>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary-foreground' />
                    <p>100GB storage</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary-foreground' />
                    <p>Unlimited file uploads</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary-foreground' />
                    <p>Password protection</p>
                  </div>
                </div>
                <Button className='w-full'>Get Pro</Button>
              </div>
              <div className='bg-background p-6 lg:p-8 rounded-lg shadow-lg flex flex-col gap-6'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold'>
                    Enterprise (Coming Soon)
                  </h3>
                  <p className='text-4xl font-bold'>Contact us</p>
                  <p className='text-muted-foreground'>for pricing</p>
                </div>
                <div className='grid gap-4'>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary' />
                    <p>Customized storage</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary' />
                    <p>Unlimited file uploads</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Check className='w-5 h-5 fill-primary' />
                    <p>Advanced security</p>
                  </div>
                </div>
                <Button variant='outline' className='w-full'>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center justify-center gap-4 px-4 text-center md:px-6'>
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                Try our file sharing app today
              </h2>
              <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Experience the power of secure, real-time file sharing for your
                team.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row justify-center'>
              <Link
                to='/auth'
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                Try it Free
              </Link>
              {/* <Link
                to='#'
                className='inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
              >
                Learn More
              </Link> */}
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-muted-foreground'>
          &copy; 2024 FileSocial. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link to='#' className='text-xs hover:underline underline-offset-4'>
            Terms of Service
          </Link>
          <Link to='#' className='text-xs hover:underline underline-offset-4'>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CloudIcon(props) {
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
      <path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
    </svg>
  );
}

function ActivityIcon(props) {
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
      <path d='M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2' />
    </svg>
  );
}

function DownloadIcon(props) {
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
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='7 10 12 15 17 10' />
      <line x1='12' x2='12' y1='15' y2='3' />
    </svg>
  );
}

function FolderIcon(props) {
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
      <path d='M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z' />
    </svg>
  );
}

function ShareIcon(props) {
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
      <path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
      <polyline points='16 6 12 2 8 6' />
      <line x1='12' x2='12' y1='2' y2='15' />
    </svg>
  );
}

function TabletsIcon(props) {
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
      <circle cx='7' cy='7' r='5' />
      <circle cx='17' cy='17' r='5' />
      <path d='M12 17h10' />
      <path d='m3.46 10.54 7.08-7.08' />
    </svg>
  );
}

function UploadIcon(props) {
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
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='17 8 12 3 7 8' />
      <line x1='12' x2='12' y1='3' y2='15' />
    </svg>
  );
}

function CombineIcon(props) {
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
      <rect width='8' height='8' x='2' y='2' rx='2' />
      <path d='M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2' />
      <path d='M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2' />
      <path d='M10 18H5c-1.7 0-3-1.3-3-3v-1' />
      <polyline points='7 21 10 18 7 15' />
      <rect width='8' height='8' x='14' y='14' rx='2' />
    </svg>
  );
}

function FolderSyncIcon(props) {
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
      <path d='M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5' />
      <path d='M12 10v4h4' />
      <path d='m12 14 1.535-1.605a5 5 0 0 1 8 1.5' />
      <path d='M22 22v-4h-4' />
      <path d='m22 18-1.535 1.605a5 5 0 0 1-8-1.5' />
    </svg>
  );
}

function InfoIcon(props) {
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
      <circle cx='12' cy='12' r='10' />
      <path d='M12 16v-4' />
      <path d='M12 8h.01' />
    </svg>
  );
}

function LockIcon(props) {
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
      <rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
      <path d='M7 11V7a5 5 0 0 1 10 0v4' />
    </svg>
  );
}
