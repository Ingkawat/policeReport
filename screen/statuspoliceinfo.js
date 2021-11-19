import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image,ScrollView, TouchableOpacity} from "react-native";
import axios from "axios";
import { render } from "react-dom";
import { ListItem } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { color } from "react-native-elements/dist/helpers";

const statuspoliceinfo = ({navigation,route}) => {
    const [info, setInfo] = useState(null)
    const {id} = route.params

    useEffect(async()=>{
        axios
        //use your ip address type in cmd ipconfig***
        .post(`http:/192.168.1.113:3000/statuspoliceinfo`,{
            iduser:id
        })
        .then((res) => {
            setInfo(res.data);
            console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])
console.log(info)

    const success = () =>{
        axios
        //use your ip address type in cmd ipconfig***
        .post(`http:/192.168.1.113:3000/police/success`,{id:id})
        .then(() => {
    
        })
        .catch((err) => {
          console.log(err);
        });
      }
    
    
    return(
        <ScrollView>
            {info != null ?
            <View>
        {info.map((item, i) => {
          return ( 
            <ListItem key={i} >
              <ListItem.Content>
                <ListItem.Title>เวลาที่แจ้งมา {item.date}</ListItem.Title>
                <ListItem.Subtitle>รายละเอียดที่แจ้งมา {item.dataofpeople}</ListItem.Subtitle>
                <ListItem.Subtitle>คนแจ้ง {item.id_card}</ListItem.Subtitle>
                <ListItem.Subtitle>ชื่อ {item.f_name} นามสกุล {item.l_name}</ListItem.Subtitle>
                <ListItem.Subtitle>เบอร์ {item.phonenumber} อีเมล {item.email}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
           ); 
        })}
        </View>
        :<Text>loading....</Text>
        }
        <View>
          <View style={{paddingBottom: 15}}/>
        <TouchableOpacity onPress={()=>{navigation.navigate("statuspolice"),success()}} style={{backgroundColor: '#9ae66d', height: 40, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 20}}>เปลี่ยนสถานะเสร็จสิ้น</Text>
        </TouchableOpacity>
        </View>
     
    </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default statuspoliceinfo;