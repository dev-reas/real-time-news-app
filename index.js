import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as main} from './app.json';
import './src/components/Global.js';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent('main', () => App);