import { View, Text, Image, Animated, PanGestureHandler, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useRef } from 'react';
import { GestureHandlerRootView, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { commonStyles, colors } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Bella Vista",
    cuisine: "Italian",
    description: "Romantic Italian dining with candlelit atmosphere and authentic pasta dishes made fresh daily.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    description: "Fresh sushi and sashimi in an elegant setting perfect for intimate conversations.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Le Petit Bistro",
    cuisine: "French",
    description: "Cozy French bistro with wine pairings and classic dishes in a charming atmosphere.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Spice Route",
    cuisine: "Indian",
    description: "Aromatic spices and authentic flavors in a warm, welcoming environment.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.4,
  },
  {
    id: 5,
    name: "Ocean Breeze",
    cuisine: "Seafood",
    description: "Fresh catch of the day with ocean views and romantic sunset dining.",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Garden Terrace",
    cuisine: "Mediterranean",
    description: "Al fresco dining with Mediterranean flavors and garden-fresh ingredients.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    rating: 4.3,
  },
];

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<typeof restaurants>([]);
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const currentRestaurant = restaurants[currentIndex];

  const resetCard = () => {
    translateX.setValue(0);
    rotate.setValue(0);
    opacity.setValue(1);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiping ${direction} on restaurant:`, currentRestaurant?.name);
    
    if (direction === 'right' && currentRestaurant) {
      setMatches(prev => [...prev, currentRestaurant]);
      console.log('Added to matches:', currentRestaurant.name);
    }

    // Animate card off screen
    const toValue = direction === 'right' ? 300 : -300;
    Animated.parallel([
      Animated.timing(translateX, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Move to next card
      if (currentIndex < restaurants.length - 1) {
        setCurrentIndex(prev => prev + 1);
        resetCard();
      } else {
        // All cards swiped, go to matches
        console.log('All restaurants swiped, going to matches');
        router.push('/matches');
      }
    });
  };

  const handlePanGesture = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    
    translateX.setValue(translationX);
    
    // Rotate card based on translation
    const rotateValue = translationX / 10;
    rotate.setValue(rotateValue);
    
    // Change opacity based on swipe distance
    const newOpacity = 1 - Math.abs(translationX) / 300;
    opacity.setValue(Math.max(newOpacity, 0.3));
  };

  const handlePanEnd = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, velocityX } = event.nativeEvent;
    
    // Determine if swipe was significant enough
    const shouldSwipe = Math.abs(translationX) > 120 || Math.abs(velocityX) > 500;
    
    if (shouldSwipe) {
      const direction = translationX > 0 ? 'right' : 'left';
      handleSwipe(direction);
    } else {
      // Return to center
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(rotate, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(opacity, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  if (!currentRestaurant) {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.title}>No more restaurants!</Text>
          <Button
            text="View Matches"
            onPress={() => router.push('/matches')}
            style={{ backgroundColor: colors.primary }}
          />
        </View>
      </View>
    );
  }

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <GestureHandlerRootView style={commonStyles.container}>
      <View style={commonStyles.container}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 10,
        }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          
          <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
            amuse
          </Text>
          
          <TouchableOpacity onPress={() => router.push('/matches')}>
            <View style={{ position: 'relative' }}>
              <Icon name="heart" size={24} />
              {matches.length > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: colors.accent,
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                    {matches.length}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Card Stack */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <PanGestureHandler
            onGestureEvent={handlePanGesture}
            onEnded={handlePanEnd}
          >
            <Animated.View
              style={[
                commonStyles.restaurantCard,
                {
                  transform: [
                    { translateX },
                    { rotate: rotateInterpolate },
                  ],
                  opacity,
                },
              ]}
            >
              <Image
                source={{ uri: currentRestaurant.image }}
                style={commonStyles.restaurantImage}
              />
              
              <View style={commonStyles.restaurantInfo}>
                <View>
                  <Text style={commonStyles.restaurantName}>
                    {currentRestaurant.name}
                  </Text>
                  <Text style={commonStyles.restaurantCuisine}>
                    {currentRestaurant.cuisine} • ⭐ {currentRestaurant.rating}
                  </Text>
                  <Text style={commonStyles.restaurantDescription}>
                    {currentRestaurant.description}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>

        {/* Swipe Buttons */}
        <View style={commonStyles.swipeButtonsContainer}>
          <TouchableOpacity
            style={[commonStyles.swipeButton, commonStyles.passButton]}
            onPress={() => handleSwipe('left')}
          >
            <Icon name="close" size={30} style={{ tintColor: 'white' }} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[commonStyles.swipeButton, commonStyles.likeButton]}
            onPress={() => handleSwipe('right')}
          >
            <Icon name="heart" size={30} style={{ tintColor: 'white' }} />
          </TouchableOpacity>
        </View>

        {/* Progress indicator */}
        <View style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}>
          <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textSecondary }]}>
            {currentIndex + 1} of {restaurants.length}
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}