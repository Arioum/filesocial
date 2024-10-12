import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fileIdsState, progressState, uploadCountState } from '@/recoil/file';
import { shareState } from '@/recoil/share';
import { shareLimits } from '@/recoil/auth';
import { useAuth, useUser } from '@/hooks/useAuth';
import IconSharingFile from '@/assets/sharing-file';
import { FileUploader } from './ui/file-uploader';
import CopyLinkField from './CopyLinkField';
import Dialogue from './Dialogue';
import SharableCodeInput from './SharableCodeInput';

const ShareTabs = () => {
  const [uploadedFileIds, setUploadedFileIds] = useRecoilState(fileIdsState);
  const [shareStateData, setShareStateData] = useRecoilState(shareState);
  const setProgress = useSetRecoilState(progressState);
  const setUploadCount = useSetRecoilState(uploadCountState);
  const limits = useRecoilValue(shareLimits);
  const { token } = useAuth();
  const user = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine default tab based on the query param
  const defaultTab = searchParams.get('action') === 'receive' ? 'receive' : 'send';
  console.log(searchParams);

  console.log(defaultTab);

  const createShare = async () => {
    try {
      if (uploadedFileIds.length < 1) {
        throw Error('No fileIds present');
      }
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
      setProgress({});
      setUploadCount(0);
      setUploadedFileIds([]);
    } catch (error) {
      console.error('Error creating share:', error);
    }
  };

  const stopShare = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/share/stop`,
        {
          shareId: shareStateData?.shareId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Share created:', response.data);
      if (response.status === 200) {
        setShareStateData(null);
        navigate(0);
      }
    } catch (error) {
      console.error('Error creating share:', error);
    }
  };

  useEffect(() => {
    const getActiveShares = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/get-active-share`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);

        if (res.status === 400) {
          setShareStateData(null);
        }
        setShareStateData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getActiveShares();
  }, []);

  return (
    <Tabs defaultValue={defaultTab} className="w-[400px] flex flex-col gap-[1em] items-center">
      <TabsList>
        <TabsTrigger value="send">Send</TabsTrigger>
        <TabsTrigger value="receive">Receive</TabsTrigger>
      </TabsList>
      <TabsContent value="send" className="flex flex-col gap-[2em] items-center">
        <div className="flex flex-col gap-4 items-center">
          {!shareStateData ? (
            <>
              <h4 className="text-[1.4rem] font-[700] font-secondary">Choose files to upload</h4>
              <p className="text-center font-[500] font-secondary">
                Send up to {limits?.uploadLimit} files at once with each file limited to a size of {limits?.maxUploadSize}MB since you are on a{' '}
                <span className="text-[#FF0000]">{user?.subscriptionLevel === 0 ? 'free' : 'pro'} plan</span>
              </p>
              <FileUploader />
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
              <div className="flex gap-3 mt-4">
                <Dialogue
                  title="Important!"
                  desc="Creating a new share will stop the active share immediately, the sharable code will expire no longer work."
                  handleContinue={stopShare}
                >
                  Start New Share
                </Dialogue>
                <Dialogue
                  title="Stop sharing?"
                  desc="This will stop the sharing action immediately and any uploaded files will be removed from our servers."
                  handleContinue={stopShare}
                >
                  Stop Sharing
                </Dialogue>
              </div>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="receive" className="flex flex-col gap-[2em] items-center mt-[-1em]">
        <div className="flex flex-col gap-2 items-center min-h-[500px]">
          <SharableCodeInput />
        </div>
        {/* <Receive /> */}
      </TabsContent>
    </Tabs>
  );
};

export default ShareTabs;
