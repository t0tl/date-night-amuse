import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useFonts, OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
import { commonStyles, colors } from '../styles/commonStyles';
import Button from '../components/Button';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* App Logo/Icon */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
        }}>
          <Text style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#FFFFFF',
            textAlign: 'center',
            fontFamily: 'OpenSans_700Bold',
          }}>
            🍽️
          </Text>
        </View>

        <Text style={[commonStyles.title, { color: colors.primary, fontSize: 36, marginBottom: 10 }]}>
          amuse
        </Text>
        
        <Text style={[commonStyles.subtitle, { marginBottom: 30 }]}>
          Swipe on restaurants, not people
        </Text>
        
        <Text style={[commonStyles.text, { marginBottom: 40, textAlign: 'center', paddingHorizontal: 20 }]}>
          Upload your photo and discover amazing restaurants for your perfect date night
        </Text>
        
        <View style={commonStyles.buttonContainer}>
          <Button
            text="Get Started"
            onPress={() => {
              console.log('Navigating to profile setup');
              router.push('/profile-setup');
            }}
            style={[commonStyles.card, { backgroundColor: colors.primary, paddingVertical: 18 }]}
            textStyle={{ fontSize: 18, fontWeight: 'bold' }}
          />
          
          <TouchableOpacity 
            onPress={() => {
              console.log('Navigating to restaurant swipe');
              router.push('/swipe');
            }}
            style={{ marginTop: 15 }}
          >
            <Text style={[commonStyles.text, { color: colors.secondary, textDecorationLine: 'underline' }]}>
              Skip to swiping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}