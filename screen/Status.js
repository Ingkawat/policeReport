import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

const Status = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{paddingTop: 10}}>
        <View
          style={[styles.container, { backgroundColor: "white", height: 100 }]}
        >
          <View style={{ width: "20%", justifyContent: 'center', height: 100, alignItems:'center' }}>
          <Entypo name="text-document" size={50} color="black" />
          </View>
          <View style={{ width: "50%", justifyContent: 'center', height: 100 }}>
            <Text>asd</Text>
          </View>
          <View style={{ width: "30%", justifyContent: 'center', height: 100 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <AntDesign name="calendar" size={20} color="black" />
              <Text> 01/12/2564</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <AntDesign name="clockcircleo" size={20} color="black" />
              <Text> 12:00น.</Text>
            </View>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    width: "50%", // is 50% of container width
  },
});

export default Status;
