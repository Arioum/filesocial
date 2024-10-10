import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dialogue from './Dialogue';
import CopyLinkField from './CopyLinkField';
// import UploadButton from './UploadButton';
import IconSharingFile from '@/assets/sharing-file';
import { FileUpload } from './FileUpload';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fileIdsState } from '@/recoil/file';
import { useAuth, useUser } from '@/hooks/useAuth';
import { shareState } from '@/recoil/share';
import { shareLimits } from '@/recoil/auth';

const ShareTabs = () => {
  const [uploadedFileIds, setUploadedFileIds] = useRecoilState(fileIdsState);
  const [shareStateData, setShareStateData] = useRecoilState(shareState);
  const { token } = useAuth();
  const limits = useRecoilValue(shareLimits);
  const user = useUser();

  const createShare = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/share/start`,
        {
          fileIds: uploadedFileIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Share created:', response.data);
      setShareStateData(response.data);
      setUploadedFileIds([]);
    } catch (error) {
      console.error('Error creating share:', error);
    }
  };

  function stopShare(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Tabs defaultValue="send" className="w-[400px] flex flex-col gap-[1em] items-center">
      <TabsList>
        <TabsTrigger value="send">Send</TabsTrigger>
        <TabsTrigger value="recieve">Receive</TabsTrigger>
      </TabsList>
      <TabsContent value="send" className="flex flex-col gap-[2em] items-center">
        <div className="flex flex-col gap-2 items-center">
          {!shareStateData ? (
            <>
              <h4 className="text-[1.4rem] font-[700] font-secondary">Choose files to upload</h4>
              <p className="text-center font-[500] font-secondary">
                Send up to {limits?.uploadLimit} files at once with each file limited to a size of {limits?.maxUploadSize}MB since you are on a{' '}
                <span className="text-[#FF0000]">{user?.subscriptionLevel === 0 ? 'free' : 'pro'} plan</span>
              </p>
              <FileUpload />
              {/* <UploadButton /> */}
              {/* <img src='no-file.svg' alt='no-file-icon' />
              <span className='font-[600]'>No files added yet</span> */}
              <Dialogue
                title="Start sharing?"
                desc="You will start sharing immediately and will receive a link through which you can share the uploaded files."
                handleContinue={createShare}
              >
                Start Sharing
              </Dialogue>
            </>
          ) : (
            <>
              <h4 className="text-[1.4rem] font-[700] font-secondary">You have started sharing</h4>
              <IconSharingFile />
              <p className="text-center font-[700] font-secondary">Copy the link below and share it to the recipient</p>
              <CopyLinkField url={`${import.meta.env.VITE_CLIENT_URL}/share/${shareStateData.sharableCode}`} />
              <Dialogue
                title="Stop sharing?"
                desc="This will stop the sharing action immediately and any uploaded files will be removed from our servers."
                handleContinue={stopShare}
              >
                Stop Sharing
              </Dialogue>
            </>
          )}
        </div>
        {/* <Dialogue
          title="Start sharing?"
          desc="You will start sharing immediately and will receive a link through which you can share the uploaded files."
          handleContinue={createShare}
        >
          Start Sharing
        </Dialogue> */}
      </TabsContent>
      <TabsContent value="recieve" className="flex flex-col gap-[2em] items-center mt-[-1em]">
        <div className="flex flex-col gap-2 items-center">
          <h4 className="text-[1.4rem] font-[700] font-secondary">username wants to share</h4>
          <IconSharingFile />
          <p className="text-center font-[700] font-secondary">Copy the link below and share it to the recipient</p>
          <CopyLinkField url="https://filesocial.vercel.app/share/Yd93mfZ093d" />
        </div>
        <Dialogue
          title="Stop sharing?"
          desc="This will stop the sharing action immediately and any uploaded files will be removed from our servers."
          handleContinue={stopShare}
        >
          Stop Sharing
        </Dialogue>
      </TabsContent>
    </Tabs>
  );
};

export default ShareTabs;
