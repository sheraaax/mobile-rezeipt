import React, { useContext, useState} from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as CustomerRedemptionContext } from '../context/CustomerRedemptionContext';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const CustomerRedemptionDetailScreen = ({navigation}) => {
    const id = navigation.getParam('id');
    const { state: {customerRedemptions}, updateCustomerRedemptionStatus, updateCustomerPoints } = useContext(CustomerRedemptionContext);

    const redemption = customerRedemptions.find(r => r.id === id);
    //console.log(redemption.id);

    return (
      <View style={styles.container}>
    
            <Icon style={styles.icon} size={50} name="birthday-cake" color="grey"/>

            <View>
                <Title style={styles.cardContentTitle}>Kedai Runcit Yam</Title>
                <Paragraph style={styles.cardContentDescription}>{redemption.redemption.name}</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Claimed at : {redemption.createdAt}</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Expiry Date : {redemption.redemption.expirationDate}</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Show the coupon code below when making payment</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Press the coupon code once successfully redeemed</Paragraph>     
            </View>

            <TouchableOpacity onPress={() => {updateCustomerRedemptionStatus(redemption.id, 'R');
                                              updateCustomerPoints(redemption.id, redemption.redemption.points)} }> 
              <Card style ={styles.card}>
                <Card.Content style={styles.cardContent}>
                <Text style={{ color:"white", fontWeight:"bold",fontSize: 30 }}>{redemption.redemption.couponCode}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
      </View>
    
)};

const styles = StyleSheet.create({
  container: {
    width:WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    backgroundColor: "white",
    flex: 1
  },

  icon: {
      textAlign:"center"
  },

  cardContent: {
    alignItems:"center",
  },

  cardContentTitle: {
    color:"#1C9C9B",
    textAlign: "center",
    fontSize: 19
  },
  cardContentDescription: {
      textAlign: "center",
      fontSize: 16
  },
  card: {
    margin:15,
    borderRadius:10,
    alignItems:"center",
    backgroundColor: "#1C9C9B",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15.00,
    elevation: 5,
  },

  cardContent: {
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:"center",
  },

});

export default CustomerRedemptionDetailScreen;
