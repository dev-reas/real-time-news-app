import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export function TextButton({title, style, onPress}) {
    return (
        <>
            <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
                <Text style={styles.text}>
                    {title.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </>
        );
}

const styles = StyleSheet.create({
  container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
  },

  text: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
  }
})
