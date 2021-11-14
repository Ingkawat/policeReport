import React, { useState, useEffect, useContext } from "react";
import { ListItem } from "react-native-elements";
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

const Goodpeople = ({route}) => {
    const {id} = route.params
    const [text, setText] =  useState([])
    
    useEffect(() => {
        axios
            //use your ip address type in cmd ipconfig***
            .post("http://192.168.1.36:3000/goodpeople", {
                id: id
              })
            .then((res) =>{
              setText(res.data)
              console.log(res.data)            
            })
            .catch((err) => {
                console.log(err)
            });
        
      },[]);
   

    return(
        <ScrollView>
        {text.map((item, i) => {
          return ( 
            <ListItem key={i} >
              <ListItem.Content>
                <ListItem.Title>{item.good_peopleid}</ListItem.Title>
                <ListItem.Subtitle>{item.good_des}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
           ); 
        })}
    </ScrollView>
    )
}

export default Goodpeople;