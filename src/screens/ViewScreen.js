import React from 'react';
import {
    Text, View, StyleSheet,
    Animated, TouchableOpacity, Image, 
    RefreshControl, ScrollView, FlatList, ImageBackground
} from 'react-native';
import axios from 'axios';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../config';
import { UserContext } from '../Context/UserContext';
import { Avatar, Title, Caption, Headline, Paragraph, IconButton } from 'react-native-paper';
import { CommentList } from '../components/CommentList';
import { useTheme } from '@react-navigation/native';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import Input from 'react-native-reanimated-text-input';
import { sleep } from '../utils/sleep';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function ViewScreen(props) {
    const { colors } = useTheme();
    const { id } = props.route.params;
    const { token } = React.useContext(UserContext);
    const [name, setName] = React.useState();
    const [profilePic, setProfilePic] = React.useState();
    const [postTitle, setPostTitle] = React.useState();
    const [designation, setDesignation] = React.useState();
    const [postBody, setPostBody] = React.useState();
    const [category, setCategory] = React.useState();
    const [postPic, setPostPic] = React.useState();
    const [postTime, setPostTime] = React.useState();
    const [postComment, setPostComment] = React.useState();
    const [comment, setComment] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [loadingIndicator, setLoadingIndicator] = React.useState(false);
    const [likeCtr, setLike] = React.useState();
    const [dislikeCtr, setDislike] = React.useState();
    const [commentCtr, setCommentCtr] = React.useState();

    const ViewPost = async () => {
        let url = `${BASE_URL}/api/post-view/` + id
        await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
            setPostTitle(data.post.post_title);
            setPostBody(data.post.post_body);
            setPostPic(data.post.post_image);
            setPostTime(data.post_time);
            setName(data.profile.name);
            setProfilePic(data.profile.profile_pic);
            setDesignation(data.profile.designation);
            setCategory(data.category);
            setCommentCtr(data.commentCounts);
            setPostComment(data.comments);
            setLoading(false);
            setLoadingIndicator(false);
            setComment('');
            setLike(data.likeCounts);
            setDislike(data.DislikeCounts);
        })
    }

    const likeButton = async () => {
        setLoadingIndicator(true);
        let auth = "Bearer " + token;
        let url = `${BASE_URL}/api/post-like/` + id;
        await axios(url, {
            method: 'post',
            headers: {
                Authorization: auth,
            }
        }).then(({ data }) => {
            ViewPost();
            sleep(500).then(() => {
                setLoadingIndicator(false);
            })
        })
    }

    const dislikeButton = async () => {
        setLoadingIndicator(true);
        let auth = "Bearer " + token;
        let url = `${BASE_URL}/api/post-dislike/` + id;
        await axios(url, {
            method: 'post',
            headers: {
                Authorization: auth,
            }
        }).then(({ data }) => {
            ViewPost();
            sleep(500).then(() => {
                setLoadingIndicator(false);
            })
        })
    }

    React.useEffect(() => {
        ViewPost()
    }, [token])

    const postingComment = async () => {
        setLoadingIndicator(true)
        let auth = "Bearer " + token;
        let url = `${BASE_URL}/api/post-comment/` + id
        const formData = new FormData();
        formData.append("comment", comment);
        await axios.post(url, formData, {
            headers: {
                'Authorization': auth
            }
        }).then((response) => {
            ViewPost()
        })
    }

    function renderComment({ item: commentList }) {
        return (
            <CommentList
                commentList={commentList}
            />
        );
    }

    const OpenMenu = () => {
        props.navigation.pop();
    }

    return (
        <>
            <Header name={'close-box'} onPress={OpenMenu} />
            <ScrollView nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={loading}
                    onRefresh={() => ViewPost()} />}
            >
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    width: responsiveScreenWidth(100), justifyContent: 'space-between'
                }}>
                    <View style={styles.postman}>
                        <Avatar.Image size={responsiveScreenHeight(6.8)} source={{ uri: profilePic }} />
                        <View style={styles.postmanText}>
                            <Headline style={{ fontSize: responsiveScreenFontSize(2.3), color: colors.text }}>{name}</Headline>
                            <Caption style={{
                                fontSize: responsiveScreenFontSize(1.5),
                                marginTop: responsiveScreenHeight(-0.5), color: colors.text
                            }}>
                                {designation}
                            </Caption >
                        </View>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Title style={[styles.postTitle, { color: colors.text }]}>
                        {postTitle}
                    </Title>
                </View>
                <View>
                    <ImageBackground source={{ uri: postPic }}
                        blurRadius={5} style={styles.thumbBg}>
                        <Image
                            style={styles.thumb}
                            source={{ uri: postPic }}
                        />
                    </ImageBackground>
                </View>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginLeft: responsiveScreenWidth(3)
                    }}>
                        <Caption style={{
                            fontSize: responsiveScreenFontSize(1.3),
                            color: colors.text
                        }}>
                            {postTime}
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
                            {category}
                        </Caption>
                    </View>
                </View>
                <View style={{ marginLeft: responsiveScreenWidth(3), marginRight: responsiveScreenWidth(3) }}>
                    <Text
                        style={[styles.price, { color: colors.text }]}>
                        {postBody}
                    </Text>
                </View>
                <View style={{
                    width: responsiveScreenWidth(100),
                    justifyContent: 'space-evenly',
                    flexDirection: 'row'
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            icon={({ color }) => (
                                <FontAwesome name="arrow-up" size={responsiveScreenFontSize(3)} color="#57cc99" />
                            )}
                            onPress={likeButton}
                        />
                        <Text style={{ fontSize: responsiveScreenFontSize(3), color: '#57cc99' }}>
                            {likeCtr}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            icon={({ color }) => (
                                <FontAwesome name="arrow-down" size={responsiveScreenFontSize(3)} color="#ee6352" />
                            )}
                            color={colors.primary}
                            size={26}
                            onPress={dislikeButton}
                        />
                        <Text style={{ fontSize: responsiveScreenFontSize(3), color: '#ee6352' }}>
                            {dislikeCtr}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton
                            icon={() => (
                                <Ionicons name="ios-chatbubbles" size={responsiveScreenFontSize(3)} color={colors.borderColor} />
                            )}
                        />
                        <Text style={{ fontSize: responsiveScreenFontSize(3), color: colors.borderColor }}>
                            {commentCtr}
                        </Text>
                    </View>
                </View>
                <View style={styles.commentArea}>
                    <View style={styles.commentInput}>
                        <Input
                            label={"Your comment here"}
                            value={comment}
                            onChangeText={setComment}
                            activeColor={colors.primary}
                            activeLabelColor={colors.primary}
                            containerStyle={{ marginLeft: responsiveScreenWidth(3) }}
                            textInputStyle={{ fontSize: responsiveScreenFontSize(2), color: colors.text }}
                            multiline={true}
                            numberOfLines={2}
                        />
                    </View>
                    <View style={styles.commentButton}>
                        <TouchableOpacity onPress={postingComment}>
                            <View style={[styles.button, styles.menu]}>
                                <MaterialIcons name="send" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.commentSection}>
                    {
                        postComment == 'No comment yet'
                            ?
                            <View />
                            :
                            <FlatList
                                keyExtractor={item => { item.id }}
                                contentContainerStyle={styles.productsListContainer}
                                data={postComment}
                                renderItem={renderComment}
                            />
                    }
                </View>
            </ScrollView>
            <Loading loading={loadingIndicator} />
        </>
    );
}

