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
import { Context as AuthContext} from "../context/AuthContext";
import axios from "axios";





const Status = () => {
  const {state, getReport} = useContext(AuthContext)
  const [ report, setreport ] = useState([])
  
  useEffect(() => {
    axios
        //use your ip address type in cmd ipconfig***
        .post(`http://192.168.1.37:3000/report/${state.username}`)
        .then((res) =>{
          setreport(res.data)
        })
        .catch((err) => {
            console.log(err)
        });
    
  },[]);

  console.log(report)

  

  
  return (
    
    <SafeAreaView>
      <ScrollView>
        <View style={{paddingTop: 10}}>
        {report.map((prop, key) => {
         return (
          <View style={[styles.container, { backgroundColor: "white", height: 100 }]} key={key}>
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
         );
      })}
        
        
        
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
