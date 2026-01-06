/**
 * @file Footer.tsx
 * @description Application footer component.
 *
 * Provides quick access to accessibility settings, legal information,
 * user account actions, and general site links.
 * Designed to be simple, clear, and responsive across web.
 */

import React, { useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles/components/FooterStyle';

interface FooterProps {
  isAuthenticated?: boolean; //Indicates if the user is currently authenticated.
}

type HoverLinkProps = {
  children: React.ReactNode;
  onPress: () => void;
};

/**
 * Hoverable text link component.
 *
 * Adds an underline on hover (web) and behaves like a standard
 * pressable text link on all platforms.
 */
const HoverLink = ({ children, onPress }: HoverLinkProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Text
      style={[styles.link, { textDecorationLine: hovered ? 'underline' : 'none' }]}
      {...({
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
      } as any)}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};


/**
 * Main footer component of the application.
 *
 * Displays different sections such as accessibility options,
 * general information pages, and account-related actions depending
 * on the authentication state of the user.
 */
export default function Footer({
  isAuthenticated = false,
}: FooterProps) {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  
  const [hovered, setHovered] = useState(false);

  return (
    <View style={styles.footer}>
      
      {/* Sections */}
      <View
        style={[
          styles.sectionsContainer,
          isWeb && styles.sectionsContainerWeb,
        ]}
      >
        {/* Accessibilité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibilité</Text>
          <HoverLink 
                onPress={() => router.push('/settings')} > 
                Changer la langue
          </HoverLink>
          
          <HoverLink 
                onPress={() => router.push('/settings')} > 
                Taille du texte
          </HoverLink>
            
          <HoverLink 
                onPress={() => router.push('/settings')} > 
                Contraste
          </HoverLink>

          <HoverLink 
                onPress={() => router.push('/settings')} > 
                Ploice d'écriture
          </HoverLink>

          <HoverLink 
                onPress={() => router.push('/settings')} > 
                Thème du site
          </HoverLink>
        </View>

        {/* Informations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations</Text>

          <HoverLink 
                onPress={() => router.push('/privacy')} > 
                Politique de confidentialité
          </HoverLink>
          <HoverLink 
                onPress={() => router.push('/about_us')} > 
                À propos
          </HoverLink>
          <HoverLink 
                onPress={() => router.push('/contact')} > 
                Contact
          </HoverLink>

        </View>

        {/* Compte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>

          {!isAuthenticated ? (
            <>
              <HoverLink 
                onPress={() => router.push('/login')} > 
                Se connecter
              </HoverLink>
              <HoverLink 
                onPress={() => router.push('/register')} > 
                S'inscrire
              </HoverLink>
            </>
          ) : (

            <HoverLink 
                onPress={() => console.log("deconnexion")} > 
                Se déconnecter
            </HoverLink>
          )}
        </View>
      </View>

      {/* Footer bottom */}
      <View style={styles.bottom}>
        <Text style={styles.copyright}>
          © {new Date().getFullYear()} Together
        </Text>
      </View>
    </View>
  );
}