const styles = StyleSheet.create({
    postman: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginLeft: responsiveScreenWidth(2),
        marginBottom: responsiveScreenHeight(1),
        marginTop: responsiveScreenHeight(1)
    },
    postmanText: {
        marginLeft: responsiveScreenWidth(3)
    },
    infoContainer: {
        marginLeft: responsiveScreenWidth(3),
        marginBottom: responsiveScreenHeight(0.5)
    },
    thumb: {
        height: responsiveScreenHeight(40),
        width: responsiveScreenWidth(85),
        resizeMode: 'cover'
    },
    commentArea: {
        flexDirection: 'row',
    },
    commentInput: {
        width: responsiveScreenWidth(80),
    },
    price: {
        fontSize: responsiveScreenFontSize(2),
        fontWeight: '600',
        marginBottom: responsiveScreenHeight(1),
        textAlign: 'justify'
    },
    commentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveScreenWidth(18),
        marginLeft: responsiveScreenWidth(1)
    },
    button: {
        width: responsiveScreenWidth(100) / 7,
        height: responsiveScreenWidth(100) / 7,
        borderRadius: (responsiveScreenWidth(100) / 7) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        backgroundColor: 'black',
    },
    commentSection: {
        marginTop: responsiveScreenHeight(1),
        marginBottom: responsiveScreenHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbBg: {
        height: responsiveScreenHeight(40),
        width: responsiveScreenWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
})