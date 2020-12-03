import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { Card, Title, Paragraph, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as SalesContext } from '../context/SalesContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import phpUnserialize from 'phpunserialize';
import jsonQuery from 'json-query';
import { orderBy } from 'natural-orderby';
//import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeScreen = ({navigation}) => {

  const { logout } = useContext(AuthContext);
  const { state, fetchSales } = useContext(SalesContext);

  let totalExpense = 0;
  state.forEach((item) => {
    const upCart = phpUnserialize(item.cart);
    total_price = upCart.totalPrice;
    totalExpense += total_price;
  })
  //console.log(totalExpense);

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const todaysDate = new Date(year, month, date)
  const monthString =  todaysDate.toLocaleString('default', { month: 'long' });

  function renderHeadlineExpense() {
    return (
      <View>
        <Text style={styles.headline}>{monthString} Expenses</Text>
        <Text style={styles.totalExpense}>RM{(Math.round(totalExpense * 100) / 100).toFixed(2)}</Text>
      </View>
    );
  }


  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <KeyboardAwareScrollView>
      <View >
        <SafeAreaView>
          <ScrollView>
            <NavigationEvents onWillFocus={fetchSales} />

              {renderHeadlineExpense()}

              <View>
                <FlatList
                    data={state}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                      const cart = phpUnserialize(item.cart);
                      const newTotalPrice = (Math.round(cart.totalPrice * 100) / 100).toFixed(2);

                      //console.log(cart.totalPrice);


                      var helpers = {
                        contains: function (input, arg) {
                          return Array.isArray(input) && input.some(x => x.includes(arg))
                        }
                      }

                      
                      const itemNames = jsonQuery('items[**][*item][*attributes][*name]', {
                        data: cart,
                        locals: helpers
                        }).value;

                      const itemPrices = jsonQuery('items[**][*item][*attributes][*price]', {
                        data: cart,
                        locals: helpers
                        }).value; 
                        
                      const itemCategories = jsonQuery('items[**][*item][*attributes][*category_id]', {
                        data: cart,
                        locals: helpers
                        }).value;   
                        
                      const item_ = jsonQuery('items[**][*item][*attributes]', {
                        data: cart,
                        locals: helpers
                        }).value;  

                      //console.log(itemCategories);


                      const t = item.created_at.split(/[- : T Z .]/);
                      const t_date = t[2];
                      const t_month = t[1]-1;
                      const t_year = t[0];
                      const t_hours = t[3];
                      const t_minutes = t[4];
                      const t_todaysDate = new Date(t_year, t_month, t_date)
                      const t_monthString =  t_todaysDate.toLocaleString('default', { month: 'long' });

                      return (
                        <View>

                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                          <Text style={styles.date}>{t_date} {t_monthString} {t_year}</Text>
                          <Text style={styles.totalPrice}></Text>
                        </View>
                      
                      <TouchableOpacity onPress={() => {
                        navigation.navigate('SalesDetails', {
                          cart: cart,
                          t: t
                          });
                        }}
                      >

                          <Card style={styles.card}>
                            <Card.Content style={styles.cardContent}>
                              <Icon size={40} name="store-alt" color="grey"/>
                              <View >
                                <Title style={styles.cardContentTitle}>Kedai Runcit Yam</Title>
                                <Paragraph style={styles.cardContentTimestamp}>{t_hours}:{t_minutes}</Paragraph>
                              </View>
                                <Paragraph style={styles.cardContentTotal}>RM{newTotalPrice}</Paragraph>
                            </Card.Content>
                          </Card> 
                        </TouchableOpacity> 

                      </View>

                      );
                    }}
                  />
              </View>

                
              <Button
                style={styles.logoutBtn}
                title="Logout"
                onPress={logout}
              />

          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAwareScrollView>
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
    fontSize:13
  },
  cardContentTotal: {
    width:80,
    marginLeft:20,
    marginRight:20,
    fontSize:15,
    fontWeight:"bold",
  }
});

export default HomeScreen;
