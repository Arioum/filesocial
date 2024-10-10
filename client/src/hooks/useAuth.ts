import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { authState, isAuthenticatedSelector, userSelector, User, AuthState } from '@/recoil/auth';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [isInitialized, setIsInitialized] = useState(false);

  const login = (token: string, user: User) => {
    console.log('Login called with token:', token);
    localStorage.setItem('jwtToken-fileSocial', token);
    localStorage.setItem('user-fileSocial', JSON.stringify(user));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuth({ isAuthenticated: true, isLoading: false, user, token });
    console.log('Auth state after login:', { isAuthenticated: true, isLoading: false, user, token });
  };

  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem('jwtToken-fileSocial');
    localStorage.removeItem('user-fileSocial');
    delete axios.defaults.headers.common['Authorization'];
    setAuth({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });
    console.log('Auth state after logout:', { isAuthenticated: false, isLoading: false, user: null, token: null });
  };

  const checkAuth = async () => {
    console.log('checkAuth called');
    const token = localStorage.getItem('jwtToken-fileSocial');
    console.log('Token from localStorage:', token);

    if (token) {
      try {
        setAuth((prev) => ({ ...prev, isLoading: true }));
        console.log('Auth state set to loading');
        const storedUser = localStorage.getItem('user-fileSocial');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setAuth({ isAuthenticated: true, isLoading: false, user, token });
          console.log('Auth state set from localStorage:', { isAuthenticated: true, isLoading: false, user, token });
        } else {
          console.log('User data not found in localStorage');
          logout();
        }
      } catch (error) {
        console.error('Error during auth check:', error);
        logout();
      }
    } else {
      console.log('No token found in localStorage');
      setAuth({ isAuthenticated: false, isLoading: false, user: null, token: null });
      console.log('Auth state reset due to no token');
    }
    setIsInitialized(true);
    console.log('Auth check initialized');
  };

  useEffect(() => {
    console.log('useAuth effect triggered');
    if (!isInitialized) {
      checkAuth();
    }
  }, [isInitialized]);

  return { ...auth, login, logout, checkAuth, isInitialized };
};

export const userIsAuthenticated = () => useRecoilValue(isAuthenticatedSelector);
export const useUser = () => useRecoilValue(userSelector);
