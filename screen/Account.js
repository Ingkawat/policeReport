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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as AuthContext } from "../context/AuthContext";
import EditProfile from "./EditProfile";

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Account = ({navigation}) => {


  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[
            styles.row,
            { alignItems: "center", justifyContent: "center", paddingTop: 20 },
          ]}
        >
          <View style={{ flexDirection: "column" }}>
            <Image
              style={[styles.imgProfile]}
              source={require("../assets/icon.png")}
            />
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <View style={styles.row}>
              <Text style={{ paddingLeft: 10, fontSize: 20 }}>
                Xxxxxxxxxx xxxxxxxxxxxxx
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.navigate("EditProfile")}>
                <Text style={{ textDecorationLine: "underline", fontSize: 13 }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingTop: 30 }}>
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
              onPress={() => navigation.navigate("Location")}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
                <Entypo name="location" size={15} color="black" /> My Location
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={15}
                  color="black"
                />{" "}
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
                <Entypo name="help" size={15} color="black" /> Help
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              clearLocal();
            }}
            style={{ fontSize: 15, paddingTop: 20 }}
          >
            <Text>
              Logout <MaterialIcons name="logout" size={15} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 10,
  },
  imgProfile: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 60,
  },
});

export default Account;