import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface User {
  userId: string;
  userName: string;
  email: string;
  subscriptionLevel: number;
  shareLimits: {
    uploadLimit: number;
    maxUploadSize: number;
    fileRetentionTime: number;
    shareTime: number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  },
});

export const userSelector = selector<User | null>({
  key: 'userSelector',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.user;
  },
});

export const shareLimits = selector({
  key: 'shareLimits',
  get: ({ get }) => {
    const limits = get(authState).user?.shareLimits;
    return limits;
  },
});
