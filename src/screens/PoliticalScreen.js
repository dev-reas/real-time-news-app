import React from 'react';
import { StyleSheet, FlatList, RefreshControl, View, Text, ScrollView } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { CategoryPost } from '../components/CategoriesPost';
import { FlatlistHeader } from '../components/FlatlistHeader';
import { Header } from '../components/Header';
import { BASE_URL } from '../config';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Loading } from '../components/Loading';
import { sleep } from '../utils/sleep';
import { MyActionButton } from '../components/MyActionButton';
import {
    responsiveScreenHeight,
    responsiveScreenFontSize,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

export function PoliticalScreen(props) {
    const { colors } = useTheme();
    const safeArea = useSafeAreaInsets();
    const [categoriesPosts, setCategoriesPosts] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const { token } = React.useContext(UserContext);
    const [loadindIndicator, setLoadingIndicator] = React.useState(false);

    const OpenMenu = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const getPost = async () => {
        await axios.get(`${BASE_URL}/api/category/2`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
            setCategoriesPosts(data);
            setLoading(false);
        })
    }
    const ViewPost = (id) => {
        props.navigation.navigate('View Post', {
            id,
        });
    }

    const UserHandler = async (id) => {
        props.navigation.navigate('Visit Profile', {
            id,
        });
    }

    const likeButton = async (id) => {
        setLoadingIndicator(true);
        let auth = "Bearer " + token;
        let url = `${BASE_URL}/api/post-like/` + id;
        await axios(url, {
            method: 'post',
            headers: {
                Authorization: auth,
            }
        }).then(() => {
            getPost();
            sleep(500).then(() => {
                setLoadingIndicator(false);
            })
        })
    }

    const dislikeButton = async (id) => {
        setLoadingIndicator(true);
        let auth = "Bearer " + token;
        let url = `${BASE_URL}/api/post-dislike/` + id;
        await axios(url, {
            method: 'post',
            headers: {
                Authorization: auth,
            }
        }).then(() => {
            getPost();
            sleep(500).then(() => {
                setLoadingIndicator(false);
            })
        })
    }

    React.useEffect(() => {
        getPost()
    }, [token])

    function renderPost({ item: categoryPost }) {
        return (
            <SimpleAnimation delay={500} friction={7} useNativeDriver={true} fade
                duration={500} staticType={'bounce'}>
                <CategoryPost
                    categoryPost={categoryPost}
                    onPress={() => ViewPost(categoryPost.id)}
                    LikePress={() => likeButton(categoryPost.id)}
                    DisLikePress={() => dislikeButton(categoryPost.id)}
                    UserPress={() => UserHandler(categoryPost.user_id)}
                />
            </SimpleAnimation>
        );
    }
    return (
        <>
            <Header name={'menu'} onPress={OpenMenu} />
            <ScrollView nestedScrollEnabled={true}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getPost()} />}>
                <FlatlistHeader title={'Political Section'} />
                {
                    categoriesPosts == ''
                        ?
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: responsiveScreenHeight(2),
                                width: responsiveScreenWidth(90),
                            }}>
                                <Text style={{ textAlign: 'justify', color: colors.text, fontSize: responsiveScreenFontSize(2) }}>No post yet in Political.</Text>
                                <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(2) }}>Be the one to post first.</Text>
                            </View>
                        </View>
                        :
                        <FlatList
                            keyExtractor={item => { item.id }}
                            contentContainerStyle={{
                                marginBottom: responsiveScreenHeight(2),
                                paddingBottom: safeArea.bottom
                            }}
                            data={categoriesPosts}
                            renderItem={renderPost}
                        />
                }
            </ScrollView>
            <MyActionButton
                AboutPressHandler={() => { props.navigation.push('About'); }}
                ProfilePressHandler={() => { props.navigation.push('Profile'); }}
                PostPressHandler={() => { props.navigation.push('Post'); }} />
            <Loading loading={loadindIndicator} />
        </>
    );
}

const styles = StyleSheet.create({

});