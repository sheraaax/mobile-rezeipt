import React, { useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { PieChart } from "react-native-chart-kit";
import { Context as SalesContext } from '../context/SalesContext';
import phpUnserialize from 'phpunserialize';
import jsonQuery from 'json-query';
import { FlatList } from 'react-native-gesture-handler';


const AnalysisScreen = () => {

  const { state, fetchSales } = useContext(SalesContext);

  const data = [
    {
      name: "Food",
      population: 4,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Drinks",
      population: 10,
      color: "black",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Stationary",
      population: 2,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Clothes",
      population: 5,
      color: "#777FFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Grocery",
      population: 9,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]

  return (
    <View>
      <SafeAreaView>
        <NavigationEvents onWillFocus={fetchSales} />
          <View style={styles.topTitle}>
            <View style={{marginLeft:20}}>
              <Text style={styles.titleTotal}>Total Expense</Text>
              <Text style={styles.titlePrice}>RM100.00</Text>
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

            <FlatList
              data={state}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const cart = phpUnserialize(item.cart);
              
                var helpers = {
                  contains: function (input, arg) {
                    return Array.isArray(input) && input.some(x => x.includes(arg))
                  }
                }

                const category = jsonQuery('items[**][*item][*attributes][*category_id]', {
                  data: cart,
                  locals: helpers
                  }).value;

                console.log(category[0]);

                // console.log(jsonQuery('items[**][*item][*attributes][category_id=1].category_id', {
                //   data: cart,
                //   locals: helpers
                // }).value);

                <View>
                  <Text>{category[0]}</Text>
                </View>


              }}
            />

      </SafeAreaView>
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
  },
  titlePrice: {
    fontSize:26,
    fontWeight:"bold",
    color:"#1C9C9B",
  },
  month: {
    width:60,
    fontSize:16,
    marginEnd:20,
  },
});

export default AnalysisScreen;
