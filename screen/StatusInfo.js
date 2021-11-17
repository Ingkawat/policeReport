import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image} from "react-native";
import axios from "axios";
import { render } from "react-dom";

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
      <View>
        {info !== null ? 
        <View style={{margin: 25}}>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 17.5}}>{info.missing_type}</Text>
          <Image style={{height: 150, width: 150, borderRadius: 25}}source={{uri:"http://192.168.1.113:3000/"+info.imageuser}}/>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Taker</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.f_name} {info.l_name}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Police ID</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.police_id}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Phone</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.phonenumber}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Email</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.email}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Status</Text>
        {info.status === 'success' ? <Text style={{fontWeight: 'bold', fontSize: 15, color: '#157347'}}>{info.status}</Text> : info.status === 'inprocess' ? <Text style={{fontWeight: 'bold', fontSize: 15, color: '#0d6efd'}}>{info.status}</Text> : <Text style={{fontWeight: 'bold', fontSize: 15, color: '#ffc823'}}>{info.status}</Text>}
      </View>
        :
        <Text>Loading</Text>
        }
      </View>
        :
      <View>
        {info !== null ? 
        <View style={{margin: 25, borderWidth: 1}}>
        <View style={{alignItems: 'center' , paddingBottom: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 17.5}}>แจ้งคนหาย</Text>
          <Image style={{height: 150, width: 150, borderRadius: 25}} source={{uri:"http://192.168.1.113:3000/"+info.imageuser}}/>
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Taker</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.f_name} {info.l_name}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Police ID</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.police_id}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Phone</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.phonenumber}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Email</Text>
        <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.email}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 17.5, color: '#bccdd6'}}>Details</Text>
        {info.des === null ? <Text style={{fontWeight: 'bold', fontSize: 15}}>-</Text> : <Text style={{fontWeight: 'bold', fontSize: 15}}>{info.des}</Text>}
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