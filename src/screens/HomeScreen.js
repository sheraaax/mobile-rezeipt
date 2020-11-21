import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { Card, Title, Paragraph, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as SalesContext } from '../context/SalesContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import phpUnserialize from 'phpunserialize';
import jsonQuery from 'json-query';


const HomeScreen = () => {

  const { logout } = useContext(AuthContext);
  const { state, fetchSales } = useContext(SalesContext);
  
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  // const hours = new Date().getHours();
  // const minutes = new Date().getMinutes();
  const todaysDate = new Date(year, month, date)
  const monthString =  todaysDate.toLocaleString('default', { month: 'long' });


  function renderHeadlineExpense() {
    return (
      <View>
        <Text style={styles.headline}>{monthString} Expenses</Text>
        <Text style={styles.totalExpense}>RM100.00</Text>
      </View>
    );
  }


  return (
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

                      var helpers = {
                        contains: function (input, arg) {
                          return Array.isArray(input) && input.some(x => x.includes(arg))
                        }
                      }

                      const categories = jsonQuery('items[**][*item][*attributes][*category_id]', {
                        data: cart,
                        locals: helpers
                        }).value;

                        console.log(categories, categories[0]);


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
                      
                        <Card style={styles.card}>
                          <Card.Content style={styles.cardContent}>
                            <Icon size={40} name="store-alt" color="grey"/>
                            <View >
                              <Title style={styles.cardContentTitle}>Xen Lit Trading</Title>
                              <Paragraph style={styles.cardContentTimestamp}>{t_hours}:{t_minutes}</Paragraph>
                            </View>
                              <Paragraph style={styles.cardContentTotal}>RM{newTotalPrice}</Paragraph>
                          </Card.Content>
                        </Card>  

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
