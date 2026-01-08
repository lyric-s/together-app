import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '@/services/storageService';

// Types (gardez votre AuthUser)
export type UserType = "volunteer" | "association" | "admin" | "volunteer_guest";
export type AuthUser = {
  id_user: number;
  email: string;
  user_type: UserType;
  username: string;
  bio?: string;
  skills?: string;
  id_volunteer?: number;
  id_admin?: number;
  id_asso?: number;
  picture?: any;
  last_name?: string;
  first_name?: string;
  phone_number?: string;
  birthdate?: string;
  address?: string;
  zip_code?: string;
  name?: string;
  country?: string;
  rna_code?: string;
  company_name?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  userType: UserType | null;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userType, setUserType] = useState<UserType>('volunteer_guest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

  const refetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = await storageService.getAccessToken();
      if (!token) {
        setUser({
          id_user: -1,
          email: 'invité@together-app.com',
          user_type: 'volunteer_guest',
          username: 'Invité'
        });
        setUserType('volunteer_guest');
        setIsLoading(false);
        return;
      }

      const endpoints: Array<{ type: UserType; path: string }> = [
        { type: 'volunteer', path: '/volunteers/me' },
        { type: 'association', path: '/assos/me' },
        { type: 'admin', path: '/admins/me' }
      ];

      let hasNetworkOrServerError = false;

      for (const { type, path } of endpoints) {
        try {
            console.log(`🔍 Testing ${path}...`);
            const response = await fetch(`${API_URL}${path}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            const authUser: AuthUser = {
              id_user: userData.id_user,
              email: userData.email,
              user_type: type,
              username: userData.username,
              ...userData
            };
            setUser(authUser);
            setUserType(type);
            console.log(`✅ ${type} profile loaded:`, authUser);
            return;
          }
          if (response.status === 401 || response.status === 403) {
            // This is a ‘normal’ authentication error (incorrect role), continue the loop
            continue; 
          } else {
            // Error 500, 502, 503, 404... The server has a problem
            console.warn(`⚠️ Serveur error ${response.status} on ${path}`);
            hasNetworkOrServerError = true;
          }
        } catch (endpointError) {
          console.log(`❌ Network failed on ${path}`, endpointError);
          hasNetworkOrServerError = true;
        }
      }

      // --- If you've reached this point, it means that none of the endpoints worked ---
      if (hasNetworkOrServerError) {
        // Case A: Network or server failure
        // DO NOT DELETE THE TOKEN!
        console.log('⚠️ Network/Server issues detected. Keeping token but setting error.');
        setError('Problème de connexion. Veuillez réessayer.');
        // You can let it expire to null or keep the old state, but you cannot log out.
      } else {
        // Case B: All endpoints returned 401/403
        // The token is truly invalid everywhere.
        console.log('⛔ Token invalid for all roles -> Logging out.');
        setError('Session expired');
        await storageService.clear();
        setUser(null);
        setUserType('volunteer_guest');
      }
    } catch (e) {
      console.error('Auth error:', e);
      setError('Failed to load user');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  const login = useCallback(async (accessToken: string) => {
    try {
      await storageService.saveTokens(accessToken, '');
      await refetchUser();
    } catch (e) {
      console.error('Login error:', e);
      throw e;
    }
  }, [refetchUser]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await storageService.clear();
      setUser(null);
      setUserType('volunteer_guest');
      setError(null);
    } catch (e) {
      console.error('Logout error:', e);
    }
  }, []);

  useEffect(() => {
    refetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      userType,
      isLoading,
      error,
      login,
      logout,
      refetchUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
