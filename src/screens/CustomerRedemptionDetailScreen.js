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
    const { state } = useContext(CustomerRedemptionContext);

    const redemption = state.find(r => r.id === id);

    return (
      <View style={styles.container}>
    
            <Icon style={styles.icon} size={50} name="birthday-cake" color="grey"/>

            <View>
                <Title style={styles.cardContentTitle}>{redemption.redemption.name}</Title>
                <Paragraph style={styles.cardContentDescription}>{redemption.redemption.description}</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Claimed at : {redemption.createdAt}</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Expiry Date : {redemption.redemption.expirationDate}</Paragraph>
                <Paragraph style={styles.cardContentDescription}>Scan QR Code below to redeem your rewards!</Paragraph>    
            </View>

            <Image style={styles.qrCode} source = {{uri:'https://www.disabled-world.com/pics/1/dw-qr-code.png'}}/>
      </View>
    
)};

const styles = StyleSheet.create({
  container: {
    width:WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: "center"
  },
  cardContentDescription: {
      textAlign: "center"
  },
  qrCode: {
    alignItems: 'center',
    marginTop: 15, 
    width: 150, 
    height: 150
  }

});

export default CustomerRedemptionDetailScreen;