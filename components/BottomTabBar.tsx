import { View, TouchableOpacity, Text } from 'react-native';
import { router, usePathname } from 'expo-router';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

export default function BottomTabBar() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Swipe',
      icon: 'restaurant' as const,
      route: '/swipe',
      isActive: pathname.startsWith('/swipe')
    },
    {
      name: 'Messages',
      icon: 'chatbubbles' as const,
      route: '/messages',
      isActive: pathname.startsWith('/messages')
    },
    {
      name: 'Profile',
      icon: 'person' as const,
      route: '/profile',
      isActive: pathname.startsWith('/profile')
    }
  ];

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 10,
    }}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 8,
          }}
          onPress={() => handleTabPress(tab.route)}
          activeOpacity={0.7}
        >
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 4,
          }}>
            <Icon 
              name={tab.icon} 
              size={24} 
              style={{ 
                tintColor: tab.isActive ? colors.primary : colors.textSecondary,
                marginBottom: 4
              }} 
            />
            <Text style={{
              fontSize: 12,
              fontWeight: tab.isActive ? 'bold' : 'normal',
              color: tab.isActive ? colors.primary : colors.textSecondary,
            }}>
              {tab.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
} 