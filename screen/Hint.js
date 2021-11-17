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
            .post("http://192.168.1.113:3000/hint", {
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
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{borderBottomWidth: 1, borderBottomColor: "#E4DFD9"}}>
        {report.map((prop, key) => {
         return (
          <TouchableOpacity onPress={()=> navigation.navigate("ReportHint",{id:report[key].id})}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 5}} key={key}>
            <View style={{flexDirection: 'column', width: '25%', height: 100, justifyContent: 'center'}}>
              <Image source={{uri: "http://192.168.1.113:3000/"+prop.image_people}} style={{ width: '90%', height: '90%', borderRadius: 10 }}/>
            </View>
            <View style={{flexDirection: 'column', width: '45%', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>{prop.missing_name}</Text>
              <Text>{prop.missing_des}</Text>
            </View>
            <View style={{flexDirection: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name="calendar" size={15} color="black" />
              <Text style={{fontSize: 11}}>{prop.date}</Text>
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