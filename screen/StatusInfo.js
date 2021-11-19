import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, Button} from "react-native";
import axios from "axios";
import { render } from "react-dom";
import * as Linking from 'expo-linking';

const StatusInfo = ({route}) => {
    const [info, setInfo] = useState(null)
    const {report_id,police_id,report_type} = route.params

    useEffect(async()=>{
        if(report_type == "เอกสารหาย"){
            if(police_id == null){
        await axios.post(`http://192.168.1.37:3000/join_important/${report_id}`)
        .then((res) => {
            setInfo(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
        }else if(police_id != null){
            await axios.post(`http://192.168.1.37:3000/join_important/police/${report_id}`)
            .then((res) => {
                setInfo(res.data)
               
              })
              .catch((err) => {
                console.log(err);
              });
        }
        }else if(report_type == "แจ้งคนหาย"){
            if(police_id == null){
            await axios.post(`http://192.168.1.37:3000/join_missing/${report_id}`)
            .then((res) => {
                setInfo(res.data)
              })
              .catch((err) => {
                console.log(err);
              });
            }
            else if(police_id != null){
                await axios.post(`http://192.168.1.37:3000/join_missing/police/${report_id}`)
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
      <View>
        {info !== null ? 
        <View style={{margin: 25}}>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17.5}}>{info.missing_type}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Taker</Text>
          <Image style={{height: 150, width: 150, borderRadius: 25}}source={{uri:"http://192.168.1.113:3000/"+info.imageuser}}/>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.f_name} {info.l_name}</Text>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Police ID</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.police_id}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Phone</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.phonenumber}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Email</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.email}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Status</Text>
        {info.status === 'success' ? <Text style={{fontWeight: 'bold', fontSize: 15, color: '#157347'}}>{info.status}</Text> : info.status === 'inprocess' ? <Text style={{fontWeight: 'bold', fontSize: 15, color: '#0d6efd'}}>{info.status}</Text> : <Text style={{fontWeight: 'bold', fontSize: 15, color: '#ffc823'}}>{info.status}</Text>}
        {info.approve_file == null ? null : <Button title="File" onPress={()=>{Linking.openURL("http://192.168.1.37:3000/"+info.approve_file.slice(8))}}/>}
      </View>
        :
        <Text>Loading</Text>
        }
      </View>
        :
      <View>
        {info !== null ? 
        <View style={{margin: 25}}>
        <View style={{alignItems: 'center' , paddingBottom: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17.5}}>แจ้งคนหาย</Text>
          <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Taker</Text>
          <Image style={{height: 150, width: 150, borderRadius: 25}} source={{uri:"http://192.168.1.113:3000/"+info.imageuser}}/>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.f_name} {info.l_name}</Text>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Police ID</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.police_id}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Phone</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.phonenumber}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Email</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.email}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Details</Text>
        {info.missing_des === '' ? <Text style={{fontWeight: 'bold', fontSize: 15}}>-</Text> : <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.missing_des}</Text>}
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Status</Text>
        {info.status === 'success' ? <Text style={{fontWeight: 'bold', fontSize: 15, color: '#157347'}}>{info.status}</Text> : info.status === 'inprocess' ? <Text style={{fontWeight: 'bold', fontSize: 15, color: '#0d6efd'}}>{info.status}</Text> : <Text style={{fontWeight: 'bold', fontSize: 15, color: '#ffc823'}}>{info.status}</Text>}
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
