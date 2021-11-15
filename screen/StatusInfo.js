import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet} from "react-native";
import axios from "axios";

const StatusInfo = ({route}) => {
    const [info, setInfo] = useState(null)
    const {report_id,police_id,report_type} = route.params

    useEffect(async()=>{
        if(report_type == "เอกสารหาย"){
            if(police_id == null){
        await axios.post(`http://192.168.1.113:3000/join_important/${report_id}`)
        .then((res) => {
            setInfo(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
        }else if(police_id != null){
            await axios.post(`http://192.168.1.113:3000/join_important/police/${report_id}`)
            .then((res) => {
                setInfo(res.data)
               
              })
              .catch((err) => {
                console.log(err);
              });
        }
        }else if(report_type == "แจ้งคนหาย"){
            if(police_id == null){
            await axios.post(`http://192.168.1.113:3000/join_missing/${report_id}`)
            .then((res) => {
                setInfo(res.data)
              })
              .catch((err) => {
                console.log(err);
              });
            }
            else if(police_id != null){
                await axios.post(`http://192.168.1.113:3000/join_missing/police/${report_id}`)
                .then((res) => {
                    setInfo(res.data)
                  })
                  .catch((err) => {
                    console.log(err);
                  });

            }
        }
    }, [])

    console.log(info)
    
    return(
    <View style={{backgroundColor: 'white', height:'100%'}}>
      {report_type == "เอกสารหาย" ?
      <View style={{backgroundColor: '#E4DFD9', margin: 20, borderRadius: 25}}>
        {info !== null ? 
        <View style={{margin: 20}}>
          <Text>คนรับเรื่อง</Text>
          <Text>ชื่อ : {info.f_name} นามสกุล : {info.l_name}</Text>
          <Text>mail : {info.email}</Text>
          <Text>Phone : {info.phonenumber}</Text>
          
          <Text>เรื่อง : {info.missing_type}</Text>
          <Text>Police ID : {info.police_id}</Text>
          <Text>สถานะ : {info.status}</Text>
        </View>
        :
        <Text>Loading</Text>
        }
      </View>
        :
      <View style={{backgroundColor: '#E4DFD9', margin: 20, borderRadius: 25}}>
        {info !== null ? 
        <View style={{margin: 20}}>
          <Text>คนรับเรื่อง</Text>
          <Text>ชื่อ : {info.f_name} นามสกุล : {info.l_name}</Text>
          <Text>mail : {info.email}</Text>
          <Text>Phone : {info.phonenumber}</Text>
          
          <Text>รายละเอียดเพิ่มเติม : {info.des}</Text>
          <Text>Police ID : {info.police_id}</Text>
          <Text>สถานะ : {info.status}</Text>
        </View>
        :
        <Text>Loading</Text>
        }
      </View>
      }      
    </View>
    )
}

const styles = StyleSheet.create({

})

export default StatusInfo;