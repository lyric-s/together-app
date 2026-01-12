import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '@/services/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/authService';

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
  userType: UserType;
  isLoading: boolean;
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

  // Logout
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await storageService.clear();
      setUser(null);
      setUserType('volunteer_guest');
      console.log("✅ Déconnexion réussie - Redirection via l'aiguilleur");
    } catch (e) {
      console.error('Logout error:', e);
      setUser(null);
      setUserType('volunteer_guest');
    } finally {
        setIsLoading(false);
    }
  }, []);

  const mapApiDataToUser = (data: any): AuthUser | null => {
    if (!data) return null;

    if (data.user) {
      return {
        // Infos du compte (dans l'objet user)
        id_user: data.user.id_user,
        email: data.user.email,
        username: data.user.username,
        user_type: data.user.user_type,

        // Infos du profil (à la racine de l'objet data)
        id_volunteer: data.id_volunteer, // undefined if Asso
        id_asso: data.id_asso,           // undefined if Volunteer
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        birthdate: data.birthdate,
        address: data.address,
        zip_code: data.zip_code,
        bio: data.bio,
        skills: data.skills,
        name: data.name,             // Asso
        company_name: data.company_name, // Asso
        rna_code: data.rna_code,     // Asso
        };
    }

    if (data.id_admin || data.email) {
         return {
            id_user: data.id_admin || 0,
            id_admin: data.id_admin,
            email: data.email,
            username: data.username,
            user_type: 'admin',
         };
    }

    return null;
  };
  
  const refetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const token = await storageService.getAccessToken();
      if (!token) {
        setUser(null);
        setUserType('volunteer_guest');
        setIsLoading(false);
        return;
      }

      const rawData = await authService.getMe();
      const mappedUser = mapApiDataToUser(rawData);

      if (mappedUser) {
        setUser(mappedUser);
        setUserType(mappedUser.user_type);
        await storageService.setItem('cached_user', JSON.stringify(mappedUser));
        console.log(`✅ Profil chargé: ${mappedUser.username} (${mappedUser.user_type})`);
      } else {
        throw new Error("Format de profil inconnu");
      }    
    } catch (error: any) {
      console.error("Refetch Error:", error);

      if (error.response?.status === 401) {
         await logout();
      } else {
        // Fallback Cache
        const cached = await AsyncStorage.getItem('cached_user');
        if (cached) {
          const u = JSON.parse(cached);
          setUser(u);
          setUserType(u.user_type);
          console.log("⚠️ Chargé depuis le cache");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.login(username, password);
      await refetchUser();
    } catch (e) {
      console.error('Login failed', e);
      setIsLoading(false);
      throw e;
    }
  }, [refetchUser]);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      isLoading,
      login,
      logout,
      refetchUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
