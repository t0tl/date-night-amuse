import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FF69B4',      // Soft pink
  secondary: '#20B2AA',    // Teal
  accent: '#FF7F50',       // Coral
  background: '#2C2C2C',   // Dark gray background
  card: '#3A3A3A',         // Card background
  text: '#FFFFFF',         // White text
  textSecondary: '#B0B0B0', // Secondary text
  success: '#4CAF50',      // Green for matches
  danger: '#F44336',       // Red for pass
  border: '#4A4A4A',       // Border color
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
  },
  accentButton: {
    backgroundColor: colors.accent,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
  },
  backButton: {
    backgroundColor: colors.textSecondary,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'OpenSans_700Bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 20,
    fontFamily: 'OpenSans_600SemiBold',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  restaurantCard: {
    width: '90%',
    height: '75%',
    borderRadius: 20,
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  restaurantInfo: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
    fontFamily: 'OpenSans_700Bold',
  },
  restaurantCuisine: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
    fontFamily: 'OpenSans_400Regular',
  },
  restaurantDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  swipeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingBottom: 30,
    width: '100%',
  },
  swipeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passButton: {
    backgroundColor: colors.danger,
  },
  likeButton: {
    backgroundColor: colors.success,
  },
});