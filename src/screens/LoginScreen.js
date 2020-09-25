import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import { Kohana } from 'react-native-textinput-effects';
import { Heading } from '../components/Heading';
import { TextButton } from '../components/TextButton';
import { AuthContainer } from '../components/AuthContainer';
import { AuthContext } from '../Context/AuthContext';
import { Loading } from '../components/Loading';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import {
  useResponsiveScreenWidth, useResponsiveScreenHeight, useResponsiveScreenFontSize
} from "react-native-responsive-dimensions";

export function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const { login } = React.useContext(AuthContext);
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
          <View style={styles.heading}>
            <Image
              style={styles.tinyLogo, {
                height: useResponsiveScreenHeight(30),
                width: useResponsiveScreenWidth(60),
              }}
              source={require('../assets/logo.png')}
            />
            <Heading style={styles.title}>Welcome Back!</Heading>
          </View>
          <View style={styles.container}>
            <Text style={{
              fontSize: useResponsiveScreenFontSize(2),
              color: 'red',
              fontWeight: 'bold',
            }}>
              {error}
            </Text>
          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: useResponsiveScreenHeight(8.5) / 2, opacity: 0.8
              }}
              label={'Email'}
              iconClass={Entypo}
              iconName={'email'}
              iconColor={colors.primary}
              iconSize={useResponsiveScreenFontSize(3)}
              inputPadding={useResponsiveScreenHeight(1.5)}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: useResponsiveScreenHeight(1.2) }}
              iconContainerStyle={{ padding: useResponsiveScreenHeight(1.2) }}
              useNativeDriver
              keyboardType={'email-address'}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ margin: useResponsiveScreenHeight(1) }}>

          </View>
          <View style={{ width: useResponsiveScreenWidth(95), height: useResponsiveScreenHeight(8.5) }}>
            <Kohana
              style={{
                backgroundColor: '#f9f5ed',
                borderRadius: useResponsiveScreenHeight(8.5) / 2, opacity: 0.8
              }}
              label={'Password'}
              iconClass={Entypo}
              iconName={'lock'}
              iconSize={useResponsiveScreenFontSize(3)}
              iconColor={colors.primary}
              inputPadding={useResponsiveScreenHeight(1.5)}
              labelStyle={{ color: '#7c7c7c', fontFamily: 'sans-serif-thin' }}
              inputStyle={{ color: '#0b0b0b' }}
              labelContainerStyle={{ padding: useResponsiveScreenHeight(1.2) }}
              iconContainerStyle={{ padding: useResponsiveScreenHeight(1.2) }}
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
              await login(email, password);
              if (global.errorMessage != 'Login Successful') {
                setError(global.errorMessage);
                setLoading(false);
              }
            }}>
            Login
        </Button>

          <TextButton
            title={"Don't have account? Create one now!"}
            onPress={() => {
              navigation.navigate('Registration');
            }}
          />
          <Loading loading={loading} />
        </View>
      </AuthContainer>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontFamily: 'sans-serif-thin',
  },
  container: {
    paddingVertical: 5,
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 42,
  },
  tinyLogo: {
    resizeMode: "cover"
  },
});
