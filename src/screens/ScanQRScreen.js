import React, { Component, Fragment } from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { TouchableOpacity, Text, StatusBar, Linking, View } from 'react-native';
import { Context as SalesContext } from '../context/SalesContext';
import { Alert } from 'react-native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

class ScanQRScreen extends Component {
    static contextType = SalesContext;

    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            ScanResult: false,
            result: null
        };
    }

    onSuccess = (e) => {
        if(e.data.length != 16){
            Alert.alert(
                "Error",
                "This is not a valid QR! Please try again",
                [
                  { text: "OK"}
                ],
                { cancelable: false }
              )
              return;
        }
        console.log('Sales ID : ' + e.data);
        this.setState({
            result: e,
            scan: false,
            ScanResult: true
        }) 
        const {state, updateSale} =this.context
        this.context.updateSale(e.data)
    }

    activeQR = () => {
        this.setState({
            scan: true
        })
    }
    scanAgain = () => {
        this.setState({
            scan: false,
            ScanResult: false
        })
        this.props.navigation.navigate('Home')
    }
    render() {
        const { scan, ScanResult, result } = this.state;

        return (
            <View style={styles.scrollViewStyle}>
                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    <Text style={styles.textTitle}>Scan QR Code to receive receipt!</Text>
                    {!scan && !ScanResult &&
                        <View style={styles.inputView}>
                            <TouchableOpacity onPress={this.activeQR} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}>Click to Scan</Text>
                            </TouchableOpacity>

                        </View>
                    }

                    {ScanResult &&
                        <Fragment>
                            <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                                <Text>Your transaction has been scanned!</Text>
                                <Text>You have earned 10 points!</Text>
                                  <Text>Thank your for using our system.</Text>
                                 <Text> Sales ID : {result.data}</Text>
                                <TouchableOpacity onPress={this.scanAgain} style={styles.buttonTouchable}>
                                    <Text style={styles.buttonTextStyle}>View Receipt</Text>
                                </TouchableOpacity>

                            </View>
                        </Fragment>
                    }


                    {scan &&
                        <QRCodeScanner
                            reactivate={true}
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}

                            bottomContent={
                                <View>
                                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.setState({ scan: false })}>
                                        <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                                    </TouchableOpacity>
                                </View>

                            }
                        />
                    }
                </Fragment>
            </View>

        );
    }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
},

textTitle: {
  marginTop: 30,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black'
},
textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: 'black'
},
cardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
scanCardView: {
    width: deviceWidth - 32,
    height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
},
inputView:{
  backgroundColor:"white",
  borderRadius:25,
  height:50,
  marginBottom:50,
  justifyContent:"center",
  alignItems:"center",
  padding:20,
},
buttonScan: {
    width: 42,

},

highlight: {
    fontWeight: '700',
},

centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
},
textBold: {
    fontWeight: '500',
    color: '#000',
},
buttonTouchable: {
  width:deviceWidth-100,
  backgroundColor:"#1C9C9B",
  height:50,
  alignItems:"center",
  justifyContent:"center",
  borderRadius:25,
  marginTop:10,
  marginBottom:10,
  shadowColor:"#25cecd",
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowRadius:5,
  shadowOpacity:1.0
},
buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
}
});
export default ScanQRScreen;