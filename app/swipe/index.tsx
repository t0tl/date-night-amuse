import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
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
          answer: "Sharing stories over handmade pasta and good wine."
        },
        {
          question: "What's your favorite cuisine?",
          answer: "I absolutely love Italian food!"
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
          answer: "Fresh sushi!"
        },
        {
          question: "How do you like to spend your weekends?",
          answer: "Exploring new restaurants and trying different cuisines."
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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    radius: 25,
    ageRange: [22, 35],
    heightRange: [5.2, 6.2],
    activeToday: false
  });

  const scrollY = useRef(new Animated.Value(0)).current;
  const currentRestaurant = restaurants[currentIndex];

  // Calculate header opacity based on scroll position
  // Header starts appearing when name section starts going out of view (around 150px)
  // Becomes fully opaque when name is completely out of view (around 250px)
  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerBlur = scrollY.interpolate({
    inputRange: [150, 200, 250],
    outputRange: [0, 5, 0],
    extrapolate: 'clamp',
  });

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
      {/* Sticky Header with Name */}
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(252, 248, 248, 0.95)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(240, 240, 240, 0.8)',
        opacity: headerOpacity,
      }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold',
          color: colors.text,
          fontFamily: 'OpenSans_700Bold',
          textAlign: 'center',
        }}>
          {currentRestaurant.user.firstName}
        </Text>
      </Animated.View>

      {/* Reject Button Overlay */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 20,
          bottom: 20,
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
      <Animated.ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Settings Bar */}
        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#fcf8f8',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => setShowFilters(!showFilters)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Icon name="options" size={20} style={{ tintColor: colors.primary, marginRight: 10 }} />
              <Text style={{
                fontSize: 16,
                color: colors.primary,
                fontWeight: '600',
              }}>
                Filters
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                fontSize: 14,
                color: colors.textSecondary,
                marginRight: 8,
              }}>
                {filters.radius}mi • {filters.ageRange[0]}-{filters.ageRange[1]} • {filters.heightRange[0]}'-{filters.heightRange[1]}' {filters.activeToday ? '• Active' : ''}
              </Text>
              <Icon 
                name={showFilters ? "chevron-up" : "chevron-down"} 
                size={16} 
                style={{ tintColor: colors.textSecondary }} 
              />
            </View>
          </TouchableOpacity>

          {showFilters && (
            <View style={{
              marginTop: 15,
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              {/* Radius */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 10,
                }}>
                  Radius: {filters.radius} miles
                </Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {[5, 10, 25, 50, 100].map((radius) => (
                    <TouchableOpacity
                      key={radius}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: filters.radius === radius ? colors.primary : '#f0f0f0',
                      }}
                      onPress={() => setFilters(prev => ({ ...prev, radius }))}
                    >
                      <Text style={{
                        color: filters.radius === radius ? 'white' : colors.text,
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                        {radius}mi
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Age Range */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 10,
                }}>
                  Age: {filters.ageRange[0]} - {filters.ageRange[1]}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {['18-25', '22-30', '25-35', '30-40', '35+'].map((range, index) => {
                    const ranges = [[18, 25], [22, 30], [25, 35], [30, 40], [35, 50]];
                    const isSelected = filters.ageRange[0] === ranges[index][0] && filters.ageRange[1] === ranges[index][1];
                    return (
                      <TouchableOpacity
                        key={range}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 20,
                          backgroundColor: isSelected ? colors.primary : '#f0f0f0',
                        }}
                        onPress={() => setFilters(prev => ({ ...prev, ageRange: ranges[index] }))}
                      >
                        <Text style={{
                          color: isSelected ? 'white' : colors.text,
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                          {range}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Height Range */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 10,
                }}>
                  Height: {filters.heightRange[0]}' - {filters.heightRange[1]}'
                </Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {['5.0-5.5', '5.2-5.8', '5.5-6.0', '5.8-6.2', '6.0+'].map((range, index) => {
                    const ranges = [[5.0, 5.5], [5.2, 5.8], [5.5, 6.0], [5.8, 6.2], [6.0, 6.5]];
                    const isSelected = filters.heightRange[0] === ranges[index][0] && filters.heightRange[1] === ranges[index][1];
                    return (
                      <TouchableOpacity
                        key={range}
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 20,
                          backgroundColor: isSelected ? colors.primary : '#f0f0f0',
                        }}
                        onPress={() => setFilters(prev => ({ ...prev, heightRange: ranges[index] }))}
                      >
                        <Text style={{
                          color: isSelected ? 'white' : colors.text,
                          fontSize: 14,
                          fontWeight: '500',
                        }}>
                          {range}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Active Today */}
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                  }}
                  onPress={() => setFilters(prev => ({ ...prev, activeToday: !prev.activeToday }))}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.text,
                  }}>
                    Active Today
                  </Text>
                  <View style={{
                    width: 50,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: filters.activeToday ? colors.primary : '#e0e0e0',
                    justifyContent: 'center',
                    paddingHorizontal: 2,
                  }}>
                    <View style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: 'white',
                      alignSelf: filters.activeToday ? 'flex-end' : 'flex-start',
                    }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* User's First Name */}
        <View style={{ 
          paddingHorizontal: 20,
          paddingVertical: 15,
          backgroundColor: '#fcf8f8',
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold',
              color: colors.text,
              fontFamily: 'OpenSans_700Bold'
            }}>
              {currentRestaurant.user.firstName}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
            }}>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  padding: 8,
                }}
                onPress={() => {
                  // Handle undo action
                  if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                  }
                }}
              >
                <Icon name="arrow-undo" size={20} style={{ tintColor: colors.textSecondary }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  padding: 8,
                }}
                onPress={() => {
                  // Handle menu action
                  console.log('Menu pressed');
                }}
              >
                <Icon name="ellipsis-horizontal" size={20} style={{ tintColor: colors.textSecondary }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={{
              color: '#4C3A8D', // Less bright purple
              fontSize: 11,
              fontWeight: '400',
            }}>
              Active today
            </Text>
          </View>
        </View>

        {/* Photo Grid with Like Buttons */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* First pair of images */}
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
                      tintColor: colors.gray
                    }} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* First Q&A */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 40,
            paddingVertical: 65,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text style={[
              commonStyles.text, 
              { 
                fontWeight: '600',
                color: colors.primary,
                marginBottom: 15,
                fontSize: 18,
                textAlign: 'left'
              }
            ]}>
              {currentRestaurant.user.qa[0].question}
            </Text>
            <Text style={[
              commonStyles.text, 
              { 
                color: colors.textBox,
                lineHeight: 32,
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'left'
              }
            ]}>
              {currentRestaurant.user.qa[0].answer}
            </Text>
          </View>
        </View>

        {/* Second pair of images */}
        <View style={{ paddingHorizontal: 20 }}>
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
                      tintColor: colors.gray
                    }} 
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Second Q&A */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            paddingHorizontal: 40,
            paddingVertical: 65,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text style={[
              commonStyles.text, 
              { 
                fontWeight: '600',
                color: colors.primary,
                marginBottom: 15,
                fontSize: 18,
                textAlign: 'left'
              }
            ]}>
              {currentRestaurant.user.qa[1].question}
            </Text>
            <Text style={[
              commonStyles.text, 
              { 
                color: colors.textBox,
                lineHeight: 32,
                fontSize: 25,
                fontWeight: 'bold',
                textAlign: 'left'
              }
            ]}>
              {currentRestaurant.user.qa[1].answer}
            </Text>
          </View>

          {/* Restaurant Info */}
          <View style={{
            backgroundColor: colors.primary,
            borderRadius: 15,
            padding: 25,
            marginBottom: 20,
          }}>
            <Text style={[
              commonStyles.text, 
              { 
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10
              }
            ]}>
              {currentRestaurant.name}
            </Text>
            <Text style={[
              commonStyles.text, 
              { 
                color: 'white',
                fontSize: 16,
                opacity: 0.9,
                marginBottom: 10
              }
            ]}>
              {currentRestaurant.cuisine} • ⭐ {currentRestaurant.rating}
            </Text>
            <Text style={[
              commonStyles.text, 
              { 
                color: 'white',
                fontSize: 16,
                opacity: 0.9,
                lineHeight: 24
              }
            ]}>
              {currentRestaurant.description}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}