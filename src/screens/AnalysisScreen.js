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
      color: "#0eaaa9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Drinks",
      population: 10,
      color: "#5c5c5c",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Stationary",
      population: 2,
      color: "#2bd9d8",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Clothes",
      population: 5,
      color: "#239594",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Grocery",
      population: 9,
      color: "#467271",
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
              <View style={styles.totalExpenseContainer}>
                <Text style={styles.titlePrice}>RM100.00</Text>
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
});

export default AnalysisScreen;
