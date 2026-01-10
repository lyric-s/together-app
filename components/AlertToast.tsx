import React, {useEffect, useState} from 'react'
import { styles } from '@/styles/components/AlertToastStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, Animated, StyleSheet, Platform, useWindowDimensions } from 'react-native';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDelay?: number; // delay in ms
};

export default function AlertToast({ 
  visible, 
  title, 
  message, 
  onClose,
  autoCloseDelay = 4000 
}: Props) {

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  const [showComponent, setShowComponent] = useState(visible);
    useEffect(() => {
    if (visible) {
      setShowComponent(true);
      // Montre le toast
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();

      // Auto-close
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    } else {
      // Cache le toast
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -100, duration: 300, useNativeDriver: true }),
      ]).start();
      setShowComponent(false);
    }
  }, [visible, autoCloseDelay, onClose]);

  if (!showComponent) return null;

  const isWeb = Platform.OS === 'web';

  return (
    <Animated.View 
      style={[
        styles.toastContainer,
        { top: insets.top + 10, marginRight: 5, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}
    >
      <TouchableOpacity style={styles.toastContent} onPress={onClose} activeOpacity={0.9}>
        <Text style={styles.toastTitle}>{title}</Text>
        <Text style={styles.toastMessage}>{message}</Text>
        <Text style={styles.toastClose}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};