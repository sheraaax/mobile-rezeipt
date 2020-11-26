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

const SalesDetailsScreen = ({route}) => {

    const { state, fetchSales } = useContext(SalesContext);
    
    const cart = phpUnserialize(state[0].cart);
    //console.log('totalPrice cart: ', cart.totalPrice);
    //console.log(cart.items);

    const helpers = {
        contains: function (input, arg) {
          return Array.isArray(input) && input.some(x => x.includes(arg))
        }
    };

    const itemPrices = jsonQuery('items[**][*item][*attributes][*price]', {
        data: cart,
        locals: helpers
    }).value; 
        
    const item_ = jsonQuery('items[**][*item][*attributes]', {
        data: cart,
        locals: helpers
    }).value; 
    console.log(item_);
        
    const items = jsonQuery('items[**]', {
        data: cart,
        locals: helpers
    }).value; 
    //console.log(items);

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
                <Text style={styles.timestamp}>Date: 16 Nov 2020</Text>
                <Text style={styles.timestamp}>Time: 15:23:22</Text>
            </View>

                <FlatList 
                    data={item_}
                    keyExtractor={(item,i) => i}
                    renderItem={({item}) => {
                        console.log('inside flatlist:' +item.name);

                        function checkItemCategory() {
                            switch(item.category_id) {
                                case 1:
                                    return (
                                        <View style={{flexDirection:'row', marginBottom:10 }}>
                                            <Icon size={25} name="utensils" color="grey"/>
                                            <Text style={styles.categoryCardTitle}>Food</Text>
                                        </View>
                                        );
                                case 2:
                                    return (
                                        <View style={{flexDirection:'row', marginBottom:10}}>
                                            <Icon size={25} name="wine-glass" color="grey"/>
                                            <Text style={styles.categoryCardTitle}>Drinks</Text>
                                        </View>
                                        );
                                default:
                                    return item.category_id;
                            }
                        }

                        return(
                        <View>
                            <Card style={styles.card}>
                                <Card.Content>
                
                                    {checkItemCategory()}
                                    
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{width:180 }}>
                                            <Title>{item.name} x1</Title>
                                            <Paragraph>{item.description}</Paragraph>
                                        </View>
                                        <View style={{width:70, marginLeft:5, justifyContent:'flex-end' }}>
                                            <Paragraph>Price:</Paragraph>
                                            <Paragraph>Subtotal:</Paragraph>
                                        </View>
                                        <View style={{width:85, marginLeft:5, justifyContent:'flex-end', alignItems:'center' }}>
                                            <Paragraph>RM{(Math.round(item.price * 100) / 100).toFixed(2)}</Paragraph>
                                            <Paragraph style={{fontWeight:'bold'}}>RM{(Math.round(item.price * 100) / 100).toFixed(2)}</Paragraph>
                                        </View>
                                    </View>
                                    <Paragraph></Paragraph>
                                </Card.Content>
                            </Card> 
                                
                            {/* {renderItemName()} */}
                            

                        </View>
                        );
                    }}
                />


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