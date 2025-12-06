/**
 * Copyright 2025 Sven Victor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { message } from 'antd';
import api from '@/service/api';
import client from '@/service/client';
import { useRequest } from 'ahooks';

// Auth context type
export interface AuthContextType {
  user: API.User | null | undefined;
  token: string | null;
  loading: boolean;
  login: (data: Partial<API.LoginRequest>) => Promise<API.User | void>;
  oauthLogin: (data: API.handleCallbackParams) => Promise<API.User | void>;
  logout: () => void;
  updateUser: (user: API.User) => void;
}

// Create auth context
export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  token: null,
  loading: false,
  login: async () => { },
  oauthLogin: async () => { },
  logout: () => { },
  updateUser: () => { },
});

export const useAuth = () => useContext(AuthContext);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Set token to axios and localStorage
const setAuthToken = (token: string | null, writeToLocalStorage: boolean = true) => {
  if (token) {
    if (writeToLocalStorage) {
      localStorage.setItem('token', token);
    }
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    if (writeToLocalStorage) {
      localStorage.removeItem('token');
    }
    delete client.defaults.headers.common['Authorization'];
  }
};

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<API.User | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  const { run: fetchCurrentUser } = useRequest(async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthToken(storedToken, false);
      return api.authorization.getCurrentUser()
    }
    return null;
  }, {
    manual: true,
    onBefore: () => {
    },
    onSuccess: (data) => { setUser(data) },
    onError: (error) => {
      console.error('Failed to get current user:', error);
      logout();
    },
    onFinally: () => { setIsLoading(false); }
  });

  // Check if user is logged in on initialization
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (data: Partial<API.LoginRequest>) => {
    try {
      const response = await api.authorization.login(data as API.LoginRequest);

      const { token, user: userData, needs_mfa, password_expired, mfa_token, mfa_type } = response;

      // If MFA verification is needed
      if (needs_mfa) {
        throw { needsMFA: true, mfaToken: mfa_token, mfaType: mfa_type, user: userData };
      }
      if (password_expired) {
        throw { password_expired: true, user: userData, token: token };
      }
      setAuthToken(token);
      setToken(token);
      setUser(userData);
      return userData;
    } catch (error) {
      // If it's an MFA required error, rethrow
      if (error && (error as any).needsMFA) {
        throw error;
      }
      if (error && (error as any).password_expired) {
        throw error;
      }
      message.error('Login failed, please check your username and password');
      throw error;
    }
  };

  const oauthLogin = useCallback(async (data: API.handleCallbackParams) => {
    try {
      const response = await api.oauth.handleCallback(data);
      // Handle new API response format
      let token = '';
      let userData = null;

      if (response && typeof response === 'object') {
        if ('code' in response && response.code === "0" && 'data' in response) {
          const { token: respToken, user: respUser, needs_mfa, mfa_token, mfa_type } = response.data as any;

          // If MFA verification is needed
          if (needs_mfa) {
            throw { needsMFA: true, mfaToken: mfa_token, mfaType: mfa_type, user: respUser };
          }

          token = respToken;
          userData = respUser;
        } else {
          const { token: respToken, user: respUser, needs_mfa, mfa_token, mfa_type } = response as any;

          // If MFA verification is needed
          if (needs_mfa) {
            throw { needsMFA: true, mfaToken: mfa_token, mfaType: mfa_type, user: respUser };
          }

          token = respToken;
          userData = respUser;
        }
      }
      setAuthToken(token);
      setToken(token);
      setUser(userData);

      return userData;
    } catch (error) {
      // If it's an MFA required error, rethrow
      if (error && (error as any).needsMFA) {
        throw error;
      }
      if (error && (error as any).passwordExpired) {
        throw error;
      }
      throw error;
    }
  }, []);

  const logout = () => {
    api.authorization.logout();
    setAuthToken(null); // Use unified token setting function
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser: API.User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading: isLoading,
        login,
        oauthLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 