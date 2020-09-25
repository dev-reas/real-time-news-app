import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export function Heading({ children, style, ...props }) {
    return (
        <>
            <Text {...props} style={[styles.text, style]}>{children}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: responsiveScreenFontSize(5),
        color: 'black',
    }
})
