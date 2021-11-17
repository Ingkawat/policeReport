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

} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import axios from "axios";


const ReportHint = ({navigation,route}) => {
  const [modalVisible, setModalVisible] = useState(false);
    const {state} = useContext(AuthContext);
    const id = route.params.id
    const [report, setReport] = useState("")
   const confirmreporthint = () =>{
    axios
    .put("http://192.168.1.36:3000/report/reporthint",{
        report:report,
        id:id,
        idcard:state.username
    })
    .then( async (res) => {
      console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    });
   }
return(
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{margin: 20}}>
      <Text style={{ marginTop: 10 }}>แจ้งเบาะแส</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
        <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
          <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} placeholder="แจ้งเบาะแส" onChangeText={(value) => {setReport(value)}}/>
        </View>
      </View>
      <View style={{paddingBottom: 10}}/>
        <Button title="ยืนยันการแจ้งเบาะแส" onPress={()=>{setModalVisible(!modalVisible)}}></Button>
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
                  onPress={() => {confirmreporthint(),setModalVisible(!modalVisible)}}
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
)


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


export default ReportHint;
