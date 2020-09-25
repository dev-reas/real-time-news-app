import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import React, { createFactory } from 'react';
import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import { LightTheme } from './themes/light';
import { darkTheme } from './themes/dark';
import { AuthContext } from './Context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { UserContext } from './Context/UserContext';
import { ThemeContext } from './Context/ThemeContext';
import { SplashScreen } from './screens/SplashScreen';
import { MainStackNavigator } from './navigators/MainStackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootStack = createStackNavigator();
console.disableYellowBox = true;

export default function () {
  const { auth, state } = useAuth();
  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return state.user ? (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={state.user}>
            <MainStackNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    ) : (
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
      )
  }
  const [isDarkTheme, setisDarkTheme] = React.useState(false);
  const switchTheme = React.useCallback(() => {
    setisDarkTheme(!isDarkTheme);
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={switchTheme}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={isDarkTheme ? darkTheme : LightTheme}>
          <SafeAreaProvider>
            <RootStack.Navigator screenOptions={{
              headerShown: false,
            }}>
              {
                renderScreens()
              }
            </RootStack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
