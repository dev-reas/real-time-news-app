import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export function FlatlistHeader({title}) {
    const { colors } = useTheme();

    var header_View = (
        <View style={styles.header}>
            <Text style={{
                color: colors.text, 
                justifyContent: "center",
                textAlign: "center",
                fontSize: responsiveScreenFontSize(3),
                fontFamily: 'serif',
            }}>{title}</Text>
        </View>
    );
    return header_View;
};

const styles = StyleSheet.create({
    header: {
        width: responsiveScreenWidth(100),
        marginTop: responsiveScreenHeight(2),
        marginBottom: responsiveScreenHeight(2),
    },
});