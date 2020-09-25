import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize
} from "react-native-responsive-dimensions";

export function Header({ scrollA, onPress, name }) {
    const safeArea = useSafeAreaInsets();
    const { colors } = useTheme();
    const isFloating = !!scrollA;
    const [isTransparent, setTransparent] = React.useState(isFloating);

    React.useEffect(() => {
        if (!scrollA) {
            return;
        }
        const listenerId = scrollA.addListener(a => {
            const topNaviOffset = (responsiveScreenHeight(100) / 3) - safeArea.top;
            isTransparent !== (a.value < topNaviOffset) && setTransparent(!isTransparent);
        })
        return () => scrollA.removeListener(listenerId);
    })
    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'}
                barStyle={isTransparent ? "light-content" : "dark-content"} />
            <View style={[{ backgroundColor: colors.primary, },
            styles.header(isFloating, safeArea, isTransparent)]}>
                <IconButton
                    icon={name}
                    size={responsiveScreenFontSize(4)}
                    onPress={onPress}
                />
                <View style={styles.container}>
                    <Text style={styles.headerText}>
                        REAL TIME NEWS PH
                    </Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: responsiveScreenWidth(100),
        paddingLeft: responsiveScreenWidth(16)
    },
    header: (isFloating, safeArea, isTransparent) => ({
        width: responsiveScreenWidth(100),
        paddingTop: safeArea.top,
        height: (responsiveScreenHeight(100) / 12) + safeArea.top,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowOpacity: isTransparent ? 0 : 0.5,
        elevation: isTransparent ? 0.01 : 5,
        zIndex: 100,
        shadowOffset: {
            y: 0
        },
        marginBottom: isFloating ? -(responsiveScreenHeight(100) / 12) - safeArea.top : 0,
    }),

    headerText: {
        fontWeight: '900',
        fontSize: responsiveScreenFontSize(1.9),
        letterSpacing: responsiveScreenFontSize(0.1),
        fontFamily: 'serif',
        color: 'black',
    },

    icon: {
        marginLeft: responsiveScreenWidth(5),
        alignSelf: 'flex-start',
    },
});