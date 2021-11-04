// import React, { useState, useEffect, useContext, Component } from "react";
// import {
//   Button,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   ScrollView,
//   ToastAndroid,
// } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import * as Locations from "expo-location";
import { LocationAccuracy } from "expo-location";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Locations.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Locations.getCurrentPositionAsync({accuracy: Locations.Accuracy.BestForNavigation})
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";

  return (
    <View style={styles.container}>
     
      {location == null ? (
        <Text>{text}</Text>
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }}
        >
          <Marker coordinate = {{latitude: location.coords.latitude,longitude: location.coords.longitude}}
         pinColor = {"purple"} // any color
         title={"title"}
         description={"description"}/>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Location;
