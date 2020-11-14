import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import rezeiptApi from '../api/rezeiptApi';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'login':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'logout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'login', payload: token });
    navigate('Home');
  } else {
    navigate('Login');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password }) => {

  try {
    // make api request to signup with email and password
    // if successfully signed up, modify state and say we are authenticated
    const response = await rezeiptApi.post('/signup', { email, password });

    // take JWT from api and store on device
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'login', payload: response.data.token });

    // navigate to mainflow
    navigate('Home');

  } catch (err) {
    // if failed sign in, reflect an error message
    dispatch({ type: 'add_error', payload: 'This email address is already used.'});
  }

};


const login = (dispatch) => async ({ email, password }) => {

  try {
    const response = await rezeiptApi.post('/login', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'login', payload: response.data.token });
    navigate('Home');

  } catch (err) {
    dispatch({ type: 'add_error', payload: 'Invalid email or password.'});
  }

};


const logout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
    navigate('loginFlow');
};


export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, login, logout, clearErrorMessage, tryLocalLogin },
  { token: null, errorMessage: '' }
);
