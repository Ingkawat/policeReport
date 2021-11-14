import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet} from "react-native";
import axios from "axios";

const StatusInfo = ({route}) => {
    const [info, setInfo] = useState(null)
    const {report_id,police_id,report_type} = route.params

    useEffect(async()=>{
        if(report_type == "เอกสารหาย"){
            if(police_id == null){
        await axios.post(`http://192.168.1.36:3000/join_important/${report_id}`)
        .then((res) => {
            setInfo(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
        }else if(police_id != null){
            await axios.post(`http://192.168.1.36:3000/join_important/police/${report_id}`)
            .then((res) => {
                setInfo(res.data)
               
              })
              .catch((err) => {
                console.log(err);
              });
        }
        }else if(report_type == "แจ้งคนหาย"){
            if(police_id == null){
            await axios.post(`http://192.168.1.36:3000/join_missing/${report_id}`)
            .then((res) => {
                setInfo(res.data)
              })
              .catch((err) => {
                console.log(err);
              });
            }
            else if(police_id != null){
                await axios.post(`http://192.168.1.36:3000/join_missing/police/${report_id}`)
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
      
        <View>
            {report_type == "เอกสารหาย" ?
            <View>
            {info !== null ? 
            
            <View>
                <Text>คนรับเรื่อง</Text>
                <Text>{info.f_name}  {info.l_name}</Text>
                <Text>{info.email}</Text>
                <Text>{info.phonenumber}</Text>
           
            <Text>{info.missing_type}</Text>
            <Text>{info.police_id}</Text>
            <Text>{info.status}</Text>
            </View>

            :<Text>Loading</Text>
            }
            </View>
            :<View>
                   {info !== null ? 
            
            <View>
                <Text>คนรับเรื่อง</Text>
                <Text>{info.f_name}  {info.l_name}</Text>
                <Text>{info.email}</Text>
                <Text>{info.phonenumber}</Text>
           
            <Text>{info.des}</Text>
            <Text>{info.police_id}</Text>
            <Text>{info.status}</Text>
            </View>

            :<Text>Loading</Text>
            }
            </View>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({

})

export default StatusInfo;