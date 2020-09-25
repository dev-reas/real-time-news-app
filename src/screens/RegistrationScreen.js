import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Heading } from '../components/Heading';
import { IconButton } from '../components/IconButton';
import { AuthContainer } from '../components/AuthContainer';
import { AuthContext } from '../Context/AuthContext';
import { Loading } from '../components/Loading';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { Kohana } from 'react-native-textinput-effects';
import {
  useResponsiveScreenWidth, useResponsiveScreenHeight, useResponsiveScreenFontSize
} from "react-native-responsive-dimensions";

export function RegistrationScreen({ navigation }) {
  const { colors } = useTheme();
  const { register } = React.useContext(AuthContext);
  const [first_name, setfirstName] = React.useState('');
  const [middle_name, setmiddleName] = React.useState('');
  const [last_name, setlastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthContainer>
        <View style={{
          width: useResponsiveScreenWidth(100),
          height: useResponsiveScreenHeight(100),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <IconButton style={{
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            marginRight: useResponsiveScreenWidth(6),
          }}
            name={'closecircleo'}
            size={useResponsiveScreenFontSize(4)}
            onPress={() => {
              navigation.pop();
            }} />
          <View style={{
            marginTop: useResponsiveScreenHeight(5)
          }}>
            <Heading style={style.title}>Register Now!</Heading>
          </View>
          <View style={style.container}>
            <Text style={style.text}>{error}</Text>
          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: 50, opacity: 0.8
              }}
              label={'First name'}
              iconClass={FontAwesome}
              iconName={'id-card-o'}
              iconColor={colors.primary}
              iconSize={22}
              inputPadding={12}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: 12, }}
              iconContainerStyle={{ padding: 12 }}
              useNativeDriver
              value={first_name}
              onChangeText={setfirstName}
            />
          </View>
          <View style={{ marginTop: useResponsiveScreenHeight(1.5) }}>

          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: 50, opacity: 0.8
              }}
              label={'Middle Name'}
              iconClass={FontAwesome}
              iconName={'id-card-o'}
              iconSize={22}
              iconColor={colors.primary}
              inputPadding={12}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: 12 }}
              iconContainerStyle={{ padding: 12 }}
              useNativeDriver
              value={middle_name}
              onChangeText={setmiddleName}
            />
          </View>
          <View style={{ marginTop: useResponsiveScreenHeight(1.5) }}>

          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: 50, opacity: 0.8
              }}
              label={'Last Name'}
              iconClass={FontAwesome}
              iconName={'id-card-o'}
              iconSize={22}
              iconColor={colors.primary}
              inputPadding={12}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: 12 }}
              iconContainerStyle={{ padding: 12 }}
              useNativeDriver
              value={last_name}
              onChangeText={setlastName}
            />
          </View>
          <View style={{ marginTop: useResponsiveScreenHeight(1.5) }}>

          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: 50, opacity: 0.8
              }}
              label={'Email'}
              iconClass={Entypo}
              iconName={'email'}
              iconColor={colors.primary}
              iconSize={22}
              inputPadding={12}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: 12, }}
              iconContainerStyle={{ padding: 12 }}
              useNativeDriver
              keyboardType={'email-address'}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginTop: useResponsiveScreenHeight(1.5) }}>

          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: 50, opacity: 0.8
              }}
              label={'Password'}
              iconClass={Entypo}
              iconName={'lock'}
              iconSize={22}
              iconColor={colors.primary}
              inputPadding={12}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: 12 }}
              iconContainerStyle={{ padding: 12 }}
              useNativeDriver
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <Button mode="contained"
            labelStyle={{
              fontSize: useResponsiveScreenFontSize(2),
              fontFamily: 'serif'
            }}
            style={{
              marginTop: useResponsiveScreenHeight(2),
              marginBottom: useResponsiveScreenHeight(2),
              width: useResponsiveScreenWidth(95),
              height: useResponsiveScreenHeight(8),
              borderRadius: useResponsiveScreenHeight(8) / 2,
              justifyContent: 'center',
              backgroundColor: colors.primary
            }}
            onPress={async () => {
              setLoading(true);
              await register(first_name, middle_name, last_name, email, password);
              if (global.registerError != 'Registration completed successfully') {
                if (global.registerError == 'Whoops! email already registered') {
                  setError(global.registerError);
                  setLoading(false);
                }

                else if (global.registerError == 'Failed to register') {
                  setError(global.registerError);
                  setLoading(false);
                }
              }

              else {
                navigation.pop();
              }
            }}>
            Register
          </Button>
          <Loading loading={loading} />
        </View>
      </AuthContainer>
    </>
  );
}

const style = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: 'sans-serif-thin',
  },

  loginButton: {
    marginVertical: 20,
  },

  text: {
    color: 'red',
    fontWeight: 'bold',
  },
  container: {
    paddingVertical: 8,
  },

})
