import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

export function SplashScreen() {
    const { colors } = useTheme();
    return (
        <>
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/logo_black_font.png')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
})