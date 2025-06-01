import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function ProfileSetupScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    try {
      console.log('Requesting image picker permissions');
      
      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your photo library to upload a profile picture.',
          [{ text: 'OK' }]
        );
        return;
      }

      console.log('Opening image picker');
      setIsUploading(true);
      
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
        console.log('Profile image set:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const takePhoto = async () => {
    try {
      console.log('Requesting camera permissions');
      
      // Request permission to access camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Please allow access to your camera to take a profile picture.',
          [{ text: 'OK' }]
        );
        return;
      }

      console.log('Opening camera');
      setIsUploading(true);
      
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      console.log('Camera result:', result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
        console.log('Profile image set from camera:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Add Profile Photo',
      'Choose how you would like to add your profile photo',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleContinue = () => {
    console.log('Profile setup complete, navigating to swipe screen');
    router.push('/swipe');
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={[commonStyles.title, { color: colors.primary }]}>
          Set Up Your Profile
        </Text>
        
        <Text style={[commonStyles.subtitle, { marginBottom: 40 }]}>
          Upload a photo so restaurants can see who they&apos;re matching with
        </Text>

        {/* Profile Image Section */}
        <TouchableOpacity 
          onPress={showImageOptions}
          style={[
            commonStyles.profileImage,
            {
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
              backgroundColor: profileImage ? 'transparent' : colors.card,
            }
          ]}
          disabled={isUploading}
        >
          {profileImage ? (
            <Image 
              source={{ uri: profileImage }} 
              style={commonStyles.profileImage}
            />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Icon name="camera" size={40} style={{ marginBottom: 10 }} />
              <Text style={[commonStyles.text, { fontSize: 12, color: colors.textSecondary }]}>
                {isUploading ? 'Uploading...' : 'Add Photo'}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {profileImage && (
          <TouchableOpacity 
            onPress={showImageOptions}
            style={{ marginBottom: 30 }}
          >
            <Text style={[commonStyles.text, { color: colors.secondary, textDecorationLine: 'underline' }]}>
              Change Photo
            </Text>
          </TouchableOpacity>
        )}

        <View style={commonStyles.buttonContainer}>
          <Button
            text={profileImage ? "Start Swiping!" : "Skip for Now"}
            onPress={handleContinue}
            style={[
              buttonStyles.primaryButton,
              { backgroundColor: profileImage ? colors.primary : colors.textSecondary }
            ]}
          />
          
          <Button
            text="Back to Welcome"
            onPress={() => {
              console.log('Going back to welcome screen');
              router.back();
            }}
            style={buttonStyles.backButton}
          />
        </View>
      </View>
    </View>
  );
}