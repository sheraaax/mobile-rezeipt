import React, { useContext } from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as CustomerRedemptionContext } from '../context/CustomerRedemptionContext';
import { NavigationEvents } from 'react-navigation';


const CustomerRedemptionDetailScreen = ({navigation}) => {
    const id = navigation.getParam('id');
    const { state } = useContext(CustomerRedemptionContext);

    const redemption = state.find(r => r.id === id);
    console.log(redemption);

    return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
          
      <Icon style={styles.icon} size={60} name="birthday-cake" color="grey"/>
          
        <Card style ={styles.card}>
            
            <Card.Content style={styles.cardContent}>

            <View>
                <Title style={styles.cardContentTitle}>{id}</Title>
                <Paragraph style={styles.cardContentDecsription}>{redemption.redemptionId}</Paragraph>
                <Paragraph style={styles.cardContentDecsription}>{redemption.status}</Paragraph>
                <Paragraph style={styles.cardContentDecsription}>{redemption.createdAt}</Paragraph>
            </View>

            </Card.Content>
        </Card>

      </View>
    </KeyboardAwareScrollView> 
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10
  },

  icon: {
      flex:1,
      textAlign:"center"
  },

  totalReceipts: {
    color:"#1C9C9B",
    marginTop:30,
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
    marginTop:5,
    marginBottom:5,
  },

  cardContent: {
    alignItems:"center",
  },

  cardContentTitle: {
    color:"#1C9C9B",
    alignItems:"center",
  },
    cardContentDecsription: {
        
    alignItems:"center",
    },
});

export default CustomerRedemptionDetailScreen;
