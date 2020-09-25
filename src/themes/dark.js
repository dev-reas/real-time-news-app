import {DarkTheme} from '@react-navigation/native';

export const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#464646',
        shadow: 'white',
        primary: '#5dade2',
        text: 'white',
        buttonTextBackground: '#eff7f6',
        buttonText: '#5dade2',
        borderColor: '#bcb8b1'
    },
  };