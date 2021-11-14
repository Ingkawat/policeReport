import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
  ImageBackground,
  Linking
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { Context as AuthContext } from "../context/AuthContext";
import axios from "axios";


const ReportHint = ({navigation,route}) => {
    const {state} = useContext(AuthContext);
    const id = route.params.id
    const [report, setReport] = useState("")
   const confirmreporthint = () =>{
    axios
    .put("http://192.168.1.36:3000/report/reporthint",{
        report:report,
        id:id,
        idcard:state.username
    })
    .then( async (res) => {
      console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    });
   }
return(
    <View style={{ width: "80%" }}>
    <Text style={{ marginTop: 10 }}>แจ้งเบาะแส</Text>
    <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
      <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
        <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} placeholder="แจ้งเบาะแส" onChangeText={(value) => {setReport(value)}}/>
      </View>
      </View>
      <Button title="ยืนยันการแจ้งเบาะแส" onPress={()=>{confirmreporthint()}}></Button>
    </View>
)

}

export default ReportHint;