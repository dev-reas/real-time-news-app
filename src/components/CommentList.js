import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, Caption, Paragraph } from 'react-native-paper';
import { SimpleAnimation } from 'react-native-simple-animations';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function CommentList({ commentList }) {
    const { colors } = useTheme();
    return (
        <SimpleAnimation delay={500} useNativeDriver={true} friction={3} distance={20}
            duration={1000} direction={'up'} movementType={'spring'}>
            <View style={{ flexDirection: 'row', }}>
                <View style={styles.card}>
                    <View style={styles.postman}>
                        <Avatar.Image size={responsiveScreenWidth(9)} source={{ uri: commentList.profile_pic }} />
                        <View style={styles.postmanText}>
                            <View style={{
                                flexDirection: 'row', width: responsiveScreenWidth(80),
                            }}>
                                <Text style={{
                                    fontSize: responsiveScreenFontSize(1.8),
                                    fontWeight: 'bold', color: colors.text,
                                    textAlign: 'justify'
                                }}>
                                    {commentList.name} <Paragraph style={{
                                        fontSize: responsiveScreenFontSize(1.5),
                                        fontWeight: '200', color: colors.text, textAlign: 'justify'
                                    }}>
                                        {commentList.comment}
                                    </Paragraph>
                                </Text>
                            </View>
                            <Caption style={{ fontSize: responsiveScreenFontSize(1.4), color: colors.text }}>
                                {commentList.updated_at}
                            </Caption >
                        </View>
                    </View>
                </View>
            </View>
        </SimpleAnimation>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: responsiveScreenHeight(1),
        width: responsiveScreenWidth(95),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: responsiveScreenWidth(2),
        marginRight: responsiveScreenWidth(2)
    },
    postman: {
        flexDirection: 'row',
    },
    postmanText: {
        flexDirection: 'column',
        marginLeft: responsiveScreenWidth(3),
        marginTop: responsiveScreenHeight(-1),
    },
});
