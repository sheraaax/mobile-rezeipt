import * as React from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const RedemptionScreen = () => {

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>

        <Text style={styles.totalReceipts}>1120</Text>
        <Text style={styles.headline}>Receipts Collected</Text>

      <View style={styles.navigation}>

        <TouchableOpacity>
          <Text style={styles.navigationText}>Rewards Available</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.navigationText}>Redeemed</Text>
        </TouchableOpacity>

      </View>

        <TouchableOpacity>
          <Card style ={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={60} name="birthday-cake" color="grey"/>

              <View>
                <Title style={styles.cardContentTitle}>Cake Store</Title>
                <Paragraph style={styles.cardContentDecsription}>RM5 off your next order</Paragraph>
              </View>

            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Card style ={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={60} name="tshirt" color="grey"/>

              <View>
                <Title style={styles.cardContentTitle}>Fashion Store</Title>
                <Paragraph style={styles.cardContentDecsription}>RM25 off your next order</Paragraph>
              </View>

            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Card style ={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={60} name="pizza-slice" color="grey"/>

              <View>
                <Title style={styles.cardContentTitle}>Pizza Store</Title>
                <Paragraph style={styles.cardContentDecsription}>5% off your next order</Paragraph>
              </View>

            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Card style ={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={60} name="birthday-cake" color="grey"/>

              <View>
                <Title style={styles.cardContentTitle}>Cake Store</Title>
                <Paragraph style={styles.cardContentDecsription}>RM5 off your next order</Paragraph>
              </View>

            </Card.Content>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity>
          <Card style ={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={60} name="tshirt" color="grey"/>

              <View>
                <Title style={styles.cardContentTitle}>Fashion Store</Title>
                <Paragraph style={styles.cardContentDecsription}>RM25 off your next order</Paragraph>
              </View>

            </Card.Content>
          </Card>
        </TouchableOpacity>

      </View>
    </KeyboardAwareScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    margin: 15,
    marginTop: 40
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

export default RedemptionScreen;