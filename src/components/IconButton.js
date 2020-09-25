import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

export function IconButton({ name, size, style, coloor, onPress }) {
  const { colors } = useTheme();
  return (
    <>
      <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <AntDesign name={name} size={size} color={colors.primary} coloor={coloor} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({

})
