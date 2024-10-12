import { formatDate, formatFileSize } from '@/lib/utils';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const fileState = atom({
  key: 'fileState',
  default: [],
});

export interface FormattedFile {
  fileName: any;
  fileSize: string;
  createdAt: string;
}

export const getFormattedTableView = selector({
  key: 'getFormattedTableView',
  get: ({ get }) => {
    const fileData = get(fileState); // Assuming fileState is an array of file objects

    return fileData.map((file: { fileName: any; fileSize: number; createdAt: string }) => ({
      fileName: file.fileName,
      fileSize: formatFileSize(file.fileSize), // Format file size
      createdAt: formatDate(file.createdAt), // Format created date
    }));
  },
});

export const fileIdsState = atom<string[]>({
  key: 'fileIdsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const uploadCountState = atom<number>({
  key: 'uploadCountState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const progressState = atom<{ [key: string]: number }>({
  key: 'progressState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
