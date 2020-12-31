import React, { useContext } from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Dimensions, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as RedemptionContext } from '../context/RedemptionContext';
import { Context as CustomerRedemptionContext } from '../context/CustomerRedemptionContext';
import { Context as CustomerContext } from '../context/CustomerContext';
import { NavigationEvents } from 'react-navigation';

const { height, width } = Dimensions.get('window');


const RedemptionScreen = ({navigation}) => {
  const { state: {redemptions}, fetchRedemptions } = useContext(RedemptionContext);
  const { state: {errorMessage}, createCustomerRedemption, clearErrorMessage } = useContext(CustomerRedemptionContext);
  const { state: {customer}, fetchCustomer } = useContext(CustomerContext);
  const totalPoints = navigation.getParam('totalPoints');
  
  // kat customerRedemptionScreen kena tekan rewards available dulu baru totalPoints dia transfer haha
  //console.log('totalPoints:',totalPoints);
  console.log('Error:',errorMessage);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        
        <Text style={styles.totalReceipts}>{totalPoints}</Text>
        <Text style={styles.headline}>Receipts Collected</Text>

      <View style={styles.navigation}>

        <TouchableOpacity>
          <Text style={styles.navigationText}>Rewards Available</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('CustomerRedemption')}>
          <Text style={styles.navigationText}>Redeemed</Text>
        </TouchableOpacity>

      </View>

      {errorMessage ? 
        Alert.alert(
          "Error",
          "You have already redeemed this reward!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        )
        : null}

      <View>
        <NavigationEvents onDidFocus={fetchCustomer} onWillFocus={fetchRedemptions} onWillBlur={clearErrorMessage} />
        <FlatList
          data={redemptions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
              < TouchableOpacity onPress={()=> {
                Alert.alert(
                  'Confirmation', 
                  'Are you sure to redeem this reward?',
                  [{
                  text: 'Redeem',
                  onPress: () => { createCustomerRedemption(customer.cust.id, item.id) }
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log("Cancel Pressed"),
                  style: 'cancel'
                }
                ])}}>

                  <Card style ={styles.card}>
                    <Card.Content style={styles.cardContent}>
                      <Icon size={60} name="birthday-cake" color="grey"/>

                      <View>
                        <Title style={styles.cardContentTitle}>{item.store.name}</Title>
                        <Paragraph style={styles.cardContentDescription}>{item.name}</Paragraph>
                      </View>

                    </Card.Content>
                  </Card>
              </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      </KeyboardAwareScrollView>
      </View>
       )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height:height-100,
    paddingTop: 25,
    paddingHorizontal: 10
  },

  totalReceipts: {
    color:"#1C9C9B",
    fontSize:50,
    fontWeight:"bold",
    textAlign: 'center',
  },

  headline: {
    color:"#1C9C9B",
    fontSize:30,
    textAlign: 'center',
    marginBottom:30,
  },

  navigation:{
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"center",
    marginBottom: 10
  },

  navigationText:{
    paddingHorizontal: 20,
    color:"grey"
  },

  card: {
    margin:3,
    borderRadius:10,
  },

  cardContent: {
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:"flex-start",
  },

  cardContentTitle: {
    width:180,
    marginLeft:20,
    color:"#1C9C9B",
  },
  cardContentDescription: {
    marginLeft:20,
  },
});

export default RedemptionScreen;