import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PostScreen } from '../screens/PostScreen';
import { ViewScreen } from '../screens/ViewScreen';
import { DrawerNavigator } from '../navigators/DrawerNavigator';
import { AboutScreen } from '../screens/AboutScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { EditPostScreen } from '../screens/EditPostScreen';
import { EditUserProfile } from '../screens/EditUserProfile';
import { AllWorldNewsScreen } from '../screens/AllWorldNewsScreen';
import { AllPHNewsScreen } from '../screens/AllPHNewsScreen';
import { UserPageScreen } from '../screens/UserPageScreen';

const MainStack = createStackNavigator();

export function MainStackNavigator() {

  return (
    <MainStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <MainStack.Screen name={'Home'} component={DrawerNavigator} />
      <MainStack.Screen name={'Post'} component={PostScreen} />
      <MainStack.Screen name={'View Post'} component={ViewScreen} />
      <MainStack.Screen name={'About'} component={AboutScreen} />
      <MainStack.Screen name={'Profile'} component={UserProfileScreen} />
      <MainStack.Screen name={'Edit Post'} component={EditPostScreen} />
      <MainStack.Screen name={'Edit Profile'} component={EditUserProfile} />
      <MainStack.Screen name={'World News'} component={AllWorldNewsScreen} />
      <MainStack.Screen name={'PH News'} component={AllPHNewsScreen} />
      <MainStack.Screen name={'Visit Profile'} component={UserPageScreen} />
    </MainStack.Navigator>
  );
}
