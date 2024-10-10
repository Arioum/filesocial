import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const fileState = atom({
  key: 'fileState',
  default: [],
});

// Utility function to format the file size with appropriate unit
const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes >= 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (sizeInBytes >= 1024) {
    return (sizeInBytes / 1024).toFixed(2) + ' KB';
  } else {
    return sizeInBytes + ' B';
  }
};

// Utility function to format the date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return new Date(dateString).toLocaleString('en-US', options);
};

export interface FormattedFile {
  fileName: any;
  fileSize: string;
  createdAt: string;
}

export const getFormattedTableView = selector({
  key: 'getFormattedTableView',
  get: ({ get }) => {
    const fileData = get(fileState); // Assuming fileState is an array of file objects

    return fileData.map(
      (file: { fileName: any; fileSize: number; createdAt: string }) => ({
        fileName: file.fileName,
        fileSize: formatFileSize(file.fileSize), // Format file size
        createdAt: formatDate(file.createdAt), // Format created date
      })
    );
  },
});

export const fileIdsState = atom<string[]>({
  key: 'fileIdsState',
  default: [],
  // effects_UNSTABLE: [persistAtom],
});
