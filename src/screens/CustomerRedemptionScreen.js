import React, { useContext } from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as CustomerRedemptionContext } from '../context/CustomerRedemptionContext';
import { NavigationEvents } from 'react-navigation';


const CustomerRedemptionScreen = ({navigation}) => {
  const { state, fetchCustomerRedemptions } = useContext(CustomerRedemptionContext);
  console.log(state);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        
        <Text style={styles.totalReceipts}>1120</Text>
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
        <NavigationEvents onWillFocus={fetchCustomerRedemptions} />
        <FlatList
          data={state}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
              < TouchableOpacity>
                  <Card style ={styles.card}>
                    <Card.Content style={styles.cardContent}>
                      <Icon size={60} name="birthday-cake" color="grey"/>

                      <View>
                        <Title style={styles.cardContentTitle}>{item.redemptionId}</Title>
                        <Paragraph style={styles.cardContentDecsription}>{item.status}</Paragraph>
                      </View>

                    </Card.Content>
                  </Card>
              </TouchableOpacity>
              </View>
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
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10
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
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:"flex-start",
  },

  cardContentTitle: {
    width:180,
    marginLeft:20,
    color:"#1C9C9B",
  },
    cardContentDecsription: {
      marginLeft:20,
    },
});

export default CustomerRedemptionScreen;
