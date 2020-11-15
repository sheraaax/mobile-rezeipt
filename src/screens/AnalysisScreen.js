import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


const AnalysisScreen = () => {

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
      population: 11,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]

  return (
    <View>
      <SafeAreaView>
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
            height={220}
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
            paddingLeft="15"
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
    marginTop:30,
  },
  titleTotal: {
    fontSize:25,
  },
  titlePrice: {
    fontSize:26,
    fontWeight:"bold",
  },
  month: {
    width:60,
    fontSize:16,
    marginEnd:20,
  },
});

export default AnalysisScreen;
