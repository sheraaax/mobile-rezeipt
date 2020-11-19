import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <View style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />

        <Text h2 style={{marginBottom:40}}>Sign Up to Rezeipt</Text>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="test@example.com"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
            />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="password"
            placeholderTextColor="white"
            value={password}
            onChangeText={setPassword}
            />
        </View>

        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}

        <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => signup({ email, password })}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupText}>Already have an account? Log In</Text>
        </TouchableOpacity>


      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:50
  },
  inputView:{
    width:"80%",
    backgroundColor:"#1C9C9B",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white",
    textAlign: 'center'
  },
  forgot:{
    color:"#596B74",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#1C9C9B",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontWeight:"bold"
  },
  signupText:{
    color:"#596B74",
    fontSize:15
  },
  errorMessage:{
    fontSize: 16,
    color: "red"
  }
});

export default SignupScreen;
