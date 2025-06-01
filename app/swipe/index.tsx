import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

const { height: screenHeight } = Dimensions.get('window');

// Sample restaurant data with user profiles
const restaurants = [
  {
    id: 1,
    name: "Bella Vista",
    cuisine: "Italian",
    description: "Romantic Italian dining with candlelit atmosphere and authentic pasta dishes made fresh daily.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    rating: 4.5,
    user: {
      firstName: "Emma",
      photos: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face"
      ],
      qa: [
        {
          question: "What's your ideal first date?",
          answer: "A cozy dinner at an authentic Italian restaurant where we can share stories over handmade pasta and good wine."
        },
        {
          question: "What's your favorite cuisine?",
          answer: "I absolutely love Italian food! There's something magical about fresh ingredients and traditional recipes passed down through generations."
        }
      ]
    }
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    description: "Fresh sushi and sashimi in an elegant setting perfect for intimate conversations.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.7,
    user: {
      firstName: "Sarah",
      photos: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=face"
      ],
      qa: [
        {
          question: "What's your go-to comfort food?",
          answer: "Fresh sushi! I love the artistry and precision that goes into each piece. It's like edible art that brings me peace."
        },
        {
          question: "How do you like to spend your weekends?",
          answer: "Exploring new restaurants and trying different cuisines. I believe food is a universal language that brings people together."
        }
      ]
    }
  },
  {
    id: 3,
    name: "Le Petit Bistro",
    cuisine: "French",
    description: "Cozy French bistro with wine pairings and classic dishes in a charming atmosphere.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 4.6,
    user: {
      firstName: "Jessica",
      photos: [
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&h=600&fit=crop&crop=face"
      ],
      qa: [
        {
          question: "What's your favorite way to unwind?",
          answer: "A glass of good French wine paired with cheese and meaningful conversation. Simple pleasures make life beautiful."
        },
        {
          question: "What makes you laugh?",
          answer: "Witty banter over dinner, unexpected food combinations that actually work, and the joy of discovering a hidden gem restaurant."
        }
      ]
    }
  },
  {
    id: 4,
    name: "Spice Route",
    cuisine: "Indian",
    description: "Aromatic spices and authentic flavors in a warm, welcoming environment.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.4,
    user: {
      firstName: "Maya",
      photos: [
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face"
      ],
      qa: [
        {
          question: "What's your favorite type of adventure?",
          answer: "Culinary adventures! I love exploring bold flavors and spices from different cultures. Food tells stories of heritage and tradition."
        },
        {
          question: "What's something you're passionate about?",
          answer: "Cooking authentic Indian dishes and sharing the stories behind each recipe. Food is love, culture, and connection all in one."
        }
      ]
    }
  },
  {
    id: 5,
    name: "Ocean Breeze",
    cuisine: "Seafood",
    description: "Fresh catch of the day with ocean views and romantic sunset dining.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    rating: 4.8,
    user: {
      firstName: "Zoe",
      photos: [
        "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face"
      ],
      qa: [
        {
          question: "What's your perfect evening?",
          answer: "Watching the sunset over the ocean while enjoying fresh seafood and good company. Nature's beauty paired with great food is pure magic."
        },
        {
          question: "What's your favorite season and why?",
          answer: "Summer! I love beach picnics, fresh seafood, and dining al fresco. There's something special about meals enjoyed under the open sky."
        }
      ]
    }
  },
  {
    id: 6,
    name: "Garden Terrace",
    cuisine: "Mediterranean",
    description: "Al fresco dining with Mediterranean flavors and garden-fresh ingredients.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    rating: 4.3,
    user: {
      firstName: "Lily",
      photos: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop&crop=face"
      ],
      qa: [
        {
          question: "What's your ideal weekend activity?",
          answer: "Visiting farmers markets and cooking fresh Mediterranean dishes with seasonal ingredients. I believe in eating with the seasons."
        },
        {
          question: "What's your philosophy on food?",
          answer: "Food should be fresh, simple, and shared. The best meals are those enjoyed with people you care about in beautiful settings."
        }
      ]
    }
  },
];

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<{[key: string]: boolean}>({});
  const [matches, setMatches] = useState<typeof restaurants>([]);

  const currentRestaurant = restaurants[currentIndex];

  const handlePhotoLike = (restaurantId: number, photoIndex: number) => {
    const key = `${restaurantId}-${photoIndex}`;
    setLikedPhotos(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isPhotoLiked = (restaurantId: number, photoIndex: number) => {
    const key = `${restaurantId}-${photoIndex}`;
    return likedPhotos[key] || false;
  };

  const handleDecision = (liked: boolean) => {
    if (liked && currentRestaurant) {
      setMatches(prev => [...prev, currentRestaurant]);
      console.log('Added to matches:', currentRestaurant.user.firstName);
    }

    // Move to next candidate
    if (currentIndex < restaurants.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // All candidates viewed, go to matches
      console.log('All candidates viewed, going to matches');
      router.push('/matches');
    }
  };

  const handlePhotoLikeWithDecision = (restaurantId: number, photoIndex: number) => {
    // Like the photo
    handlePhotoLike(restaurantId, photoIndex);
    
    // Also like the candidate and move to next
    handleDecision(true);
  };

  if (!currentRestaurant) {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.title}>No more candidates!</Text>
          <Button
            text="View Matches"
            onPress={() => router.push('/matches')}
            style={{ backgroundColor: colors.primary }}
          />
        </View>
      </View>
    );
  }

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
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
          amuse
        </Text>
        
        {/* Progress indicator */}
        <Text style={[commonStyles.text, { color: colors.textSecondary }]}>
          {currentIndex + 1} of {restaurants.length}
        </Text>
      </View>

      {/* Reject Button Overlay */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 20,
          top: '50%',
          transform: [{ translateY: -30 }],
          backgroundColor: '#ff4458',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 1000,
        }}
        onPress={() => handleDecision(false)}
      >
        <Icon name="close" size={30} style={{ tintColor: 'white' }} />
      </TouchableOpacity>

      {/* Scrollable Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User's First Name */}
        <View style={{ 
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: 'white',
        }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold',
            color: colors.text,
            fontFamily: 'OpenSans_700Bold'
          }}>
            {currentRestaurant.user.firstName}
          </Text>
          <Text style={[
            commonStyles.text,
            { 
              color: colors.primary,
              fontSize: 16,
              marginTop: 2
            }
          ]}>
            Wants to try {currentRestaurant.name}
          </Text>
        </View>

        {/* Photo Grid with Like Buttons */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ 
            flexDirection: 'row', 
            marginBottom: 4
          }}>
            {currentRestaurant.user.photos.slice(0, 2).map((photo, photoIndex) => (
              <View key={photoIndex} style={{ 
                flex: 1, 
                marginRight: photoIndex === 0 ? 2 : 0,
                marginLeft: photoIndex === 1 ? 2 : 0,
                position: 'relative'
              }}>
                <Image
                  source={{ uri: photo }}
                  style={{ 
                    width: '100%',
                    height: 250,
                    borderRadius: 10
                  }}
                  resizeMode="cover"
                />
                {/* Like Button */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 20,
                    padding: 8,
                  }}
                  onPress={() => handlePhotoLikeWithDecision(currentRestaurant.id, photoIndex)}
                >
                  <Icon 
                    name="heart" 
                    size={20} 
                    style={{ 
                      tintColor: colors.accent
                    }} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          <View style={{ 
            flexDirection: 'row',
            marginTop: 4
          }}>
            {currentRestaurant.user.photos.slice(2, 4).map((photo, photoIndex) => (
              <View key={photoIndex + 2} style={{ 
                flex: 1, 
                marginRight: photoIndex === 0 ? 2 : 0,
                marginLeft: photoIndex === 1 ? 2 : 0,
                position: 'relative'
              }}>
                <Image
                  source={{ uri: photo }}
                  style={{ 
                    width: '100%',
                    height: 250,
                    borderRadius: 10
                  }}
                  resizeMode="cover"
                />
                {/* Like Button */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: 20,
                    padding: 8,
                  }}
                  onPress={() => handlePhotoLikeWithDecision(currentRestaurant.id, photoIndex + 2)}
                >
                  <Icon 
                    name="heart" 
                    size={20} 
                    style={{ 
                      tintColor: colors.accent
                    }} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Q&A Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          {currentRestaurant.user.qa.map((qa, index) => (
            <View key={index} style={{
              backgroundColor: 'white',
              borderRadius: 15,
              padding: 20,
              marginBottom: 15,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}>
              <Text style={[
                commonStyles.text, 
                { 
                  fontWeight: 'bold', 
                  color: colors.primary,
                  marginBottom: 10,
                  fontSize: 16
                }
              ]}>
                {qa.question}
              </Text>
              <Text style={[
                commonStyles.text, 
                { 
                  color: colors.text,
                  lineHeight: 22,
                  fontSize: 15
                }
              ]}>
                {qa.answer}
              </Text>
            </View>
          ))}

          {/* Restaurant Info */}
          <View style={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
          }}>
            <Text style={[
              commonStyles.text, 
              { 
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 8
              }
            ]}>
              {currentRestaurant.name}
            </Text>
            <Text style={[
              commonStyles.text, 
              { 
                color: 'white',
                fontSize: 14,
                opacity: 0.9,
                marginBottom: 8
              }
            ]}>
              {currentRestaurant.cuisine} • ⭐ {currentRestaurant.rating}
            </Text>
            <Text style={[
              commonStyles.text, 
              { 
                color: 'white',
                fontSize: 14,
                opacity: 0.9,
                lineHeight: 20
              }
            ]}>
              {currentRestaurant.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}