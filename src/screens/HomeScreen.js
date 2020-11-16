import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const todaysDate = new Date(year, month, date)
  const monthString =  todaysDate.toLocaleString('default', { month: 'long' });

  return (
    <View >
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.headline}>{monthString} Expenses</Text>
          <Text style={styles.totalExpense}>RM100.00</Text>

          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={styles.date}>{date} {monthString} {year}</Text>
            <Text style={styles.totalPrice}>RM90.00</Text>
          </View>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={40} name="store-alt" color="grey"/>
              <View >
                <Title style={styles.cardContentTitle}>Xen Lit Trading</Title>
                <Paragraph style={styles.cardContentTimestamp}>{hours}:{minutes}</Paragraph>
              </View>
              <Paragraph style={styles.cardContentTotal}>RM10.00</Paragraph>
            </Card.Content>
          </Card>  

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={40} name="store-alt" color="grey"/>
              <View >
                <Title style={styles.cardContentTitle}>ChuanAik Supermarket</Title>
                <Paragraph style={styles.cardContentTimestamp}>12:10</Paragraph>
              </View>
              <Paragraph style={styles.cardContentTotal}>RM80.00</Paragraph>
            </Card.Content>
          </Card>  


          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={styles.date}>1 {monthString} {year}</Text>
            <Text style={styles.totalPrice}>RM10.00</Text>
          </View>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Icon size={40} name="store-alt" color="grey"/>
              <View >
                <Title style={styles.cardContentTitle}>Xen Lit Trading</Title>
                <Paragraph style={styles.cardContentTimestamp}>3:30</Paragraph>
              </View>
              <Paragraph style={styles.cardContentTotal}>RM10.00</Paragraph>
            </Card.Content>
          </Card>   
               

          <Button
            style={styles.logoutBtn}
            title="Logout"
            onPress={logout}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
};

const styles = StyleSheet.create({
  logoutBtn:{
    width:"100%",
    alignItems:"center",
    marginTop:40,
    marginBottom:10
  },
  container: {
    flex: 1,
    flexWrap:"wrap",
    alignItems: 'center',
  },
  headline: {
    color:"#1C9C9B",
    marginTop:50,
    fontSize:30,
    textAlign: 'center',
  },
  totalExpense: {
    color:"#1C9C9B",
    marginTop:5,
    marginBottom:40,
    fontSize:50,
    fontWeight:"bold",
    textAlign: 'center',
  },
  date: {
    marginLeft:20,
    marginBottom:10,
    color:"#4AB6B5",
    fontWeight:"bold",
  },
  totalPrice: {
    marginRight:20,
    marginBottom:10,
    color:"#367675",
    fontWeight:"bold",
  },
  card: {
    marginLeft:20,
    marginRight:20,
    marginBottom:10,
  },
  cardContent: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  cardContentTitle: {
    width:180,
    marginLeft:20,
    color:"#1C9C9B",
  },
  cardContentTimestamp: {
    marginLeft:20,
  },
  cardContentTotal: {
    width:80,
    marginLeft:20,
    marginRight:20,
    fontSize:16,
    fontWeight:"bold",
  }
});

export default HomeScreen;
