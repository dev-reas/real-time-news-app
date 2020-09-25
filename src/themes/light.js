import {DefaultTheme} from '@react-navigation/native';

export const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
        shadow: 'black',
        primary: '#3498DB',
        text: 'black',
        buttonTextBackground: '#3498DB',
        buttonText: '#252422',
        borderColor: '#3498DB'
    },
  };