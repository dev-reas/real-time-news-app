import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    Avatar, Title, Caption, Drawer,
    Text, TouchableRipple, Switch
} from 'react-native-paper';
import { IconButton } from './IconButton';
import { AuthContext } from '../Context/AuthContext';
import { UserContext } from '../Context/UserContext';
import { ThemeContext } from '../Context/ThemeContext';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function DrawerContent(props, { navigation }) {
    const { colors } = useTheme();
    const safeArea = useSafeAreaInsets();
    const switchTheme = React.useContext(ThemeContext);
    const user = React.useContext(UserContext);

    const { logout } = React.useContext(AuthContext);
    const paperTheme = useTheme();
    return (
        <>
            <View style={{
                flex: 1, backgroundColor: colors.background,
                paddingTop: safeArea.top,
            }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.DrawerContent}>
                        <View style={{ paddingLeft: safeArea.left + responsiveScreenWidth(3) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{
                                    width: responsiveScreenWidth(17.5),
                                    height: responsiveScreenHeight(8), borderColor: colors.borderColor,
                                    borderWidth: 1, borderRadius: responsiveScreenWidth(17.5) / 2,
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Avatar.Image
                                        source={{ uri: user.profile_pic }}
                                        size={responsiveScreenHeight(7.3)}
                                        style={{backgroundColor: 'transparent'}}
                                    />
                                </View>
                                <View style={{
                                    marginLeft: responsiveScreenWidth(2),
                                    flexDirection: 'column'
                                }}>
                                    <Title style={{
                                        color: colors.text,
                                        fontSize: responsiveScreenFontSize(2.3),
                                        fontFamily: 'sans-serif',
                                        fontWeight: 'bold',
                                        letterSpacing: 0.5
                                    }}>{user.first_name} {user.last_name}</Title>
                                    <Caption style={{
                                        color: colors.text,
                                        fontSize: responsiveScreenFontSize(1.4),
                                        lineHeight: responsiveScreenFontSize(2),
                                    }}>{user.designation}</Caption>
                                </View>
                            </View>
                        </View>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={() => (
                                    <IconButton
                                        name="home"
                                        color={colors.primary}
                                        size={responsiveScreenFontSize(3.5)}
                                    />
                                )}
                                label={() => <Text style={{
                                    color: colors.text, fontSize: responsiveScreenFontSize(2.3),
                                    fontFamily: 'serif'
                                }}>Home</Text>}
                                onPress={() => {
                                    { props.navigation.navigate('Home') }
                                }}
                            />
                            <DrawerItem
                                icon={() => (
                                    <IconButton
                                        name="book"
                                        color={colors.primary}
                                        size={responsiveScreenFontSize(3.5)}
                                    />
                                )}
                                label={() => <Text style={{
                                    color: colors.text, fontSize: responsiveScreenFontSize(2.3),
                                    fontFamily: 'serif'
                                }}>News Thread</Text>}
                                onPress={() => {
                                    { props.navigation.navigate('Post Repository') }
                                }}
                            />
                        </Drawer.Section>
                        <Drawer.Section>
                            <View style={{
                                paddingLeft: safeArea.left + responsiveScreenWidth(3.2),
                                marginTop: responsiveScreenHeight(1)
                            }}>
                                <Text style={{
                                    fontWeight: 'bold', fontFamily: 'sans-serif-light',
                                    color: colors.text, fontSize: responsiveScreenFontSize(2)
                                }}>Categories</Text>
                            </View>
                            <View style={styles.card}>
                                <TouchableRipple onPress={() => { props.navigation.navigate('Health'); }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: responsiveScreenHeight(1),
                                        paddingHorizontal: safeArea.left + responsiveScreenWidth(3.2)
                                    }}>
                                        <MaterialIcons name="local-hospital" size={responsiveScreenFontSize(2.5)} color={colors.text} />
                                        <View style={{ marginLeft: responsiveScreenWidth(4) }}>
                                            <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(1.9) }}>
                                                Health
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple onPress={() => { props.navigation.navigate('Political'); }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: responsiveScreenHeight(1),
                                        paddingHorizontal: safeArea.left + responsiveScreenWidth(3.2)
                                    }}>
                                        <Entypo name="flag" size={responsiveScreenFontSize(2.5)} color={colors.text} />
                                        <View style={{ marginLeft: responsiveScreenWidth(4) }}>
                                            <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(1.9) }}>
                                                Political
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple onPress={() => { props.navigation.navigate('Work and Education'); }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: responsiveScreenHeight(1),
                                        paddingHorizontal: safeArea.left + responsiveScreenWidth(3.2)
                                    }}>
                                        <MaterialIcons name="work" size={responsiveScreenFontSize(2.5)} color={colors.text} />
                                        <View style={{ marginLeft: responsiveScreenWidth(4) }}>
                                            <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(1.9) }}>
                                                Work and Education
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple onPress={() => { props.navigation.navigate('Technology and Entertainment'); }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: responsiveScreenHeight(1),
                                        paddingHorizontal: safeArea.left + responsiveScreenWidth(3.2)
                                    }}>
                                        <MaterialCommunityIcons name="robot-industrial" size={responsiveScreenFontSize(2.5)} color={colors.text} />
                                        <View style={{ marginLeft: responsiveScreenWidth(4) }}>
                                            <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(1.9) }}>
                                                Technology and Entertainment
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple onPress={() => { props.navigation.navigate('Others'); }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        paddingVertical: responsiveScreenHeight(1),
                                        paddingHorizontal: safeArea.left + responsiveScreenWidth(3.2)
                                    }}>
                                        <MaterialCommunityIcons name="expand-all" size={responsiveScreenFontSize(2.5)} color={colors.text} />
                                        <View style={{ marginLeft: responsiveScreenWidth(4) }}>
                                            <Text style={{ color: colors.text, fontSize: responsiveScreenFontSize(1.9) }}>
                                                Others
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </Drawer.Section>
                        <Drawer.Section>
                            <View style={{
                                paddingLeft: safeArea.left + responsiveScreenWidth(3.2),
                                marginTop: responsiveScreenHeight(1)
                            }}>
                                <Text style={{
                                    fontWeight: 'bold', fontFamily: 'sans-serif-light',
                                    color: colors.text, fontSize: responsiveScreenFontSize(2)
                                }}>Preferences</Text>
                            </View>
                            <TouchableRipple onPress={() => { switchTheme() }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: responsiveScreenHeight(1),
                                    paddingHorizontal: safeArea.left + responsiveScreenWidth(3.2),
                                }}>
                                    <Text style={{ color: colors.text }}>Dark Theme</Text>
                                    <View pointerEvents='none'>
                                        <Switch value={paperTheme.dark} />
                                    </View>
                                </View>
                            </TouchableRipple>
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={{
                    paddingBottom: safeArea.bottom + responsiveScreenHeight(0.1),
                }}>
                    <DrawerItem
                        icon={() => (
                            <IconButton
                                name="logout"
                                color={colors.primary}
                                size={responsiveScreenFontSize(3)}
                            />
                        )}
                        label={() => (
                            <Text style={{
                                color: colors.text,
                                fontFamily: 'sans-serif-light',
                                fontSize: responsiveScreenFontSize(2)
                            }}>
                                Sign out
                            </Text>
                        )}
                        style={{ paddingBottom: safeArea.bottom + responsiveScreenHeight(0.2) }}
                        onPress={() => {
                            logout();
                        }}
                    />
                </Drawer.Section>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    DrawerContent: {
        flex: 1
    },
    drawerSection: {
        marginTop: responsiveScreenHeight(0.5),
    },
    card: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: responsiveScreenHeight(1),
        marginTop: responsiveScreenHeight(1),
    },
});