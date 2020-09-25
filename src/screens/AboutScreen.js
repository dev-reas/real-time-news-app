import React, { useRef } from 'react';
import { Text, View, StyleSheet, Image, Animated, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../components/Header';
import { useTheme } from '@react-navigation/native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import { EasterEgg } from '../components/EasterEgg';
import { sleep } from '../utils/sleep';

export function AboutScreen(props, { navigation }) {
    const opacity = React.useState(new Animated.Value(0))[0];
    const [isState, setState] = React.useState(false);
    const { colors } = useTheme();
    const OpenMenu = () => {
        props.navigation.pop();
    }

    const scrollA = useRef(new Animated.Value(0)).current;

    return (
        <>
            <Header name={'close-box'} onPress={OpenMenu} scrollA={scrollA} />
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.container}>
                    <Animated.Image source={require('../assets/about.jpg')}
                        style={styles.imageContainer(scrollA)}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={{
                            fontFamily: 'serif',
                            fontSize: responsiveScreenFontSize(3.3),
                            fontWeight: '900',
                            color: colors.text
                        }}>The news we have</Text>
                        <Text style={{
                            fontFamily: 'serif',
                            fontSize: responsiveScreenFontSize(3.3),
                            fontWeight: '900',
                            color: colors.text
                        }}>The news you need</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.titleNewContainer}>
                        <Text style={{
                            fontFamily: 'serif',
                            fontSize: responsiveScreenFontSize(4),
                            fontWeight: '900',
                            color: colors.text
                        }}>
                            About us
                        </Text>
                        <View style={styles.containerContent}>
                            <Text style={{
                                textAlign: 'justify', fontFamily: 'sans-serif', letterSpacing: 0.5,
                                color: colors.text, fontSize: responsiveScreenFontSize(1.8)
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras commodo imperdiet purus, vitae fringilla elit rutrum a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc id justo tincidunt, bibendum lectus eu, vehicula felis. Cras pellentesque aliquet purus et ultricies. Vivamus posuere mattis felis in maximus. Integer elementum risus et ligula volutpat commodo. Sed porttitor dolor eros, ac molestie ante blandit sed.
                                Etiam luctus risus lacus, sed pretium massa vehicula eu. In ornare erat eu tellus varius cursus. Nullam sed mollis augue, quis accumsan metus.
                                Aenean ligula sapien, imperdiet nec quam non, mattis euismod neque.
                                Nunc id justo tincidunt, bibendum lectus eu, vehicula felis. Cras pellentesque aliquet purus et ultricies. Vivamus posuere mattis felis in maximus. Integer elementum risus et ligula volutpat commodo. Sed porttitor dolor eros, ac molestie ante blandit sed.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginBottom: responsiveScreenHeight(0.5), }}>
                    <View style={styles.titleNewContainer}>
                        <Text style={{
                            fontFamily: 'serif',
                            fontSize: responsiveScreenFontSize(3.3),
                            fontWeight: '900',
                            color: colors.text
                        }}>
                            Our Team
                    </Text>
                    </View>
                    <View style={styles.imageRow}>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/ana.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Analou Edma</Text>
                        </View>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/Jaks.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Jeraldine Cagatin</Text>
                        </View>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/kiara.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Kiara Baliwagan</Text>
                        </View>
                    </View>
                    <View style={styles.imageRow}>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/gor.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Rigor Sagun</Text>
                        </View>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <TouchableWithoutFeedback
                                delayLongPress={1500}
                                onLongPress={() => {
                                    setState(true)
                                    Animated.timing(opacity, {
                                        toValue: 1,
                                        duration: 500,
                                        useNativeDriver: true,
                                    }).start()
                                    sleep(2000).then(() => {
                                        Animated.timing(opacity, {
                                            toValue: 0,
                                            duration: 600,
                                            useNativeDriver: true,
                                        }).start()
                                        sleep(700).then(() => {
                                            setState(false)
                                        })
                                    })
                                }}>
                                <Image
                                    source={require('../assets/logo.png')} style={{
                                        width: responsiveScreenWidth(25),
                                        height: responsiveScreenHeight(12),
                                        borderRadius: responsiveScreenWidth(8),
                                        margin: responsiveScreenWidth(3),
                                    }} />
                            </TouchableWithoutFeedback>
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>
                                Team Discord
                            </Text>
                        </View>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/dan.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Daniella Sevial</Text>
                        </View>
                    </View>
                    <View style={styles.imageRow}>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/bry.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Bryan Casimero</Text>
                        </View>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/lem.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Lemuel Ami</Text>
                        </View>
                        <View styles={{
                            flexDirection: 'column', justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            <Image source={require('../assets/omar.jpg')} style={styles.images} />
                            <Text style={{ color: colors.text, alignSelf: 'center' }}>Jomari Salting</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    backgroundColor: colors.primary,
                    height: responsiveScreenHeight(11),
                    marginTop: responsiveScreenHeight(2),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={styles.footer}>
                        <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(2.5) }}>Contact us</Text>
                        <View style={styles.iconRow}>
                            <View style={styles.icon}>
                                <Entypo name="facebook-with-circle" size={responsiveScreenFontSize(4)} color={colors.text} />
                            </View>
                            <View style={styles.icon}>
                                <Entypo name="twitter-with-circle" size={responsiveScreenFontSize(4)} color={colors.text} />
                            </View>
                            <View style={styles.icon}>
                                <FontAwesome name="google-plus" size={responsiveScreenFontSize(4)} color={colors.text} />
                            </View>
                            <View style={styles.icon}>
                                <Entypo name="instagram" size={responsiveScreenFontSize(4)} color={colors.text} />
                            </View>
                            <View style={styles.icon}>
                                <Entypo name="linkedin-with-circle" size={responsiveScreenFontSize(4)} color={colors.text} />
                            </View>
                            <View style={styles.icon}>
                                <FontAwesome name="youtube" size={responsiveScreenFontSize(4)} color={colors.text} />
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <EasterEgg loading={isState} opacity={opacity} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: responsiveScreenHeight(50),
        width: responsiveScreenWidth(100),
        alignItems: 'center',
        overflow: 'hidden',
    },
    containerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: responsiveScreenWidth(5),
        paddingRight: responsiveScreenWidth(5),
        marginTop: responsiveScreenHeight(2),
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleNewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveScreenHeight(3),
        width: responsiveScreenWidth(100)
    },
    imageContainer: scrollA => ({
        resizeMode: 'cover',
        flex: 1,
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-responsiveScreenHeight(50), 0, responsiveScreenHeight(50), responsiveScreenHeight(50) + 1],
                    outputRange: [-responsiveScreenHeight(50) / 2, 0, responsiveScreenHeight(50) * 0.75, responsiveScreenHeight(50) * 0.75],
                })
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-responsiveScreenHeight(50), 0, responsiveScreenHeight(50), responsiveScreenHeight(50) + 2],
                    outputRange: [responsiveScreenHeight(2), 1, responsiveScreenHeight(1.5), responsiveScreenHeight(1.5)],
                })
            }
        ],
        height: responsiveScreenHeight(50),
        width: responsiveScreenWidth(100)
    }),
    imageRow: {
        marginTop: responsiveScreenHeight(1.5),
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    images: {
        width: responsiveScreenWidth(25),
        height: responsiveScreenHeight(12),
        borderRadius: responsiveScreenWidth(8),
        margin: responsiveScreenWidth(3),
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: responsiveScreenHeight(0.8),
        paddingBottom: responsiveScreenHeight(1.3),
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        marginTop: responsiveScreenHeight(0.5)
    },
    icon: {
        padding: responsiveScreenWidth(3),
    },
});