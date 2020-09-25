import React from 'react';
import { StyleSheet, View, ImageBackground, LayoutAnimation } from 'react-native';
import {
    useResponsiveScreenWidth,
    useResponsiveScreenHeight
} from "react-native-responsive-dimensions";

export function AuthContainer({ children }) {

    return (
        <ImageBackground source={require('../assets/news.jpg')}
            style=
            {
                {
                    height: useResponsiveScreenHeight(100),
                    width: useResponsiveScreenWidth(100),
                    flex: 1,
                    justifyContent: "center",
                    alignItems: 'center',
                }
            }>
            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {

    },
});