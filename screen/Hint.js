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



const Hint = ({navigation}) => {

    const [ report, setreport ] = useState([])


    useEffect(() => {
        axios
            //use your ip address type in cmd ipconfig***
            .post("http://192.168.1.36:3000/hint", {
                report_type: "แจ้งคนหาย",
                status: "inprocess"
              })
            .then((res) =>{
              setreport(res.data)
              console.log(res.data)
    
            })
            .catch((err) => {
                console.log(err)
            });
        
      },[]);
   
     
      
    return (
    <SafeAreaView>
      <ScrollView>
        <View style={{paddingTop: 10}}>
        {report.map((prop, key) => {
         return (
          <TouchableOpacity onPress={()=> navigation.navigate("ReportHint",{id:report[key].id})}>
          <View style={[styles.container, { backgroundColor: "white", height: 100 }]} key={key}>
          <View style={{ width: "20%", justifyContent: 'center', height: 100, alignItems:'center' }}>
            <Image source={{uri: "http://192.168.1.36:3000/"+prop.image_people}} style={{ width: 100, height: 100 }}/>
          </View>
          <View style={{ width: "10%", justifyContent: 'center', height: 100 }}>
            <Text>{prop.missing_name}</Text>
          </View>
          <View style={{ width: "40%", justifyContent: 'center', height: 100 }}>
            <Text>{prop.missing_des}</Text>
          </View>
          <View style={{ width: "30%", justifyContent: 'center', height: 100 }}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <AntDesign name="calendar" size={20} color="black" />
              <Text> {prop.date}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
         );
      })}

        
        
        
        </View>
      </ScrollView>
    </SafeAreaView>
            

    )
    
}
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

export default Hint;