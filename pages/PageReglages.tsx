import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/pages/PageReglages.styles';
import BottomNavBar from '../components/MobileNavigationBar'; 
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const PageReglages = () => { 
  const navigation = useNavigation();
  const { t, getFontSize, fontFamily } = useLanguage();
  const { colors } = useTheme();

  const menuItems = [
    { title: t('notifications'), icon: 'notifications-outline', route: 'Notifications' },
    { title: t('languageAccessibility'), icon: 'language-outline', route: 'LanguageAccessibility' },
    { title: t('contacts'), icon: 'call-outline', route: 'Contact' },
    { title: t('termsConditions'), icon: 'document-text-outline', route: 'TermsConditions' },
    { title: t('privacyPolicy'), icon: 'shield-checkmark-outline', route: 'PrivacyPolicy' },
    { title: t('privacySecurity'), icon: 'key-outline', route: 'PrivacySecurity' },
    { title: t('about'), icon: 'information-circle-outline', route: 'About' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {navigation.canGoBack() && (
              <TouchableOpacity onPress={() => navigation.goBack()}> 
                <Ionicons name="chevron-back" size={32} color="#FF6B35" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.gearIcon}>
              <Ionicons name="settings-outline" size={32} color="#FF6B35" />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.headerTitleContainer, { backgroundColor: colors.headerBackground }]}>
            <Text style={[styles.headerTitle, { fontSize: getFontSize(18), color: colors.text }]}>
              {t('settings')}
            </Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuButton} onPress={() => { if (item.route) navigation.navigate(item.route as any); }}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={22} color="#FFF" />
              </View>
              <Text style={[styles.menuText, { fontSize: getFontSize(16), fontFamily: fontFamily }]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#FFF" style={{marginRight: 10}} />
          <Text style={[styles.logoutText, { fontSize: getFontSize(16), fontFamily: fontFamily }]}>
            {t('logout')}
          </Text>
        </TouchableOpacity>

      </ScrollView>
      <View style={styles.bottomNavContainer}><BottomNavBar /></View>
    </SafeAreaView>
  );
};

export default PageReglages;