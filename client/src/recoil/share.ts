import { formatDate } from '@/lib/utils';
import { atom, selector } from 'recoil';
// import { recoilPersist } from 'recoil-persist';

// const { persistAtom } = recoilPersist();

export interface ShareData {
  message: string;
  shareId: string;
  sharableCode: string;
  expiresAt: string;
}

export const shareState = atom<ShareData | null>({
  key: 'shareState',
  default: null,
});

export interface FileData {
  userId: string;
  _id: string;
  createdAt: Date;
  expiresAt: Date;
  isExpired: boolean;
  fileName?: string | null | undefined;
  fileUrl?: string | null | undefined;
  fileType?: string | null | undefined;
  fileSize?: string;
}

export interface ReceiveData {
  message: string;
  files: FileData[];
  expiresAt: string;
  user: { userId: string; userName: string };
}

export const receiveState = atom<ReceiveData | null>({
  key: 'receiveState',
  default: null,
});

export const receiveFilesList = selector({
  key: 'receiveFilesList',
  get: ({ get }) => {
    const files = get(receiveState)?.files;
    return files;
  },
});

export const shareHistoryState = atom<any[]>({
  key: 'shareHistoryState',
  default: [],
});

export const getFormattedShareHistory = selector({
  key: 'getFormattedShareHistory',
  get: ({ get }) => {
    const shareHistory = get(shareHistoryState);
    return shareHistory.map((share: { _id: string; sharableCode: string; files: any[]; status: string; createdAt: string }) => ({
      id: share._id.split('-')[0],
      sharableCode: share.sharableCode,
      fileCount: share.files.length,
      status: share.status,
      createdAt: formatDate(share.createdAt),
    }));
  },
});
