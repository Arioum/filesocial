import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface User {
  id: string;
  userName: string;
  email: string;
  subscriptionLevel: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
}

export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    isLoading: true,
    user: null as User | null,
    token: null as string | null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticated',
  get: ({ get }) => get(authState).isAuthenticated,
});

export const userSelector = selector({
  key: 'user',
  get: ({ get }) => get(authState).user,
});
