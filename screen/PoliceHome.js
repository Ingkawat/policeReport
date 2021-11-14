import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { ListItem } from "react-native-elements";
import axios from "axios";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const registerForPushNotificationsAsync = async() => {
  
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if(status != 'granted'){
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  }
  if(status != 'granted'){
    alert('Fail to get Token')
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token 
}

const PoliceHome = ({navigation})=>{
    const {state, clearLocal} = useContext(AuthContext)
    const [report , setReport] = useState([])

    const updateToken = (token, id) =>{
      axios
      //use your ip address type in cmd ipconfig***
      .post(`http://192.168.1.36:3000/updateToken/${token}/${id}`)
      .then( async (res) => {
        console.log("update Token")
      })
      .catch((err) => {
    
          console.log(err)
      
      });
    }
     
    useEffect(() => {
      registerForPushNotificationsAsync().then(token=>updateToken(token, state.username)).catch(err=>console.log(err))
          axios
            //use your ip address type in cmd ipconfig***
            .post(`http://192.168.1.36:3000/report/police/${state.username}`)
            .then((res) =>{
                setReport(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
        
    
    },[]);



    return(
        <ScrollView>
        {report.map((item, i) => {
          return ( 
            <ListItem key={i} onPress={()=>navigation.navigate("Approve", {report_id: item.report_id, user_id: item.userid_card, police_id: state.username,report_type:item.report_type})}>
              <ListItem.Content>
                <ListItem.Title>{item.report_type}</ListItem.Title>
                <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
                <ListItem.Subtitle>test</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
           ); 
        })}
        <Button title="logout" onPress={()=>{clearLocal()}}/>
      </ScrollView>
    )
}

export default PoliceHome;