import React, {useState, useEffect} from "react";
import { View,  Text, Button, Image,Linking, ScrollView} from "react-native";
import * as DocumentPicker from 'expo-document-picker';

import axios from "axios";
import { Platform } from "expo-modules-core";



const Approve = ({route, navigation}) => {
    const {report_id, user_id, police_id, report_type} = route.params
    const [report,setReport] = useState(null)

const makecall = (phone) =>{
  let phonenumber = phone
  if(Platform.OS === 'android'){
    phonenumber = 'tel:('+phonenumber+')'
  }else{
    phonenumber = 'tel:('+phonenumber+')'
  }

  Linking.openURL(phonenumber)
}

    
    

    useEffect(async() => {
    
      if(report_type == "เอกสารหาย"){
      await axios
          .post(`http://192.168.1.113:3000/report/pending/${report_id}/${police_id}`)
          .then((res) => {
            console.log(res.data);
            //
          })
          .catch((err) => {
            console.log(err);
          });
        }
        else if (report_type == "แจ้งคนหาย"){
          await axios
          .post(`http://192.168.1.113:3000/report/pending/${report_id}/${police_id}`)
          .then(async (res) => {
            await axios
            .put(`http://192.168.1.113:3000/report/missingpeople/detail`,{
              report_id:report_id 
            })
            .then(async(res) => {
               setReport(res.data)          
            })
            .catch((err) => {
              console.log(err);
            });
          })
          .catch((err) => {
            console.log(err);
          });
        }
    },[])


    const Approve = async (report_id) =>{
      await axios
      .post(`http://192.168.1.113:3000/report/pending/status/success`,{
        report_id:report_id
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    }


    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({})
        let doc = {uri: result.uri, name: result.name, type: 'application/pdf'}
        const data = new FormData();
        console.log(doc)
        console.log(result.uri)
        data.append("userid_card", user_id)
        data.append("id", report_id)
        data.append("image", doc)
        await axios
          .post("http://192.168.1.113:3000/users", data)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("Doc: " + doc.uri);
    }
    return(
    <View style={{backgroundColor: 'white', height:'100%'}}>
    {report_type == "เอกสารหาย" ? 
    <View style={{ margin: 25}}>
      <Button title="select file" onPress={() => pickDocument()}/>
      <View style={{paddingBottom: 10}}/>
      <Button title="Approve!!!" onPress={() => navigation.popToTop()}/>
    </View>
    :
    <ScrollView>
      {report != null ? 
      <View style={{ margin: 25}}>
        <View style={{alignItems: 'center' , paddingBottom: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17.5}}>แจ้งคนหาย</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>ข้อมูลผู้หาย</Text>
          <Image source={{uri:"http://192.168.1.113:3000/"+report[0].image_people}} style={{ width: 100, height: 100, borderRadius: 25 }}></Image>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{report[0].missing_name}</Text>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>ID Card</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{report[0].missing_idcard}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Details</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{report[0].missing_des}</Text>
        <View>
          <View style={{alignItems: 'center' , paddingBottom: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>ข้อมูลผู้แจ้ง</Text>
          <Image source={{uri:"http://192.168.1.113:3000/"+report[0].imageuser}} style={{ width: 100, height: 100, borderRadius: 25 }}></Image>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{report[0].f_name} {report[0].l_name}</Text>
        </View>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>ID Card</Text>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{user_id}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Email</Text>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{report[0].email}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>เวลาที่แจ้ง</Text>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{report[0].date}</Text>
        </View>
        <View style={{paddingBottom: 10}}/>
        <Button title="call" onPress={()=>{makecall(report[0].phonenumber)}}/>
        <View style={{paddingBottom: 10}}/>
        <Button title="เบาะแส จากผู้คน" onPress={() => navigation.navigate("Goodpeople",{id:report[0].id})}/>
        <View style={{paddingBottom: 10}}/>
        <Button title="Approve!!!" onPress={() => {Approve(report_id),navigation.popToTop()}}/>
      </View>
      :
      <Text>loading</Text>
      }
    </ScrollView> 
    
}
</View>
    )
    
}

export default Approve;