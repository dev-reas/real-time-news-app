import React from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, Text } from 'react-native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { useTheme } from '@react-navigation/native';
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

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

export function EditUserProfile(props) {
    const { colors } = useTheme();
    const user = React.useContext(UserContext);
    const [name, setName] = React.useState();
    const [designation, setDesignation] = React.useState();
    const [profilePic, setProfilePic] = React.useState();
    const [image, setImage] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [filename, setFilename] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [state, setState] = React.useState({ visible: false });
    const [error, setError] = React.useState();

    const ViewPost = async () => {
        let url = `${BASE_URL}/api/profile/` + user.user_id
        await axios.get(url, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }).then(({ data }) => {
            setName(data.name);
            setDesignation(data.designation);
            setProfilePic(data.profile_pic)
        })
    }

    React.useEffect(() => {
        ViewPost()
    }, [user.token])

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
        let auth = "Bearer " + user.token;
        const formData = new FormData();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append("name", name);
        formData.append("designation", designation);
        formData.append("user_id", user.user_id);
        formData.append("profile_pic", { type, uri: image, name: filename });
        await axios.post(`${BASE_URL}/api/update/${user.user_id}`, formData, {
            headers: {
                'Authorization': auth,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
        })
        props.navigation.pop();
    }

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
                    <Text>
                        You need to logout after this
                    </Text>
                    <Input
                        label={"Your name"}
                        value={name}
                        onChangeText={setName}
                        activeColor={colors.primary}
                        activeLabelColor={colors.primary}
                        containerStyle={{ marginVertical: responsiveScreenHeight(1) }}
                        width={responsiveScreenWidth(95)}
                        multiline={true}
                        numberOfLines={2}
                        onBlur={() => !name ? setError('Name is mandotory') : null}
                        error={error}
                        textInputStyle={{ fontSize: responsiveScreenFontSize(2.3) }}
                    />
                    <Input
                        label={'Your designation'}
                        value={designation}
                        onChangeText={setDesignation}
                        activeColor={colors.primary}
                        activeLabelColor={colors.primary}
                        textInputStyle={{ fontSize: responsiveScreenFontSize(2.3), color: colors.text }}
                        width={responsiveScreenWidth(95)}
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical={'top'}
                        onBlur={() => !designation ? setError('Designation is mandotory') : null}
                        error={error}
                    />
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
                        Edit your Profile
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
                                source={{ uri: profilePic }}
                            />
                            :
                            <Image
                                style={styles.ImageContainer}
                                source={data}
                            />
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: "100%",
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498DB'
    },
    ImageContainer: {
        height: responsiveScreenHeight(40),
        width: responsiveScreenWidth(100),
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'black'
    },
    icon: {
        marginTop: 16,
        marginLeft: 16,
    },
});