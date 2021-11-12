import React, { useState, useContext } from "react";
import { ScrollView, Text, View, SafeAreaView, StyleSheet, Button } from "react-native";
import axios from "axios";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import policeData from "../thiitangsthaaniitamrwcchnkhrbaal-.json";
import { Picker } from "@react-native-picker/picker";
import { Context as AuthContext  } from '../context/AuthContext';


const sendPushNotification = () => {
  let response = fetch('https://exp.host/--/api/v2/push/send',{
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: 'ExponentPushToken[EXdESYPsl2mVuDVHVMaMtS]',
      sound: 'default',
      title: 'NEW REPORT IS COMING',
      body: 'REPORT!!!!!!'
    })
  })
}


const addReport = (idcard, station, lostPaper) => {
  axios
        //use your ip address type in cmd ipconfig***
        .post(`http://192.168.1.37:3000/report/important/${idcard}`, {
          report_type: "เอกสารหาย",
          station: station
        })
        .then( async (res) => {
          axios.post("http://192.168.1.37:3000/report/important", {missing_type: lostPaper})
               .then( async (res) => {sendPushNotification()})
               .catch((err) => {console.log(err)});
        })
        .catch((err) => {

            console.log(err)
        
        });
}

function ReportDocument() {
  const {state} = useContext(AuthContext);
  const [selectStation, setselectStation] = useState();
  const [selectlostPaper, setSelectlostPaper] = useState();
  const police_station = ['-']
  for(let i = 0; i < policeData.features.length; i++){
    police_station.push(policeData.features[i].properties.name)
  }
  const importantPaper = ['-','ตั๋วจำนำ',
    'บัตรสวัสดิการแห่งรัฐ' ,
    'สมุดบัญชีธนาคาร' ,
    'สลากออมสิน',
    'โฉนดที่ดิน',
    'ใบสำคัญการสมรส',
    'ใบรับรองผลการเรียน',
    'ใบกรมธรรม์',
    'ใบคู่มือการจดทะเบียนรถ' ]
  return (
    <View>
      <Picker
        selectedValue={selectStation}
        onValueChange={(itemValue, itemIndex) => setselectStation(itemValue)}
      >
        {police_station.map((prop, key) => {
         return (
          //  <Button style={{borderColor: prop[0]}}  key={key}>{prop[1]}</Button>
           <Picker.Item label={prop} value={prop}key={key} />
         );})}
        
      </Picker>
      <Picker
        selectedValue={selectlostPaper}
        onValueChange={(itemValue, itemIndex) => setSelectlostPaper(itemValue)}
      >
        {importantPaper.map((prop, key) => {
         return (
          //  <Button style={{borderColor: prop[0]}}  key={key}>{prop[1]}</Button>
           <Picker.Item label={prop} value={prop}key={key} />
         );})}
        
      </Picker>
      <Text>รายละเอียดเพิ้มเติม</Text>
      <Button title="แจ้งความ" onPress={()=>{addReport(state.username, selectStation, selectlostPaper)}}/>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default ReportDocument;
