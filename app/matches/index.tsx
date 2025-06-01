import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

// This would normally come from a state management solution or API
// For demo purposes, we'll use local state
const sampleMatches = [
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
];

export default function MatchesScreen() {
  const [matches, setMatches] = useState(sampleMatches);

  useEffect(() => {
    console.log('Matches screen loaded with', matches.length, 'matches');
  }, [matches]);

  const removeMatch = (matchId: number) => {
    console.log('Removing match with id:', matchId);
    setMatches(prev => prev.filter(match => match.id !== matchId));
  };

  if (matches.length === 0) {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.content}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 40,
          }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Icon name="arrow-back" size={24} />
            </TouchableOpacity>
            
            <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
              Your Matches
            </Text>
            
            <View style={{ width: 24 }} />
          </View>

          {/* Empty State */}
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ fontSize: 60, marginBottom: 20 }}>💔</Text>
            <Text style={[commonStyles.title, { color: colors.textSecondary, fontSize: 20 }]}>
              No matches yet
            </Text>
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 10, paddingHorizontal: 40 }]}>
              Keep swiping to find restaurants you&apos;ll love for your next date!
            </Text>
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              text="Start Swiping"
              onPress={() => {
                console.log('Going back to swipe screen');
                router.push('/swipe');
              }}
              style={buttonStyles.primaryButton}
            />
            
            <Button
              text="Back to Home"
              onPress={() => {
                console.log('Going back to home screen');
                router.push('/');
              }}
              style={buttonStyles.backButton}
            />
          </View>
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
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        
        <Text style={[commonStyles.title, { fontSize: 24, color: colors.primary }]}>
          Your Matches
        </Text>
        
        <TouchableOpacity onPress={() => router.push('/swipe')}>
          <Icon name="add" size={24} />
        </TouchableOpacity>
      </View>

      {/* Matches Count */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={[commonStyles.subtitle, { textAlign: 'left' }]}>
          {matches.length} restaurant{matches.length !== 1 ? 's' : ''} you&apos;d love to try
        </Text>
      </View>

      {/* Matches List */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {matches.map((match, index) => (
          <View key={match.id} style={[commonStyles.card, { marginBottom: 15 }]}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={{ uri: match.image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              />
              
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[commonStyles.restaurantName, { fontSize: 18, marginBottom: 5 }]}>
                      {match.name}
                    </Text>
                    <Text style={[commonStyles.restaurantCuisine, { marginBottom: 8 }]}>
                      {match.cuisine} • ⭐ {match.rating}
                    </Text>
                    <Text style={[commonStyles.restaurantDescription, { fontSize: 12 }]}>
                      {match.description}
                    </Text>
                  </View>
                  
                  <TouchableOpacity
                    onPress={() => removeMatch(match.id)}
                    style={{
                      padding: 5,
                      marginLeft: 10,
                    }}
                  >
                    <Icon name="close" size={20} style={{ tintColor: colors.textSecondary }} />
                  </TouchableOpacity>
                </View>
                
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.secondary,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      borderRadius: 15,
                      flex: 1,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      console.log('Viewing details for:', match.name);
                      // Would navigate to restaurant details
                    }}
                  >
                    <Text style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                      View Details
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.accent,
                      paddingHorizontal: 15,
                      paddingVertical: 8,
                      borderRadius: 15,
                      flex: 1,
                      marginLeft: 10,
                    }}
                    onPress={() => {
                      console.log('Making reservation at:', match.name);
                      // Would handle reservation booking
                    }}
                  >
                    <Text style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                      Book Table
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <Button
          text="Find More Restaurants"
          onPress={() => {
            console.log('Going back to swipe screen');
            router.push('/swipe');
          }}
          style={buttonStyles.primaryButton}
        />
      </View>
    </View>
  );
}