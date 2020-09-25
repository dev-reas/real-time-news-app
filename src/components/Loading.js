import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import {
    useResponsiveScreenWidth, useResponsiveScreenHeight, useResponsiveScreenFontSize
} from "react-native-responsive-dimensions";

export function Loading({ loading }) {
    if (!loading) {
        return < View />;
    }
    return (
        <>
            <View style={styles.overlay}>
                <View style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: useResponsiveScreenWidth(32),
                    height: useResponsiveScreenHeight(7),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: useResponsiveScreenWidth(20) / 4
                }}>
                    <ActivityIndicator color={'black'} />
                    <Text style={{
                        marginLeft: 8,
                        fontSize: useResponsiveScreenFontSize(2),
                        fontWeight: '500',
                    }}>Loading...</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
