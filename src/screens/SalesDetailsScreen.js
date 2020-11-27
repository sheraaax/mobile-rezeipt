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

const SalesDetailsScreen = ({route, navigation}) => {

    const { state, fetchSales } = useContext(SalesContext);

    const cart = navigation.getParam('cart');
    const t = navigation.getParam('t');
    const t_date = t[2];
    const t_month = t[1]-1;
    const t_year = t[0];
    const t_hours = t[3];
    const t_minutes = t[4];
    const t_seconds = t[5];
    const t_todaysDate = new Date(t_year, t_month, t_date)
    const t_monthString =  t_todaysDate.toLocaleString('default', { month: 'long' });

    // const boughtItems = cart.items;
    // console.log(boughtItems);

    const helpers = {
        contains: function (input, arg) {
          return Array.isArray(input) && input.some(x => x.includes(arg))
        }
    };

    const items = jsonQuery('items[**][*item][*attributes]', {
        data: cart,
        locals: helpers
    }).value; 
    //console.log(items);

    const itemCategories = jsonQuery('items[**][*item][*attributes][*category_id]', {
        data: cart,
        locals: helpers
    }).value; 
    //console.log(itemCategories);

    // const itemNames = jsonQuery('items[**][*item][*attributes][*name]', {
    //     data: cart,
    //     locals: helpers
    // }).value; 
    //console.log(itemNames);

    const itemDescriptions = jsonQuery('items[**][*item][*attributes][*description]', {
        data: cart,
        locals: helpers
    }).value; 
    console.log(itemDescriptions);

    const itemPrices = jsonQuery('items[**][*item][*attributes][*price]', {
        data: cart,
        locals: helpers
    }).value; 
    //console.log(itemPrices);
        

    function renderItemName() {

        const itemNames = jsonQuery('items[**][*item][*attributes][*name]', {
            data: cart,
            locals: helpers
        }).value;

        return itemNames.map((itemName,i) => <Text style={{marginLeft:10,color:'green'}} key={i}>{itemName}</Text> )
    };
    

    return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <KeyboardAwareScrollView>
        <View>
            <SafeAreaView>
            
            <View style={{alignItems:'center'}}>
                <View style={styles.storeBorder}>
                    <Text style={styles.storeName}>Kedai Runcit Yam</Text>
                </View>
            </View>

            <View>
                <Text style={styles.totalPriceHeadline}>Total Price</Text>
                <View style={{alignItems:'center'}}>
                    <View style={styles.totalPriceBorder}>
                        <Text style={styles.totalPrice}>RM{(Math.round(cart.totalPrice * 100) / 100).toFixed(2)}</Text>
                    </View>
                </View>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.timestamp}>Date: {t_date} {t_monthString} {t_year}</Text>
                <Text style={styles.timestamp}>Time: {t_hours}:{t_minutes}:{t_seconds}</Text>
            </View>

        {renderItemName()}

                


            </SafeAreaView>
        </View>
    </KeyboardAwareScrollView>
    </View>
    )
};

const styles = StyleSheet.create({
    timestamp: {
        margin:20
    },
    storeName: {
        padding:15,
        fontSize:30,
        fontWeight:'bold',
    },
    storeBorder: {
        backgroundColor:"#1C9C9B",
        marginTop:30,
        marginBottom:5,
        width: 320,
        alignItems:'center',
        borderRadius:30,
        shadowColor:"grey",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius:5,
        shadowOpacity:1.0

    },
    totalPriceHeadline: {
        fontSize:19,
        marginLeft:25,
        marginTop:25,
        marginBottom:5,
        fontWeight:'bold'
    },
    totalPrice: {
        fontSize:30,
        fontWeight:'bold',
        padding:7,
    },
    totalPriceBorder: {
        backgroundColor:"#1C9C9B",
        marginTop:5,
        marginBottom:15,
        alignItems:'center',
        width:250,
        borderRadius:30,
        shadowColor:"grey",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius:5,
        shadowOpacity:1.0
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
    categoryCardTitle: {
        fontSize:24,
        marginLeft:10,
        fontWeight:'bold',
        color:"#1C9C9B",
    }
});

export default SalesDetailsScreen;