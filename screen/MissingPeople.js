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


import axios from "axios";
import { Context as AuthContext  } from '../context/AuthContext';
import policeData from "../thiitangsthaaniitamrwcchnkhrbaal-.json";
import * as Locations from "expo-location";
import * as ImagePicker from 'expo-image-picker';


function MissingPeople() {
  const [modalVisible, setModalVisible] = useState(false);
  const {state, login, tryLocalSignin} = useContext(AuthContext);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Locations.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Locations.getCurrentPositionAsync({accuracy: Locations.Accuracy.BestForNavigation})
      setLocation(location);
      setLat(location.coords.latitude)
      setLong(location.coords.longitude)
      console.log(location.coords.latitude)
      console.log(location.coords.longitude)  
    })(); 
  }, []);
 

    
const [station, setStation] = useState(0);
const [name, setName] = useState("");
const [des, setDes] = useState("");
const [peopleid, setpeopleid] = useState("");

  const addReport = async () =>{
    var min = 99999
    for(var i = 0; i < policeData.features.length; i++){
      
      var lon1 = (long* Math.PI) / 180.0;
      var lon2 = (policeData.features[i].geometry.coordinates[1] * Math.PI) / 180.0;
      var lat1 = (lat* Math.PI) / 180.0;
      var lat2 = (policeData.features[i].geometry.coordinates[0] * Math.PI) / 180.0;
      var dlon = lon2 - lon1;
      var dlat = lat2 - lat1;
      var a = Math.pow(Math.sin(dlat / 2), 2)
               + Math.cos(lat1) * Math.cos(lat2)
               * Math.pow(Math.sin(dlon / 2),2);
           
      var c = 2 * Math.asin(Math.sqrt(a));

      if(c*6371 < min){
        setStation(i+1)
        min = c*6371
       
        }
  
  }
    
    
}

const addReport1 = async () =>{
   var min = 99999
  for(var i = 0; i < policeData.features.length; i++){  
    var lon1 = (long* Math.PI) / 180.0;
    var lon2 = (policeData.features[i].geometry.coordinates[1] * Math.PI) / 180.0;
    var lat1 = (lat* Math.PI) / 180.0;
    var lat2 = (policeData.features[i].geometry.coordinates[0] * Math.PI) / 180.0;
    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    var a = Math.pow(Math.sin(dlat / 2), 2)
             + Math.cos(lat1) * Math.cos(lat2)
             * Math.pow(Math.sin(dlon / 2),2);
         
    var c = 2 * Math.asin(Math.sqrt(a));

    if(c*6371 < min){
    
      setStation(i+1)
      min = c*6371
      }
}

addReport3(station)
}

const addReport3 = (sta) =>{
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1; 
  var year = new Date().getFullYear(); 
  var hours = new Date().getHours(); 
  var min = new Date().getMinutes(); 
  var sec = new Date().getSeconds(); 
  var datetext = date.toString()+"/" + month.toString() +"/"+year.toString()+"-"+hours.toString()+":"+min.toString()+":"+sec.toString()
  axios
  .post("http://192.168.1.113:3000/report/missingpeople/update", {
    name: name,
    des: des,
    peopleid: peopleid,
    station: sta,
    date:datetext
  })
  .then( async (res) => {
      console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    });
  
}


 const chooseimage1 = async ()=>{
   
   let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  const data = new FormData();
  let doc = {uri: result.uri, name: "name.jpg", type: 'image'}
  data.append("image", doc)
  data.append("report_type","แจ้งคนหาย")
  data.append("id",state.username)
  console.log(data)
  axios
  .put("http://192.168.1.113:3000/report/missingpeople",data)
  .then( async (res) => {
    console.log(res.data)
  })
  .catch((err) => {
      console.log(err)
  });
 }

  return (  
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ margin: 20 }}>
        <Text style={{ marginTop: 10 }}>ชื่อ - นามสกุล</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} placeholder="ชื่อ - นามสกุล" onChangeText={(value) => {setName(value)}}/>
          </View>
        </View>
        <Text style={{ marginTop: 10 }}>เหตุการณ์</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}}  onChangeText={(value) => {setDes(value)}}/>
          </View>
        </View>
        <Text style={{ marginTop: 10 }}>id card</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}}  onChangeText={(value) => {setpeopleid(value)}}/>
          </View>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'50%'}}>
            <TouchableOpacity onPress={()=>{chooseimage1()}}  style={{backgroundColor:'lightblue', height: 35, borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <Text>Choose File</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'50%', justifyContent: 'center'}}>
            <Text style={{paddingLeft: 10}}>ภาพถ่ายคนหาย</Text>
          </View>
        </View>
        <View style={{paddingBottom: 10}}/>
        <Button title="แจ้งความ" onPress={()=>{setModalVisible(true),addReport()}}/>
      </View>
      

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {      
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>ต้องการแจ้งความ</Text>
           
              <View style={styles.row}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {addReport1(),setModalVisible(!modalVisible)}}
                >
                  <Text style={styles.textStyle}>ยอมรับ</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "red" },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>ยกเลิก</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonReport: {
    backgroundColor: "white",
    height: 110,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MissingPeople;
