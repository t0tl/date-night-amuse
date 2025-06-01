import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function ProfileScreen() {
  const userProfile = {
    name: "Alex",
    age: 28,
    bio: "Love trying new restaurants and exploring different cuisines. Looking for someone to share amazing food experiences with!",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    ],
    preferences: {
      cuisines: ["Italian", "Japanese", "Mediterranean"],
      priceRange: "$$-$$$",
      distance: "10 miles"
    }
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 10,
        }}>
          <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
            Profile
          </Text>
          
          <TouchableOpacity onPress={() => router.push('/profile/settings')}>
            <Icon name="settings" size={24} />
          </TouchableOpacity>
        </View>

        {/* Profile Photos */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {userProfile.photos.map((photo, index) => (
              <View key={index} style={{
                marginRight: 15,
                borderRadius: 15,
                overflow: 'hidden',
                width: 120,
                height: 160,
              }}>
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                />
                {index === 0 && (
                  <View style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                      Main
                    </Text>
                  </View>
                )}
              </View>
            ))}
            <TouchableOpacity style={{
              width: 120,
              height: 160,
              borderRadius: 15,
              borderWidth: 2,
              borderColor: colors.primary,
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Icon name="add" size={30} />
              <Text style={[commonStyles.text, { marginTop: 5, color: colors.primary }]}>
                Add Photo
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Profile Info */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text style={[commonStyles.title, { fontSize: 24, marginBottom: 5 }]}>
              {userProfile.name}, {userProfile.age}
            </Text>
            <Text style={[commonStyles.text, { color: colors.textSecondary, lineHeight: 22 }]}>
              {userProfile.bio}
            </Text>
          </View>
        </View>

        {/* Preferences */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>
            Dining Preferences
          </Text>
          
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={[commonStyles.text, { fontWeight: 'bold', marginBottom: 5 }]}>
                Favorite Cuisines
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {userProfile.preferences.cuisines.map((cuisine, index) => (
                  <View key={index} style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginRight: 8,
                    marginBottom: 8,
                  }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>{cuisine}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={{ marginBottom: 15 }}>
              <Text style={[commonStyles.text, { fontWeight: 'bold', marginBottom: 5 }]}>
                Price Range
              </Text>
              <Text style={[commonStyles.text, { color: colors.textSecondary }]}>
                {userProfile.preferences.priceRange}
              </Text>
            </View>
            
            <View>
              <Text style={[commonStyles.text, { fontWeight: 'bold', marginBottom: 5 }]}>
                Distance
              </Text>
              <Text style={[commonStyles.text, { color: colors.textSecondary }]}>
                Within {userProfile.preferences.distance}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              borderRadius: 25,
              alignItems: 'center',
              marginBottom: 15,
            }}
            onPress={() => router.push('/profile/edit')}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 15,
              borderRadius: 25,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.primary,
            }}
            onPress={() => router.push('/profile/settings')}
          >
            <Text style={{ color: colors.primary, fontSize: 16, fontWeight: 'bold' }}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
} 