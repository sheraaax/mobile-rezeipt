import React, { useContext } from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as CustomerRedemptionContext } from '../context/CustomerRedemptionContext';
import { NavigationEvents } from 'react-navigation';

const { height, width } = Dimensions.get('window');

  _renderStatus = (status) => {
  if(status == "A"){
      return(
          <Paragraph style={styles.cardContentDescription}>Available</Paragraph>
      );
  }else if(status == "R"){
    return (
      <Paragraph style={styles.cardContentDescription}>Redeemed</Paragraph>
    );
  }
  else{
      return(
        <Paragraph style={styles.cardContentDescription}>Expired</Paragraph>
      );
  }
};


const CustomerRedemptionScreen = ({navigation}) => {

  const { state: {customerRedemptions}, fetchCustomerRedemptions } = useContext(CustomerRedemptionContext);
  const pointsCollected = navigation.getParam('pointsCollected');
  
  let totalPoints = 0;
  customerRedemptions.forEach((item) => {
      if (item.status == 'R') {
        points = item.redemption.points;
        totalPoints += points;
      }
    })

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        
          <Text style={styles.totalReceipts}>{pointsCollected}</Text>
          <Text style={styles.headline}>Receipts Collected</Text>

      <View style={styles.navigation}>

        <TouchableOpacity onPress={()=>navigation.navigate('Redemption')}>
          <Text style={styles.navigationText}>Rewards Available</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navigationText}>Redeemed</Text>
        </TouchableOpacity>

      </View>

      <View>
        <NavigationEvents onWillFocus={fetchCustomerRedemptions}/>
        <FlatList
          data={customerRedemptions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {

            console.log(item.redemption.expirationDate);

            return (

              (item.status == 'A' ? ( 

              <View style={styles.card}>

              <TouchableOpacity onPress={()=>
                Alert.alert(
                  'Confirmation', 
                  'Are you sure to redeem this reward? You will not be able to redeem this reward again',
                  [{
                  text: 'Redeem',
                  onPress: () => navigation.navigate('CustomerRedemptionDetail', {id: item.id})
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log("Cancel Pressed"),
                  style: 'cancel'
                }
                ])}>
                  <Card style ={styles.card}>
                    <Card.Content style={styles.cardContent}>
                      <Icon size={60} name="birthday-cake" color="grey"/>

                      <View>
                        <Title style={styles.cardContentTitle}>Kedai Runcit Yam</Title>
                        <Paragraph style={styles.cardContentDescription}>{item.redemption.name}</Paragraph>
                        {this._renderStatus(item.status)}
                      </View>

                    </Card.Content>
                  </Card>
              </TouchableOpacity>
               
              </View>
              ) : item.status == 'R' ? (
              <View style={styles.card}>
                    <TouchableOpacity disabled={true}>
                        <Card style ={styles.card, {backgroundColor:'rgb(235,235,228)'}}>
                          <Card.Content style={styles.cardContent}>
                            <Icon size={60} name="birthday-cake" color="grey"/>

                            <View>
                              <Title style={styles.cardContentTitle}>Kedai Runcit Yam</Title>
                              <Paragraph style={styles.cardContentDescription}>{item.redemption.name}</Paragraph>
                              {this._renderStatus(item.status)}
                            </View>

                          </Card.Content>
                        </Card>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.card}>
                    <TouchableOpacity disabled={true}>
                        <Card style ={styles.card, {backgroundColor:'rgb(235,235,228)'}}>
                          <Card.Content style={styles.cardContent}>
                            <Icon size={60} name="birthday-cake" color="grey"/>

                            <View>
                              <Title style={styles.cardContentTitle}>Kedai Runcit Yam</Title>
                              <Paragraph style={styles.cardContentDescription}>{item.redemption.name}</Paragraph>
                              {this._renderStatus(item.status)}
                            </View>

                          </Card.Content>
                        </Card>
                    </TouchableOpacity>
                  </View>
                ))
                  
            );
          }}
        />
      </View>
      </View>

      </KeyboardAwareScrollView> 
      
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
    marginTop:5,
    marginBottom:5,
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

export default CustomerRedemptionScreen;
