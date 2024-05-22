import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dialogue from './Dialogue';
import CopyLinkField from './ui/copylink-field';

const ShareTabs = () => {
  return (
    <Tabs
      defaultValue='account'
      className='w-[400px] flex flex-col gap-[1em] items-center'
    >
      <TabsList>
        <TabsTrigger value='account'>Send</TabsTrigger>
        <TabsTrigger value='password'>Receive</TabsTrigger>
      </TabsList>
      <TabsContent
        value='account'
        className='flex flex-col gap-[2em] items-center'
      >
        <div className='flex flex-col gap-2 items-center'>
          <h4 className='text-[1.4rem] font-[700] font-secondary'>
            Choose files to upload
          </h4>
          <p className='text-center font-[500] font-secondary'>
            Send up to 3 files at once with each file limited to a size of 10MB
            since you are on a <span className='text-[#FF0000]'>free plan</span>
          </p>
          <input type='file' name='uploadFiles' />
          <img src='no-file.svg' alt='no-file-icon' />
          <span className='font-[600]'>No files added yet</span>
        </div>
        <Dialogue
          title='Start sharing?'
          desc='You will start sharing immediately and will receive a link through which you can share the uploaded files.'
        >
          Start Sharing
        </Dialogue>
      </TabsContent>
      <TabsContent
        value='password'
        className='flex flex-col gap-[2em] items-center mt-[-1em]'
      >
        <div className='flex flex-col gap-2 items-center'>
          <h4 className='text-[1.4rem] font-[700] font-secondary'>
            You have started sharing
          </h4>
          <p className='text-center font-[700] font-secondary'>
            Copy the link below and share it to the recipient
          </p>
          <CopyLinkField url='https://filesocial.vercel.app/share/Yd93mfZ093d' />
        </div>
        <Dialogue
          title='Stop sharing?'
          desc='This will stop the sharing action immediately and any uploaded files will be removed from our servers.'
        >
          Stop Sharing
        </Dialogue>
      </TabsContent>
    </Tabs>
  );
};

export default ShareTabs;
