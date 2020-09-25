import React from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import {
     responsiveScreenWidth, responsiveScreenHeight
} from "react-native-responsive-dimensions";

export function EasterEgg({ loading, opacity }) {
    if (!loading) {
        return < View />;
    }
    return (
        <>
            <View style={styles.overlay}>
                <Animated.View style={{
                    opacity
                }}>
                    <Image
                        style={{
                            width: responsiveScreenWidth(75),
                            height: (responsiveScreenHeight(25)),
                            resizeMode: 'cover'
                        }}
                        source={{ uri: 'https://i.kym-cdn.com/entries/icons/facebook/000/032/379/Screen_Shot_2020-01-09_at_2.22.56_PM.jpg' }} />
                </Animated.View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
