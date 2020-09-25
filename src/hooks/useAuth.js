import React from 'react';
import axios from 'axios';
import { sleep } from '../utils/sleep';
import { createAction } from '../config/createAction';
import { BASE_URL } from '../config';
import { AsyncStorage } from 'react-native';

export function useAuth() {
  const [state, dispatch] = React.useReducer((
    state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          loading: false,
          user: { ...action.payload },
        };

      case 'REMOVE_USER':
        return {
          ...state,
          user: undefined,
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
  }, {
    user: undefined,
    loading: true,
  })

  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        const { data } = await axios.post(`${BASE_URL}/api/login`, {
          email,
          password,
        });
        const user = {
          email: data.email,
          token: data.access_token,
          first_name: data.first_name,
          last_name: data.last_name,
          user_id: data.user_id,
          profile_pic: data.profile_pic,
          profile_name: data.profile_name,
          designation: data.designation,
        };
        console.log(user);
        if (data.message != 'Login Successful') {
          global.errorMessage = data.message;
          console.log(global.errorMessage);
        }

        else if (data.message == 'Login Successful') {
          await AsyncStorage.setItem('user', JSON.stringify(user));
          dispatch(createAction('SET_USER', user));
        }
      },
      logout: async () => {
        await AsyncStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (first_name, middle_name, last_name, email, password) => {
        await sleep(2000);
        const { data } = await axios.post(`${BASE_URL}/api/register`, {
          first_name,
          middle_name,
          last_name,
          email,
          password,
        });
        console.log(data.message);
        if (data.message == 'Whoops! email already registered') {
          global.registerError = data.message;
        }
        else if (data.message == 'Failed to register') {
          global.registerError = data.message;
        }
        else if (data.message == 'Registration completed successfully') {
          global.registerError = data.message;
        }
      },
    }),
    [],
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', JSON.parse(user)));
        }
        dispatch(createAction('SET_LOADING', false));
      });
    })
  }, []);
  return { auth, state };
}