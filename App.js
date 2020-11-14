import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AnalysisScreen from './src/screens/AnalysisScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RedemptionScreen from './src/screens/RedemptionScreen';
import ScanQRScreen from './src/screens/ScanQRScreen';
import SignupScreen from './src/screens/SignupScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
  }),
  mainFlow: createBottomTabNavigator({
    Home: HomeScreen,
    Analysis: AnalysisScreen,
    ScanQR: ScanQRScreen,
    Redemption: RedemptionScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator)} } />
    </AuthProvider>
  );
};
