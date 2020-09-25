import React from 'react';
import {
    Image, StyleSheet, Text,
    View, TouchableOpacity, ImageBackground
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Caption, Headline, IconButton, Button, Paragraph } from 'react-native-paper';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CategoryPost({ categoryPost, onPress, LikePress, DisLikePress, UserPress }) {
    const { colors } = useTheme();
    const safeArea = useSafeAreaInsets();

    return (
        <View key={categoryPost.id}
            style={{
                marginTop: responsiveScreenHeight(0),
                marginVertical: responsiveScreenHeight(3),
                width: responsiveScreenWidth(100),
                backgroundColor: colors.background,
                borderTopWidth: responsiveScreenHeight(0.5),
                borderColor: colors.primary,
                shadowRadius: 4,
                shadowColor: colors.shadow,
                shadowOffset: {
                    height: responsiveScreenHeight(5),
                    width: responsiveScreenWidth(1),
                },
                elevation: 5,
            }}>
            <View style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                paddingLeft: safeArea.left + responsiveScreenWidth(3),
                marginBottom: responsiveScreenHeight(2),
                marginTop: responsiveScreenHeight(2)
            }}>
                <Avatar.Image size={responsiveScreenWidth(15)}
                    source={{ uri: categoryPost.profile_pic }}
                    style={{ backgroundColor: 'transparent' }} />
                <View style={{
                    paddingLeft: safeArea.left + responsiveScreenWidth(3),
                    width: responsiveScreenWidth(70), paddingRight: safeArea.right + responsiveScreenWidth(3)
                }}>
                    <View>
                        <View>
                            <TouchableOpacity onPress={UserPress}>
                                <Headline style={{ textAlign: 'justify', fontSize: responsiveScreenFontSize(2.5), color: colors.primary }}
                                    key={categoryPost.user_id}>
                                    {categoryPost.name}
                                </Headline>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: responsiveScreenHeight(-1) }}>
                            <Caption style={{ fontSize: responsiveScreenFontSize(1.4) }}>{categoryPost.designation}</Caption>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.name, { color: colors.text }]}>{categoryPost.post_title}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={onPress}>
                    <ImageBackground
                        source={{ uri: categoryPost.post_image }}
                        blurRadius={5} style={styles.thumbBg}>
                        <Image
                            style={styles.thumb}
                            source={{ uri: categoryPost.post_image }}
                        />
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: responsiveScreenWidth(3),
                    paddingLeft: safeArea.left
                }}>
                    <Caption style={{
                        fontSize: responsiveScreenFontSize(1.3),
                        color: colors.text
                    }}>
                        {categoryPost.updated_at}
                    </Caption>
                    <Caption style={{
                        fontSize: responsiveScreenFontSize(1.3),
                        marginLeft: responsiveScreenWidth(1),
                        marginRight: responsiveScreenWidth(1),
                        color: colors.text
                    }}>
                        |
                        </Caption>
                    <Caption style={{
                        fontSize: responsiveScreenFontSize(1.3),
                        color: colors.text
                    }}>
                        {categoryPost.category}
                    </Caption>
                </View>
            </View>
            <View style={{
                marginLeft: responsiveScreenWidth(3),
                marginRight: responsiveScreenWidth(3),
            }}>
                <Paragraph
                    ellipsizeMode={'tail'}
                    numberOfLines={2}
                    style={[styles.price, { color: colors.text }]}>
                    {categoryPost.post_body}
                </Paragraph>
            </View>
            <Button icon={() => (
                <Entypo name="eye" size={responsiveScreenFontSize(3)} color={colors.borderColor} />)}
                mode="outlined" onPress={onPress}
                style={{
                    color: colors.primary,
                    height: responsiveScreenHeight(4.4),
                    width: responsiveScreenWidth(100)
                }}
                labelStyle={{ color: colors.primary, fontSize: responsiveScreenFontSize(2) }} >
                Read full article
            </Button>
            <View style={{
                width: responsiveScreenWidth(100),
                justifyContent: 'space-evenly',
                flexDirection: 'row'
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        icon={({ color }) => (
                            <FontAwesome name="arrow-up" size={responsiveScreenFontSize(2.8)} color="#57cc99" />
                        )}
                        onPress={LikePress}
                    />
                    <Text style={{ fontSize: responsiveScreenFontSize(2.8), color: '#57cc99' }}>
                        {categoryPost.LikeCount}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        icon={({ color }) => (
                            <FontAwesome name="arrow-down" size={responsiveScreenFontSize(2.8)} color="#ee6352" />
                        )}
                        onPress={DisLikePress}
                    />
                    <Text style={{ fontSize: responsiveScreenFontSize(2.8), color: "#ee6352" }}>
                        {categoryPost.DisLikeCount}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton
                        icon={({ color }) => (
                            <Ionicons name="ios-chatbubbles" size={responsiveScreenFontSize(2.8)} color={colors.borderColor} />
                        )}
                        onPress={onPress}
                    />
                    <Text style={{ fontSize: responsiveScreenFontSize(2.8), color: colors.borderColor }}>
                        {categoryPost.commentCount}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    thumb: {
        height: responsiveScreenHeight(35),
        width: responsiveScreenWidth(80),
        resizeMode: 'cover'
    },
    thumbBg: {
        height: responsiveScreenHeight(35),
        width: responsiveScreenWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        marginLeft: responsiveScreenWidth(3),
        marginBottom: responsiveScreenHeight(0.5)
    },
    name: {
        fontSize: responsiveScreenFontSize(2.4),
        fontWeight: 'bold',
    },
    price: {
        fontSize: responsiveScreenFontSize(2),
        fontWeight: '600',
        marginBottom: responsiveScreenHeight(1),
        textAlign: 'justify'
    },
    postman: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: responsiveScreenWidth(3),
        marginBottom: responsiveScreenHeight(2),
        marginTop: responsiveScreenHeight(2)
    },
});
