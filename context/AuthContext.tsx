import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '@/services/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/authService';


const MOCK_ASSOCIATION_USER: AuthUser = {
  id_user: 1000,
  email: 'contact@assoexample.com',
  username: 'AssoExample',
  user_type: 'association', // type utilisateur
  name: 'Association Exemple',
  address: '10 avenue des Tests',
  zip_code: '75001',
  country: 'France',
  phone_number: '0123456789',
  rna_code: 'W751234567',
  company_name: 'Association Exemple SARL',
  bio: 'Association dédiée à l’aide aux animaux et à la protection de l’environnement.',
};

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
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);


const IS_DEBUG_MODE = true;
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //const [user, setUser] = useState<AuthUser | null>(null);
  //const [userType, setUserType] = useState<UserType>('volunteer_guest');
  //const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<AuthUser | null>(
    IS_DEBUG_MODE ? MOCK_ASSOCIATION_USER : null
  );
  
  const [userType, setUserType] = useState<UserType>(
    IS_DEBUG_MODE ? 'volunteer' : 'volunteer_guest'
  );

  const [isLoading, setIsLoading] = useState(!IS_DEBUG_MODE);
  
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

    if (data.id_admin) {
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
    if (IS_DEBUG_MODE) {
        console.log("⚠️ MODE DEBUG : Connexion forcée en tant que bénévole");
        // On simule un délai réseau pour le réalisme
        return; // On arrête la fonction ici, on ne cherche pas de vrai token
      }
      
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
      if (!IS_DEBUG_MODE) {
        setIsLoading(false);
      }
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