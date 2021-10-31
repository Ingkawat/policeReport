import React, { useState, useEffect, useContext, Component } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions ,
  ScrollView,
  ToastAndroid,
} from "react-native";



import MapView, {Marker} from 'react-native-maps';





const Location = () => {


        return (
          <View style={styles.container}>
            <MapView style={styles.map} 
            region={{latitude: 13.736717,
              longitude: 100.523186,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,}}
            
          >
           
            </MapView>


            
          </View>
        );

    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    });



export default Location;
