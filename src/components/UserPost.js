import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { Avatar, Caption, Headline, Button, IconButton, Paragraph } from 'react-native-paper';
import { MaterialIcons, AntDesign, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import { UserContext } from '../Context/UserContext';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function UserPost({ userPost, onPress, editOnPress, deleteOnPress, LikePress, DisLikePress }) {
    const safeArea = useSafeAreaInsets();
    const user = React.useContext(UserContext);
    const { colors } = useTheme();
    return (
        <View style={{
            marginTop: 0,
            marginVertical: 16,
            width: responsiveScreenWidth(100),
            backgroundColor: colors.background,
            borderTopWidth: 3,
            borderColor: colors.primary,
            shadowRadius: 4,
            shadowColor: colors.shadow,
            shadowOffset: {
                height: 160,
                width: 10,
            },
            elevation: 5,
        }}>
            <View style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                paddingLeft: safeArea.left + responsiveScreenWidth(2),
                marginBottom: responsiveScreenHeight(2),
                marginTop: responsiveScreenHeight(2)
            }}>
                <Avatar.Image size={responsiveScreenWidth(15)}
                    source={{ uri: userPost.profile_pic }}
                    style={{ backgroundColor: 'transparent' }} />
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    width: responsiveScreenWidth(85), justifyContent: 'space-between',
                    marginLeft: responsiveScreenWidth(2)
                }}>
                    <View style={{
                        width: responsiveScreenWidth(50), paddingRight: safeArea.right + responsiveScreenWidth(3)
                    }}>
                        <Headline style={{ textAlign: 'justify', fontSize: responsiveScreenFontSize(2.3), color: colors.text }}>{userPost.name}</Headline>
                        <Caption style={{
                            fontSize: responsiveScreenFontSize(1.3),
                            color: colors.text,
                            marginTop: responsiveScreenHeight(-1)
                        }}>
                            {userPost.designation}
                        </Caption >
                    </View>
                    {
                        userPost.user_id == user.user_id
                            ?
                            <View style={{
                                flexDirection: 'row',
                                marginRight: responsiveScreenWidth(10),
                            }}>

                                <TouchableOpacity onPress={editOnPress}>
                                    <AntDesign name="edit" size={responsiveScreenFontSize(3.5)} color="black" />
                                </TouchableOpacity>
                                <View style={{ marginLeft: responsiveScreenWidth(3), marginRight: responsiveScreenWidth(3) }} />
                                <TouchableOpacity onPress={deleteOnPress}>
                                    <MaterialIcons name="delete" size={responsiveScreenFontSize(3.5)} color="black" />
                                </TouchableOpacity>
                            </View>
                            :
                            <View />
                    }

                </View>
            </View>

            <View style={{
                marginLeft: responsiveScreenWidth(3),
                marginBottom: responsiveScreenHeight(0.5)
            }}>
                <Text style={[styles.name, { color: colors.text }]}>{userPost.post_title}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={onPress}>
                    <ImageBackground source={{ uri: userPost.post_image }}
                        blurRadius={5} style={styles.thumbBg}>
                        <Image
                            style={styles.thumb}
                            source={{ uri: userPost.post_image }}
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
                        {userPost.updated_at}
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
                        {userPost.category}
                    </Caption>
                </View>
                <View style={{
                    marginLeft: responsiveScreenWidth(3),
                    marginRight: responsiveScreenWidth(3)
                }}>
                    <Paragraph
                        ellipsizeMode={'tail'}
                        numberOfLines={2}
                        style={[styles.price, { color: colors.text }]}>
                        {userPost.post_body}
                    </Paragraph>
                </View>
                <Button icon={({ color }) => (
                    <Entypo name="eye" size={responsiveScreenFontSize(3)} color={colors.borderColor} />)}
                    mode="outlined" onPress={onPress}
                    style={{
                        color: colors.primary,
                        height: responsiveScreenHeight(4.8),
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
                            icon={() => (
                                <FontAwesome name="arrow-up" size={responsiveScreenFontSize(2.8)} color="#57cc99" />
                            )}
                            onPress={LikePress}
                        />
                        <Text style={{ fontSize: responsiveScreenFontSize(2.8), color: '#57cc99' }}>
                            {userPost.LikeCount}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            icon={() => (
                                <FontAwesome name="arrow-down" size={responsiveScreenFontSize(2.8)} color="#ee6352" />
                            )}
                            onPress={DisLikePress}
                        />
                        <Text style={{ fontSize: responsiveScreenFontSize(2.8), color: "#ee6352" }}>
                            {userPost.DisLikeCount}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            icon={() => (
                                <Ionicons name="ios-chatbubbles" size={responsiveScreenFontSize(2.8)} color={colors.borderColor} />
                            )}
                            onPress={onPress}
                        />
                        <Text style={{ fontSize: responsiveScreenFontSize(2.8), color: colors.borderColor }}>
                            {userPost.commentCount}
                        </Text>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 0,
        marginVertical: 16,
    },
    thumb: {
        height: responsiveScreenHeight(35),
        width: responsiveScreenWidth(80),
        resizeMode: 'cover'
    },
    name: {
        fontSize: responsiveScreenFontSize(2.8),
        fontWeight: '900',
    },
    price: {
        fontSize: responsiveScreenFontSize(2),
        fontWeight: '600',
        marginBottom: responsiveScreenHeight(1),
        textAlign: 'justify'
    },
    thumbBg: {
        height: responsiveScreenHeight(35),
        width: responsiveScreenWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
