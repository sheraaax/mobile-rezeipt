import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PieChart } from "react-native-chart-kit";
import { Context as SalesContext } from '../context/SalesContext';
import phpUnserialize from 'phpunserialize';
import jsonQuery from 'json-query';
import { FlatList } from 'react-native-gesture-handler';


const AnalysisScreen = () => {

  const { state, fetchSales } = useContext(SalesContext);

  let totalExpense = 0;
  state.forEach((item) => {
    const upCart = phpUnserialize(item.cart);
    total_price = upCart.totalPrice;
    totalExpense += total_price;
  })

  let foodCount = 0;
  let drinksCount = 0;
  let fruitsCount = 0;
  let dessertCount = 0;
  let stationeryCount = 0;
  let totalCount = 0;

  let foodPrice = 0;
  let drinksPrice = 0;
  let fruitsPrice = 0;
  let dessertPrice = 0;
  let stationeryPrice = 0;

  state.forEach((item) => {
    const upCart = phpUnserialize(item.cart);
    //console.log(upCart);

    const helpers = {
      contains: function (input, arg) {
        return Array.isArray(input) && input.some(x => x.includes(arg))
      }
    };
  
    const item_categories = jsonQuery('items[**][*item][*attributes][*category_id]', {
      data: upCart,
      locals: helpers
    }).value; 
    //console.log("categories: ",item_categories);

    const item_prices = jsonQuery('items[**][*item][*attributes][*price]', {
      data: upCart,
      locals: helpers
    }).value; 
    //console.log("price: ",item_prices);

    const items_ = jsonQuery('items[**][*item][*attributes]', {
      data: upCart,
      locals: helpers
    }).value; 
    //console.log("items_: ",items_);


    foodCount = items_.reduce((foodTotal, item) => (item.category_id === 1 ? foodCount+=1 : foodCount)
    , 0);
    //console.log('food id count: ',foodCount);
    
    drinksCount = items_.reduce((drinksTotal, item) => (item.category_id === 2 ? drinksCount+=1 : drinksCount)
    , 0);
    //console.log('drinks id count: ',drinksCount);

    fruitsCount = items_.reduce((fruitsTotal, item) =>  (item.category_id === 3 ? fruitsCount+=1 : fruitsCount)
    , 0);
    //console.log('fruits id count: ',fruitsCount);

    dessertCount = items_.reduce((dessertTotal, item) => (item.category_id === 4 ? dessertCount+=1 : dessertCount)
    , 0);
    //console.log('dessert id count: ',dessertCount);

    stationeryCount = items_.reduce((stationeryTotal, item) => (item.category_id === 5 ? stationeryCount+=1 : stationeryCount)
    , 0);
    //console.log('stationery id count: ',stationeryCount);

    totalCount = items_.reduce((total, item) => totalCount+=1 , 0);
    //console.log(totalCount);


    foodPrice = items_.reduce((foodTotal, item) => (item.category_id === 1 ? foodPrice+=item.price : foodPrice)
    , 0);
    console.log('food id price: ',foodPrice);

    drinksPrice = items_.reduce((drinksTotal, item) => (item.category_id === 2 ? drinksPrice+=item.price : drinksPrice)
    , 0);
    console.log('drinks id price: ',drinksPrice);

    fruitsPrice = items_.reduce((fruitsTotal, item) => (item.category_id === 3 ? fruitsPrice+=item.price : fruitsPrice)
    , 0);
    console.log('fruits id price: ',fruitsPrice);

    dessertPrice = items_.reduce((dessertTotal, item) => (item.category_id === 4 ? dessertPrice+=item.price : dessertPrice)
    , 0);
    console.log('dessert id price: ',dessertPrice);

    stationeryPrice = items_.reduce((stationeryTotal, item) => (item.category_id === 5 ? stationeryPrice+=item.price : stationeryPrice)
    , 0);
    console.log('stationery id price: ',stationeryPrice);

  })

  
  const data = [
    {
      name: "Food",
      population: foodCount,
      color: "#0eaaa9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      categoryPrice: foodPrice,
    },
    {
      name: "Drinks",
      population: drinksCount,
      color: "#5c5c5c",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      categoryPrice: drinksPrice,
    },
    {
      name: "Fruits",
      population: fruitsCount,
      color: "#2bd9d8",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      categoryPrice: fruitsPrice,
    },
    {
      name: "Dessert",
      population: dessertCount,
      color: "#239594",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      categoryPrice: dessertPrice,
    },
    {
      name: "Stationery",
      population: stationeryCount,
      color: "#467271",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
      categoryPrice: stationeryPrice,
    },

  ]

  return (
    <View>
      <KeyboardAwareScrollView>
      <SafeAreaView>
        <NavigationEvents onWillFocus={fetchSales} />
          <View style={styles.topTitle}>
            <View style={{marginLeft:20}}>
              <Text style={styles.titleTotal}>Total Expense</Text>
              <View style={styles.totalExpenseContainer}>
                <Text style={styles.titlePrice}>RM{(Math.round(totalExpense * 100) / 100).toFixed(2)}</Text>
              </View>
            </View>
            <Text style={styles.month}>Nov 20</Text>
          </View>
        
        
          <PieChart
            data={data}
            width={Dimensions.get("window").width}
            height={270}
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#08130D",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="30"
            absolute
          />

          <View style={{alignItems:'center'}}>
            <Text>8 expenses, 5 categories</Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={item => item.name}
            renderItem={({item}) => {
              const percentage = (Math.round(item.population * 100) / totalCount).toFixed(1);
              const total = (Math.round(item.categoryPrice * 100) / 100).toFixed(2);
            
              return (
                <Card style={styles.card}>
                  <Card.Content style={styles.cardContent}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Icon size={25} name="angle-right" color="#1C9C9B"/>
                      <Title style={{marginLeft:7}}>{item.name}</Title>
                      <Paragraph style={{marginLeft:3}}>({percentage}%)</Paragraph>
                    </View>
                    <View>
                      <Paragraph>Total: RM{total}</Paragraph>
                    </View>
                  </Card.Content>
                </Card> 
              )
            }}
          />
          

      </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  topTitle: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:50,
    marginBottom:20,
  },
  titleTotal: {
    fontSize:25,
    marginBottom:10,
  },
  titlePrice: {
    fontSize:26,
    fontWeight:"bold",
  },
  totalExpenseContainer: {
    backgroundColor:"#1C9C9B",
    padding:10,
    width:200,
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
  month: {
    width:60,
    fontSize:16,
    marginEnd:20,
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
});

export default AnalysisScreen;
