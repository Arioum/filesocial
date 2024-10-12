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
  createdAt: string;
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

export const formattedUserCreatedAt = selector({
  key: 'formattedUserCreatedAt',
  get: ({ get }) => {
    const user = get(userSelector);

    if (!user || !user.createdAt) return null;

    const createdAtDate = new Date(user.createdAt);

    const day = String(createdAtDate.getDate()).padStart(2, '0'); // Format day with leading zero
    const month = String(createdAtDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so +1
    const year = createdAtDate.getFullYear();

    return `${day}/${month}/${year}`;
  },
});

export const shareLimits = selector({
  key: 'shareLimits',
  get: ({ get }) => {
    const limits = get(authState).user?.shareLimits;
    return limits;
  },
});

export const userSubscriptionLevel = selector({
  key: 'userSubscriptionLevel',
  get: ({ get }) => {
    const subscriptionLevel = get(userSelector)?.subscriptionLevel;
    return subscriptionLevel;
  },
});

export interface SubscriptionState {
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  isExpired: boolean;
}

export const subscriptionDetails = atom<SubscriptionState | null>({
  key: 'subscriptionDetails',
  default: null,
});

export const formattedSubscriptionDetails = selector({
  key: 'formattedSubscriptionDetails',
  get: ({ get }) => {
    const details = get(subscriptionDetails);

    if (!details || !details.expiresAt) return null;

    const expiresAtDate = new Date(details.expiresAt);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return expiresAtDate.toLocaleDateString('en-US', options);
  },
});
