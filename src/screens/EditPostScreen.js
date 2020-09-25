import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import { useTheme } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../config';
import { Loading } from '../components/Loading';
import { Header } from '../components/Header';
import Input from 'react-native-reanimated-text-input';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function EditPostScreen(props) {
    const { colors } = useTheme();
    const { id } = props.route.params;
    const { token } = React.useContext(UserContext);
    const [healthId, setHealthId] = React.useState();
    const [politicalId, setPoliticalId] = React.useState();
    const [WorkEducId, setWorkEducId] = React.useState();
    const [techEntId, setTechEntId] = React.useState();
    const [othersId, setOthersId] = React.useState();
    const [post_title, setTitle] = React.useState();
    const [post_body, setBody] = React.useState();
    const [postPic, setPostPic] = React.useState();
    const [category_id, setCategoryId] = React.useState();
    const [image, setImage] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [filename, setFilename] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({ visible: false });
    const [error, setError] = React.useState();

    React.useEffect(() => {
        async function getData() {
            await axios.get(`${BASE_URL}/api/category`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(({ data }) => {
                setHealthId(data.array1.id);
                setPoliticalId(data.array2.id);
                setWorkEducId(data.array3.id);
                setTechEntId(data.array4.id);
                setOthersId(data.array5.id);
            })
        }
        getData()
    }, [token])

    const ViewPost = async () => {
        let url = `${BASE_URL}/api/edit/` + id
        await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
            setCategoryId(data.posts.category.id);
            setTitle(data.posts.post_title);
            setBody(data.posts.post_body);
            setPostPic(data.posts.post_image);
        })
    }

    let pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1]
        });
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setData(result);
            let localUri = result.uri;
            let filen = localUri.split('/').pop();
            setFilename(filen);
        }
    };

    const editPosting = async () => {
        setLoading(true);
        let auth = "Bearer " + token;
        const formData = new FormData();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append("post_title", post_title);
        formData.append("post_body", post_body);
        formData.append("category_id", category_id);
        formData.append("post_image", { type, uri: image, name: filename });
        await axios.post(`${BASE_URL}/api/editPost/${id}`, formData, {
            headers: {
                'Authorization': auth,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
        })
        props.navigation.pop();
    }

    React.useEffect(() => {
        ViewPost()
    }, [token])

    const openConfirm = (show) => {
        setState({ showConfirm: show });
    };

    const optionNo = () => {
        openConfirm(false);
    };

    const optionYes = () => {
        openConfirm(false);
        setTimeout(() => {
            props.navigation.pop();
        }, 300);
    };

    return (
        <>
            <Header name={'close-box'} onPress={() => openConfirm(true)} />
            <ScrollView>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Input
                        label={"Your news title here"}
                        value={post_title}
                        onChangeText={setTitle}
                        activeColor={colors.primary}
                        activeLabelColor={colors.primary}
                        containerStyle={{ marginVertical: responsiveScreenHeight(1) }}
                        width={responsiveScreenWidth(95)}
                        multiline={true}
                        numberOfLines={2}
                        onBlur={() => !post_title ? setError('Post title is mandotory') : null}
                        error={error}
                        textInputStyle={{ fontSize: responsiveScreenFontSize(2.3), color: colors.text }}
                    />
                    <Input
                        label={"Your news content here"}
                        value={post_body}
                        onChangeText={setBody}
                        activeColor={colors.primary}
                        activeLabelColor={colors.primary}
                        textInputStyle={{ fontSize: responsiveScreenFontSize(2.3), color: colors.text }}
                        width={responsiveScreenWidth(95)}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical={'top'}
                        onBlur={() => !post_body ? setError('Post body is mandotory') : null}
                        error={error}
                    />
                    <View style={{
                        marginTop: responsiveScreenHeight(2),
                        marginBottom: responsiveScreenHeight(2)
                    }}>
                        <Picker
                            selectedValue={category_id}
                            style={{
                                height: responsiveScreenHeight(2.5),
                                width: responsiveScreenWidth(95),
                                color: colors.text
                            }}
                            onValueChange={(itemValue) => setCategoryId(itemValue)}
                        >
                            <Picker.Item label="Categories" value="" />
                            <Picker.Item label="Health" value={healthId} />
                            <Picker.Item label="Political" value={politicalId} />
                            <Picker.Item label="Work and Education" value={WorkEducId} />
                            <Picker.Item label="Technology and Entertainment" value={techEntId} />
                            <Picker.Item label="Others" value={othersId} />
                        </Picker>
                    </View>

                    <View style={{ marginTop: responsiveScreenHeight(1) }}>
                        <Button icon={({ color }) => (
                            <Entypo name="images" size={responsiveScreenFontSize(2)} color={color} />)}
                            mode="outlined" onPress={pickImage}
                            style={{
                                color: colors.primary,
                                fontSize: responsiveScreenFontSize(5),
                                width: responsiveScreenWidth(100),
                                height: responsiveScreenHeight(4.5),
                                borderColor: colors.borderColor
                            }}
                            labelStyle={{ color: colors.primary }} >
                            Show Gallery
                        </Button>
                    </View>

                    <Button mode="contained"
                        labelStyle={{
                            fontSize: responsiveScreenFontSize(2),
                            fontFamily: 'serif'
                        }}
                        style={{
                            marginTop: responsiveScreenHeight(2),
                            marginBottom: responsiveScreenHeight(1),
                            width: responsiveScreenWidth(95),
                            height: responsiveScreenHeight(8),
                            borderRadius: responsiveScreenHeight(8) / 2,
                            justifyContent: 'center',
                            backgroundColor: colors.primary
                        }}
                        onPress={editPosting}>
                        Post Now
                    </Button>

                </View>
                <View style={{
                    alignItems: 'center', marginTop: responsiveScreenHeight(2),
                    marginBottom: responsiveScreenHeight(0.3)
                }}>
                    {
                        data == null
                            ?
                            <Image
                                style={styles.ImageContainer}
                                source={{ uri: postPic }}
                            />
                            :
                            <Image style={styles.ImageContainer} source={data} />
                    }
                </View>
            </ScrollView>
            <Loading loading={loading} />
            <ConfirmDialog
                message="Discard the following changes?"
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
                    onPress: optionYes,
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
    ImageContainer: {
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(100) / 3,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'black'
    },
});