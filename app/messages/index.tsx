import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

// Sample conversation data - in a real app this would come from an API or state management
const sampleConversations = [
  {
    id: 1,
    user: {
      firstName: "Emma",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face"
    },
    lastMessage: {
      text: "That Italian place looks amazing! When should we go?",
      timestamp: "2 hours ago",
      isRead: false
    },
    restaurant: "Bella Vista"
  },
  {
    id: 2,
    user: {
      firstName: "Sarah",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face"
    },
    lastMessage: {
      text: "I love sushi! How about this weekend?",
      timestamp: "1 day ago",
      isRead: true
    },
    restaurant: "Sakura Sushi"
  },
  {
    id: 3,
    user: {
      firstName: "Jessica",
      photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face"
    },
    lastMessage: null, // No message history
    restaurant: "Le Petit Bistro"
  },
  {
    id: 4,
    user: {
      firstName: "Maya",
      photo: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face"
    },
    lastMessage: {
      text: "The spice level was perfect! Thanks for the recommendation 🌶️",
      timestamp: "3 days ago",
      isRead: true
    },
    restaurant: "Spice Route"
  },
  {
    id: 5,
    user: {
      firstName: "Zoe",
      photo: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop&crop=face"
    },
    lastMessage: null, // No message history
    restaurant: "Ocean Breeze"
  }
];

export default function MessagesScreen() {
  const [conversations] = useState(sampleConversations);

  const handleConversationPress = (conversation: typeof sampleConversations[0]) => {
    console.log('Opening conversation with:', conversation.user.firstName);
    // In a real app, this would navigate to the individual chat screen
    // router.push(`/messages/${conversation.id}`);
  };

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  return (
    <View style={[commonStyles.container, { justifyContent: 'flex-start' }]}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
      }}>
        <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
          Messages
        </Text>
        
        <TouchableOpacity onPress={() => router.push('/swipe')}>
          <Icon name="add" size={24} />
        </TouchableOpacity>
      </View>

      {/* Conversations List */}
      <ScrollView 
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {conversations.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 15,
              marginBottom: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
            onPress={() => handleConversationPress(conversation)}
          >
            {/* Profile Picture */}
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              overflow: 'hidden',
              marginRight: 15,
              borderWidth: 2,
              borderColor: conversation.lastMessage?.isRead === false ? colors.primary : colors.border,
            }}>
              <Image
                source={{ uri: conversation.user.photo }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </View>

            {/* Message Content */}
            <View style={{ flex: 1 }}>
              {/* Name and Restaurant */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 5,
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: colors.text,
                  fontFamily: 'OpenSans_700Bold',
                }}>
                  {conversation.user.firstName}
                </Text>
                
                {conversation.lastMessage && (
                  <Text style={{
                    fontSize: 12,
                    color: colors.textSecondary,
                    fontFamily: 'OpenSans_400Regular',
                  }}>
                    {formatTimestamp(conversation.lastMessage.timestamp)}
                  </Text>
                )}
              </View>

              {/* Restaurant Name */}
              <Text style={{
                fontSize: 12,
                color: colors.primary,
                marginBottom: 5,
                fontFamily: 'OpenSans_600SemiBold',
              }}>
                {conversation.restaurant}
              </Text>

              {/* Last Message or Prompt */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <Text 
                  style={{
                    fontSize: 14,
                    color: conversation.lastMessage ? colors.text : colors.textSecondary,
                    fontFamily: 'OpenSans_400Regular',
                    flex: 1,
                    fontStyle: conversation.lastMessage ? 'normal' : 'italic',
                  }}
                  numberOfLines={2}
                >
                  {conversation.lastMessage 
                    ? conversation.lastMessage.text 
                    : `Say hi to ${conversation.user.firstName}`
                  }
                </Text>

                {/* Unread indicator */}
                {conversation.lastMessage?.isRead === false && (
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.primary,
                    marginLeft: 10,
                  }} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {conversations.length === 0 && (
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
          }}>
            <Text style={{ fontSize: 60, marginBottom: 20 }}>💬</Text>
            <Text style={[commonStyles.title, { color: colors.textSecondary, fontSize: 20 }]}>
              No conversations yet
            </Text>
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 10, paddingHorizontal: 40 }]}>
              Start swiping to find restaurants and connect with other food lovers!
            </Text>
            
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 30,
                paddingVertical: 15,
                borderRadius: 25,
                marginTop: 30,
              }}
              onPress={() => router.push('/swipe')}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'OpenSans_700Bold',
              }}>
                Start Swiping
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
