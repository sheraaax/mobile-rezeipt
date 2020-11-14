import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
        <Text style={{fontSize:48, marginBottom:15}}>HomeScreen</Text>

        <Button
          title="Logout"
          onPress={logout}
        />

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //marginBottom:50
  },
});

export default HomeScreen;
