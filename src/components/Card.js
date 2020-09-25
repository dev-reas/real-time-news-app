import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

export function Card({ style, children, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[{
      backgroundColor: colors.background,
      borderWidth: 0.5,
      borderColor: colors.borderColor,
      shadowRadius: 4,
      shadowColor: colors.shadow,
      shadowOffset: {
        height: 160,
        width: 10,
      },
      elevation: 5,
    }, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {

  },
});
