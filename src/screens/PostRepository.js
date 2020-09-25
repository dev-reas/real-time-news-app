import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { CategoryPost } from '../components/CategoriesPost';
import { Header } from '../components/Header';
import { BASE_URL } from '../config';
import { SimpleAnimation } from 'react-native-simple-animations';
import { sleep } from '../utils/sleep';
import { Loading } from '../components/Loading';
import { MyActionButton } from '../components/MyActionButton';
import {
    responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function PostRepository(props) {
    const safeArea = useSafeAreaInsets();
    const { token } = React.useContext(UserContext);
    const [postRepo, setPostRepo] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [loadindIndicator, setLoadingIndicator] = React.useState(false);

    const OpenMenu = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const getPost = async () => {
        await axios.get(`${BASE_URL}/api/post-repository`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
            setPostRepo(data)
            setLoading(false);
        })
    }

    const ViewPost = (id) => {
        props.navigation.navigate('View Post', {
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

    const UserHandler = async (id) => {
        props.navigation.navigate('Visit Profile', {
            id,
        });
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
            <FlatList
                keyExtractor={item => { item.id }}
                windowSize={5}
                maxToRenderPerBatch={4}
                contentContainerStyle={{
                    marginBottom: responsiveScreenHeight(2),
                    paddingBottom: safeArea.bottom
                }}
                data={postRepo}
                renderItem={renderPost}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getPost()} />}
            />
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