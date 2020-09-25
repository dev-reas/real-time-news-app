import React from 'react';
import { StyleSheet } from 'react-native';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { useTheme } from '@react-navigation/native';

export function MyActionButton({PostPressHandler, AboutPressHandler, ProfilePressHandler}) {
    const { colors } = useTheme();
    return (
        <>
            <ActionButton useNativeFeedback backgroundTappable degrees={90} renderIcon={() => (
                <MaterialIcons name="unfold-more" size={responsiveScreenFontSize(3.5)} color={colors.buttonText} />
            )} size={responsiveScreenWidth(2) * responsiveScreenHeight(2) / 2}
                hideShadow={true} position={'right'} buttonColor={colors.buttonTextBackground}>
                <ActionButton.Item size={responsiveScreenWidth(1.6) * responsiveScreenHeight(1.6) * 0.5} buttonColor={colors.buttonTextBackground}
                    textStyle={{ color: 'white' }}
                    textContainerStyle={styles.textContainer}
                    title="About us" onPress={AboutPressHandler}>
                    <AntDesign name="trademark" size={responsiveScreenFontSize(2.5)} color={colors.buttonText} />
                </ActionButton.Item>
                <ActionButton.Item size={responsiveScreenWidth(1.6) * responsiveScreenHeight(1.6) * 0.5} buttonColor={colors.buttonTextBackground}
                    textStyle={{ color: 'white' }}
                    textContainerStyle={styles.textContainer}
                    title="User Profile" onPress={ProfilePressHandler}>
                    <MaterialCommunityIcons name="face-profile" size={responsiveScreenFontSize(2.5)} color={colors.buttonText} />
                </ActionButton.Item>
                <ActionButton.Item size={responsiveScreenWidth(1.6) * responsiveScreenHeight(1.6) * 0.5} buttonColor={colors.buttonTextBackground}
                    textStyle={{ color: 'white' }}
                    textContainerStyle={styles.textContainer}
                    title="New Post" onPress={PostPressHandler}>
                    <AntDesign name="plus" size={responsiveScreenFontSize(2.5)} color={colors.buttonText} />
                </ActionButton.Item>
            </ActionButton>
        </>
    );
}

const styles = StyleSheet.create({
    textContainer: {
      backgroundColor: 'black'
    },
  });