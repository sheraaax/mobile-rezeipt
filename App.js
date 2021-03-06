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
import SalesDetailsScreen from './src/screens/SalesDetailsScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as RedemptionProvider } from './src/context/RedemptionContext';
import { Provider as CustomerRedemptionProvider } from './src/context/CustomerRedemptionContext';
import { Provider as SalesProvider } from './src/context/SalesContext';
import { Provider as CustomerProvider } from './src/context/CustomerContext';
import { setNavigator } from './src/navigationRef';
import CustomerRedemptionScreen from './src/screens/CustomerRedemptionScreen';

const RedemptionFlow = createStackNavigator({
  Redemption: {
    screen: RedemptionScreen,
    navigationOptions: {
      title: 'Rewards Available',
    }
  },
  CustomerRedemption:  {
    screen: CustomerRedemptionScreen,
    navigationOptions: {
      title: 'Redeemed',
    }
  },
  CustomerRedemptionDetail: {
    screen: CustomerRedemptionDetailScreen,
    navigationOptions: {
      title: 'Redemption Code',
    }
  },
});

const salesDetailsFlow = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    SalesDetails: {
      screen: SalesDetailsScreen,
      navigationOptions: {
        title: 'Receipt Details'
      }
    },
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
    // Home: {
    //   screen: HomeScreen,
    //   navigationOptions:{  
    //     tabBarLabel:'Home',  
    //     tabBarIcon:({tintColor})=>(  
    //         <Icon name="home" color={tintColor} size={25}/>  
    //     )  
    //   }  
    // },

    Home: {
      screen: salesDetailsFlow,
      navigationOptions: {
        headerShown: false,
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
        <CustomerProvider>
          <RedemptionProvider>
            <CustomerRedemptionProvider>
              <App ref={(navigator) => { setNavigator(navigator)} } />
            </CustomerRedemptionProvider> 
          </RedemptionProvider>
        </CustomerProvider>
      </SalesProvider>
    </AuthProvider>
  );
};