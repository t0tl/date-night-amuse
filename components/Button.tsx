import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({ text, onPress, style, textStyle, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        style,
        disabled && styles.disabledButton
      ]} 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[
        styles.buttonText, 
        textStyle,
        disabled && styles.disabledText
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 25,
    marginTop: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'OpenSans_600SemiBold',
  },
  disabledButton: {
    backgroundColor: colors.textSecondary,
    opacity: 0.6,
  },
  disabledText: {
    color: '#ccc',
  },
});