import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { DrawerContent } from '../components/drawerContent';
import { SportsScreen } from '../screens/SportsScreen';
import { HealthScreen } from '../screens/HealthScreen';
import { PoliticalScreen } from '../screens/PoliticalScreen';
import { WorkEducScreen } from '../screens/WorkEducScreen';
import { OthersScreen } from '../screens/OthersScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { PostRepository } from '../screens/PostRepository';

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name={'Home'} component={HomeScreen} />
      <Drawer.Screen name={'Post Repository'} component={PostRepository} />
      <Drawer.Screen name={'Political'} component={PoliticalScreen} />
      <Drawer.Screen name={'Health'} component={HealthScreen} />
      <Drawer.Screen name={'Work and Education'} component={WorkEducScreen} />
      <Drawer.Screen name={'Technology and Entertainment'} component={SportsScreen} />
      <Drawer.Screen name={'Others'} component={OthersScreen} />
    </Drawer.Navigator>
  );
}
