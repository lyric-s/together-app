import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from "../constants/colors";

// ------------- Component C11
// how to use : <ProfilePicture uri={require('../assets/images/profil-picture.png')} size={120} />
export default function ProfilePicture({ uri, size = 100 }) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image
        source={ uri }
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden', 
    backgroundColor: Colors.grayPlaceholder, // fallback if the image doesnt load
  },
});
