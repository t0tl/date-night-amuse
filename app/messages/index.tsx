import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

export default function MessagesScreen() {
  const conversations = [
    {
      id: 1,
      name: "Emma",
      lastMessage: "That Italian place looks amazing! When should we go?",
      timestamp: "2m ago",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      restaurant: "Bella Vista"
    },
    {
      id: 2,
      name: "Sarah",
      lastMessage: "Thanks for the great dinner recommendation!",
      timestamp: "1h ago",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      restaurant: "Sakura Sushi"
    },
    {
      id: 3,
      name: "Jessica",
      lastMessage: "I love French cuisine too! 🥐",
      timestamp: "3h ago",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      restaurant: "Le Petit Bistro"
    },
    {
      id: 4,
      name: "Maya",
      lastMessage: "The seafood there is incredible!",
      timestamp: "1d ago",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      restaurant: "Ocean Breeze"
    },
  ];

  const renderConversation = (conversation: typeof conversations[0]) => (
    <TouchableOpacity
      key={conversation.id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}
      onPress={() => router.push(`/messages/${conversation.id}`)}
    >
      {/* Avatar */}
      <View style={{ position: 'relative', marginRight: 15 }}>
        <Image
          source={{ uri: conversation.avatar }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        />
        {conversation.unread && (
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: colors.accent,
            borderWidth: 2,
            borderColor: 'white',
          }} />
        )}
      </View>

      {/* Message Content */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <Text style={[
            commonStyles.text,
            { 
              fontWeight: conversation.unread ? 'bold' : 'normal',
              fontSize: 16,
              color: colors.text
            }
          ]}>
            {conversation.name}
          </Text>
          <Text style={[
            commonStyles.text,
            { 
              fontSize: 12,
              color: colors.textSecondary
            }
          ]}>
            {conversation.timestamp}
          </Text>
        </View>
        
        <Text style={[
          commonStyles.text,
          { 
            color: conversation.unread ? colors.text : colors.textSecondary,
            fontWeight: conversation.unread ? '500' : 'normal',
            fontSize: 14
          }
        ]} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
        
        <Text style={[
          commonStyles.text,
          { 
            fontSize: 12,
            color: colors.primary,
            marginTop: 2
          }
        ]}>
          Matched at {conversation.restaurant}
        </Text>
      </View>

      {/* Arrow */}
      <Icon name="chevron-forward" size={20} style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: 'white',
      }}>
        <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
          Messages
        </Text>
        
        <TouchableOpacity onPress={() => router.push('/messages/search')}>
          <Icon name="search" size={24} />
        </TouchableOpacity>
      </View>

      {conversations.length === 0 ? (
        /* Empty State */
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}>
          <Icon name="chatbubbles-outline" size={80} style={{ marginBottom: 20, opacity: 0.3 }} />
          <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 10 }]}>
            No Messages Yet
          </Text>
          <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textSecondary, lineHeight: 22 }]}>
            Start swiping to find restaurants you both love and begin conversations with your matches!
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
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Start Swiping
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Conversations List */
        <ScrollView style={{ flex: 1 }}>
          {conversations.map(renderConversation)}
        </ScrollView>
      )}
    </View>
  );
} 