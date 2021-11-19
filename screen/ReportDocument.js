import React, { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  Pressable
} from "react-native";
import axios from "axios";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import policeData from "../thiitangsthaaniitamrwcchnkhrbaal-.json";
import { Picker } from "@react-native-picker/picker";
import { Context as AuthContext } from "../context/AuthContext";

const sendPushNotification = () => {
  let response = fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "ExponentPushToken[EXdESYPsl2mVuDVHVMaMtS]",
      sound: "default",
      title: "NEW REPORT IS COMING",
      body: "REPORT!!!!!!",
    }),
  });
};

const addReport = (idcard, station, lostPaper,description) => {
  
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours();
  var min = new Date().getMinutes();
  var sec = new Date().getSeconds();
  var datetext =
    date.toString() +
    "/" +
    month.toString() +
    "/" +
    year.toString() +
    "-" +
    hours.toString() +
    ":" +
    min.toString() +
    ":" +
    sec.toString();

  console.log(datetext);

  axios
    //use your ip address type in cmd ipconfig***
    .post(`http://192.168.1.113:3000/report/important/${idcard}`, {
      report_type: "เอกสารหาย",
      station: station,
      date: datetext,



    })
    .then(async (res) => {
      axios
        .post("http://192.168.1.113:3000/report/important", {
          missing_type: lostPaper,
          description: description
        })
        .then(async (res) => {
          sendPushNotification();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

function ReportDocument() {
  const [modalVisible, setModalVisible] = useState(false);
  const { state } = useContext(AuthContext);
  const [selectStation, setselectStation] = useState();
  const [description, setdescription] = useState();
  const [selectlostPaper, setSelectlostPaper] = useState();
  const police_station = ["-"];
  for (let i = 0; i < policeData.features.length; i++) {
    police_station.push(policeData.features[i].properties.name);
  }
  const importantPaper = [
    "-",
    "ตั๋วจำนำ",
    "บัตรสวัสดิการแห่งรัฐ",
    "สมุดบัญชีธนาคาร",
    "สลากออมสิน",
    "โฉนดที่ดิน",
    "ใบสำคัญการสมรส",
    "ใบรับรองผลการเรียน",
    "ใบกรมธรรม์",
    "ใบคู่มือการจดทะเบียนรถ",
  ];
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ margin: 20 }}>
        <Text>สถานี</Text>
        <View style={{ borderWidth: 1, borderRadius: 15, borderColor: '#e1e1e1' }}>
          <Picker
            selectedValue={selectStation}
            onValueChange={(itemValue, itemIndex) =>
              setselectStation(itemValue)
            }
          >
            {police_station.map((prop, key) => {
              return (
                //  <Button style={{borderColor: prop[0]}}  key={key}>{prop[1]}</Button>
                <Picker.Item label={prop} value={prop} key={key} />
              );
            })}
          </Picker>
        </View>
        <View style={{paddingBottom: 10}}/>
        <Text>เอกสารที่หาย</Text>
        <View style={{ borderWidth: 1, borderRadius: 15, borderColor: '#e1e1e1' }}>
          <Picker
            selectedValue={selectlostPaper}
            onValueChange={(itemValue, itemIndex) =>
              setSelectlostPaper(itemValue)
            }
          >
            {importantPaper.map((prop, key) => {
              return (
                //  <Button style={{borderColor: prop[0]}}  key={key}>{prop[1]}</Button>
                <Picker.Item label={prop} value={prop} key={key} />
              );
            })}
          </Picker>
        </View>
        <View style={{paddingBottom: 10}}/>
        <Text>รายละเอียดเพิ่มเติม</Text>
        <TextInput onChangeText={(value)=>setdescription(value)} style={{borderWidth: 1, borderRadius: 15, borderColor: '#e1e1e1', height: 40, paddingLeft: 10}}></TextInput>
        <View style={{paddingBottom: 10}}/>
        <Button
          title="แจ้งความ"
          onPress={() => {setModalVisible(!modalVisible)
           
          }}
        />
 
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
                  onPress={() => {addReport(state.username, selectStation, selectlostPaper,description),setModalVisible(!modalVisible)}}
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

export default ReportDocument;




