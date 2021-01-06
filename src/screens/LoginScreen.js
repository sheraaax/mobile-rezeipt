import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const { state, login, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />

        <Image style={styles.logo} source={require('../../assets/rezeiptlogo.png')} />

        <View style={styles.inputView} >
          <Input
            style={styles.inputText}
            autoCapitalize="none"
            autoCorrect={false}
            label="Email"
            placeholder="test@example.com"
            placeholderTextColor="grey"
            value={email}
            onChangeText={setEmail}
            leftIcon={<Icon
                name='envelope'
                size={20}
                color='grey'
              />}
            />
        </View>

        <View style={styles.inputView} >
          <Input
            style={styles.inputText}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            label="Password"
            placeholder="password"
            placeholderTextColor="grey"
            value={password}
            onChangeText={setPassword}
            leftIcon={<Icon
                name='lock'
                size={30}
                color='grey'
              />}
            />
        </View>

        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}

        <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => login({ email, password })}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}

      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:50
  },
  logo:{
    marginBottom:10
  },
  inputView:{
    width:"80%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
    marginBottom:50,
    justifyContent:"center",
    padding:20,
  },
  inputText:{
    height:50,
    color:"black",
    marginLeft:15
  },
  forgot:{
    color:"#596B74",
    fontSize:13,
    marginTop:30
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#1C9C9B",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
    shadowColor:"#25cecd",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius:5,
    shadowOpacity:1.0
  },
  loginText:{
    color:"white",
    fontWeight:"bold"
  },
  signupText:{
    color:"#596B74",
    fontSize:15,
    marginTop:15
  },
  errorMessage:{
    fontSize: 16,
    color: "red"
  }
});

export default LoginScreen;
