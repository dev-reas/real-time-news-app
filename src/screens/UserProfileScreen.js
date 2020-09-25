import React from 'react';
import { UserContext } from '../Context/UserContext';
import { Text, View, StyleSheet, Image, ScrollView, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Title, Subheading } from 'react-native-paper';
import axios from 'axios';
import { Header } from '../components/Header';
import { BASE_URL } from '../config';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserPost } from '../components/UserPost';
import { } from 'react-native';
import { Loading } from '../components/Loading';
import { sleep } from '../utils/sleep';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function UserProfileScreen(props) {
  const { colors } = useTheme();
  const [userPosts, setUserPost] = React.useState();
  const { token } = React.useContext(UserContext);
  const user = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({ visible: false });
  const [postId, setPostId] = React.useState();
  const [loadindIndicator, setLoadingIndicator] = React.useState(false);

  const OpenMenu = () => {
    props.navigation.pop();
  }

  const getPost = async () => {
    await axios.get(`${BASE_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setUserPost(data.posts);
      setLoading(false);
    })
  }

  const openConfirm = (show, id) => {
    setState({ showConfirm: show });
    setPostId(id);
  };

  const optionNo = () => {
    openConfirm(false);
  };

  const deletePost = async () => {
    let auth = "Bearer " + token;
    let url = `${BASE_URL}/api/deletePost/` + postId;
    await fetch(url, {
      method: 'post',
      headers: {
        Authorization: auth,
      }
    }).then((data) => {
      getPost();
      openConfirm(false);
    })
  }

  const ViewPost = (id) => {
    props.navigation.navigate('View Post', {
      id,
    });
  }

  const EditPost = (id) => {
    props.navigation.navigate('Edit Post', {
      id,
    });
  }

  const OpenEditProfile = (id) => {
    props.navigation.navigate('Edit Profile', {
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
    }).then(({ data }) => {
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
    }).then(({ data }) => {
      getPost();
      sleep(500).then(() => {
        setLoadingIndicator(false);
      })
    })
  }

  React.useEffect(() => {
    getPost();
  }, [token])

  function renderPost({ item: userPost }) {
    return (
      <UserPost
        userPost={userPost}
        onPress={() => ViewPost(userPost.id)}
        editOnPress={() => EditPost(userPost.id)}
        deleteOnPress={() => openConfirm(true, userPost.id)}
        LikePress={() => likeButton(userPost.id)}
        DisLikePress={() => dislikeButton(userPost.id)}
      />
    );
  }

  return (
    <>
      <Header name={'close-box'} onPress={OpenMenu} />
      <ScrollView nestedScrollEnabled={true}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => getPost()} />} >
        <Image source={{ uri: user.profile_pic }}
          blurRadius={5} style={styles.imageContainer} />
        <View style={{
          backgroundColor: colors.background,
          width: responsiveScreenWidth(100),
          marginTop: responsiveScreenHeight(-15),
          borderTopLeftRadius: responsiveScreenHeight(5),
          borderTopRightRadius: responsiveScreenHeight(5),
          marginBottom: responsiveScreenHeight(1),
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: responsiveScreenWidth(35),
              height: responsiveScreenHeight(16),
              borderRadius: responsiveScreenWidth(35) / 2,
              borderWidth: responsiveScreenFontSize(0.2),
              borderColor: colors.borderColor,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveScreenHeight(-4)
            }}>
              <Image source={{ uri: user.profile_pic }}
                style={styles.avataImage}
              />
            </View>
            <View style={styles.icon}>
              <TouchableOpacity onPress={OpenEditProfile}>
                <MaterialCommunityIcons name="account-edit"
                  size={responsiveScreenFontSize(3)}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Title style={{
            color: colors.text,
            fontSize: responsiveScreenFontSize(2.8),
            fontFamily: 'sans-serif'
          }}>{user.first_name} {user.last_name}</Title>
          <Subheading style={{
            color: colors.primary,
            fontSize: responsiveScreenFontSize(2),
          }}>User Alias: {user.profile_name}</Subheading>
          <Subheading style={{
            color: colors.text,
            fontSize: responsiveScreenFontSize(2),
          }}>User Designation: {user.designation}</Subheading>
        </View>
        {
          userPosts == ''
            ?
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: responsiveScreenHeight(2),
            }}>
              <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(2) }}>The user dont have any articles yet</Text>
            </View>
            :
            <FlatList
              keyExtractor={item => { item.id }}
              contentContainerStyle={styles.productsListContainer}
              data={userPosts}
              renderItem={renderPost}
            />
        }

      </ScrollView>
      <Loading loading={loadindIndicator} />
      <ConfirmDialog
        message="Do you want to delete this post?"
        messageStyle={{
          fontSize: responsiveScreenFontSize(2)
        }}
        onTouchOutside={() => openConfirm(false)}
        visible={state.showConfirm}
        animationType={'fade'}
        negativeButton={{
          title: 'NO',
          onPress: optionNo,
          titleStyle: {
            color: colors.primary,
            colorDisabled: 'aqua',
            fontSize: responsiveScreenFontSize(1.8)
          },
          style: {
            backgroundColor: 'transparent',
            backgroundColorDisabled: 'transparent',
          },
        }}
        positiveButton={{
          title: 'YES',
          onPress: deletePost,
          titleStyle: {
            color: colors.primary,
            colorDisabled: 'aqua',
            fontSize: responsiveScreenFontSize(1.8)
          },
          style: {
            backgroundColor: 'transparent',
            backgroundColorDisabled: 'transparent',
          },
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    resizeMode: 'cover',
    height: responsiveScreenHeight(30),
    width: responsiveScreenWidth(100),
    justifyContent: 'flex-end'
  },
  avataImage: {
    width: responsiveScreenWidth(32),
    height: responsiveScreenHeight(15),
    borderRadius: responsiveScreenWidth(32) / 2,
  },

  icon: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: responsiveScreenWidth(50),
    marginTop: responsiveScreenHeight(2),
  },
  productsListContainer: {
    marginBottom: responsiveScreenHeight(5),
  }
});