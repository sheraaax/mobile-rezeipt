import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AnalysisScreen from './src/screens/AnalysisScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RedemptionScreen from './src/screens/RedemptionScreen';
import ScanQRScreen from './src/screens/ScanQRScreen';
import SignupScreen from './src/screens/SignupScreen';
import CustomerRedemptionDetailScreen from './src/screens/CustomerRedemptionDetailScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as RedemptionProvider } from './src/context/RedemptionContext';
import { Provider as CustomerRedemptionProvider } from './src/context/CustomerRedemptionContext';
import { Provider as SalesProvider } from './src/context/SalesContext';
import { setNavigator } from './src/navigationRef';
import CustomerRedemptionScreen from './src/screens/CustomerRedemptionScreen';

const RedemptionFlow = createStackNavigator({
  Redemption: RedemptionScreen,
  CustomerRedemption:  CustomerRedemptionScreen,
  CustomerRedemptionDetail: CustomerRedemptionDetailScreen
});

RedemptionFlow.navigationOptions = {
  headerShown: false,
  tabBarLabel:'Rewards',  
  tabBarIcon:({tintColor})=>(  
      <Icon name="gift" color={tintColor} size={25}/>  
    )
  };

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
    Home: {
      screen: HomeScreen,
      navigationOptions:{  
        tabBarLabel:'Home',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="home" color={tintColor} size={25}/>  
        )  
      }  
    },

    Analysis: {
      screen: AnalysisScreen,
      navigationOptions:{  
        tabBarLabel:'Analysis',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="chart-pie" color={tintColor} size={25}/>  
        )  
      }  
    },

    ScanQR: {
      screen: ScanQRScreen,
      navigationOptions:{  
        tabBarLabel:'Scan QR',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="qrcode" color={tintColor} size={25}/>  
        )  
      },
    },
    Redemption: {
      screen: RedemptionFlow,
    } 
})
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <SalesProvider>
        <RedemptionProvider>
          <CustomerRedemptionProvider>
            <App ref={(navigator) => { setNavigator(navigator)} } />
          </CustomerRedemptionProvider> 
        </RedemptionProvider>
      </SalesProvider>
    </AuthProvider>
  );
};