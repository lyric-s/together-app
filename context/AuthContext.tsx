import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '@/services/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  adress?: string;
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
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userType, setUserType] = useState<UserType>('volunteer_guest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

  // Logout
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await storageService.clear();
      await AsyncStorage.removeItem('cached_user');
      setUser(null);
      setUserType('volunteer_guest');
      setError(null);
      console.log("✅ Déconnexion réussie - Redirection via l'aiguilleur");
    } catch (e) {
      console.error('Logout error:', e);
      setUser(null);
      setUserType('volunteer_guest');
    } finally {
        setIsLoading(false);
    }
  }, []);
  
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
        { type: 'association', path: '/associations/me' },
        { type: 'admin', path: '/admins/me' }
      ];

      let hasNetworkOrServerError = false;
      let success = false;

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
            const rawData = await response.json();
            
            let standardUser: AuthUser;
            if (type === 'volunteer' || type === 'association') {
              const { user, ...restOfData } = rawData;
              standardUser = {
                id_user: user.id_user,
                email: user.email,
                username: user.username,
                user_type: type,
                ...restOfData 
              };
            } else {
              standardUser = {
                  id_user: rawData.id_admin,
                  email: rawData.email,
                  username: rawData.username,
                  user_type: type,
                  ...rawData
              };
            }
            setUser(standardUser);
            setUserType(type);
            await AsyncStorage.setItem('cached_user', JSON.stringify(standardUser));
            console.log(`✅ ${type} profile loaded:`, standardUser);
            success = true;
            break;
          }
          if (response.status === 401 || response.status === 403) {
            continue; 
          } else {
            // Error Server (500, 503, etc.)
            console.warn(`⚠️ Server error ${response.status} on ${path}`);
            hasNetworkOrServerError = true;
          }
        } catch (endpointError) {
          console.log(`❌ ${path} failed, trying next...`);
          hasNetworkOrServerError = true;
        }
      }

      if (success) {
        return; 
      }

      // --- If you've reached this point, it means that none of the endpoints worked ---
      if (hasNetworkOrServerError) {
        console.log('⚠️ Problème réseau. Tentative de chargement du profil en cache...');
        try {
          const cachedUserJson = await AsyncStorage.getItem('cached_user');
          
          if (cachedUserJson) {
            const cachedUser = JSON.parse(cachedUserJson) as AuthUser;
            setUser(cachedUser);
            setUserType(cachedUser.user_type);
            console.log('✅ Profil chargé depuis le cache (Mode Hors-ligne)');
          } else {
            setError('Pas de connexion internet et aucune donnée locale.');
          }
        } catch (cacheError) {
          console.error("Erreur lecture cache:", cacheError);
        }
      } else {
        // Case B: All endpoints returned 401/403
        // The token is truly invalid everywhere.
        console.log('⛔ Token invalid for all roles -> Logging out.');
        await logout();
        setError('Session expired');
      }
    } catch (e) {
      console.error('Auth error:', e);
      setError('Failed to load user');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, logout]);

  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    try {
      await storageService.saveTokens(accessToken, refreshToken);
      await refetchUser();
    } catch (e) {
      console.error('Login error:', e);
      throw e;
    }
  }, [refetchUser]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

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
