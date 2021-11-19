import React, { useState, useEffect, useContext } from "react";
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
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Context as AuthContext} from "../context/AuthContext";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';



const reportpolice = () => {
    const {state, login, tryLocalSignin} = useContext(AuthContext);
    const [des,setDes] = useState("")
    const [modalVisible, setModalVisible] = useState(false);

    const addimage = async () =>{
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

 
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          const data = new FormData();
          let doc = {uri: result.uri, name: "name.jpg", type: 'image'}
          data.append("image", doc)
          data.append("id",state.username)
          data.append("des",des)
          data.append("date",datetext)
          axios
          .put("http://192.168.1.113:3000/report/police",data)
          .then( async (res) => {
            console.log(res.data)
          })
          .catch((err) => {
              console.log(err)
          });

    }


    // const cancle = async () =>{
    //     axios
    //     .post("http://192.168.1.113:3000/report/police/delete",{
    //         id: state.username
    //     })
    //     .then( async (res) => {
    //       console.log(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });

    // }
  
    return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{margin: 25}}>
        
        <TextInput placeholder="รายละเอียด" onChangeText={(value) => {setDes(value)}} style={{borderWidth: 1, borderRadius: 15, borderColor: '#e1e1e1', height: 40, paddingLeft: 10}}/>
        <View style={{paddingBottom: 10}}/>
        <Button title="รูปผู้ต้องสงสัย" onPress={()=> addimage()}></Button>
        <View style={{paddingBottom: 10}}/>
        <Button title = "ยืนยันการประกาศ" onPress={()=>setModalVisible(!modalVisible)}></Button>
        </View>
      </ScrollView>

        
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
                  onPress={() => {setModalVisible(!modalVisible)}}
                >
                  <Text style={styles.textStyle}>ยอมรับ</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonClose,
                    { backgroundColor: "red" },
                  ]}
                  onPress={() => {setModalVisible(!modalVisible)}}
                >
                  <Text style={styles.textStyle}>ยกเลิก</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
            

    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start", // if you want to fill rows left to right
    },
    item: {
      width: "50%", // is 50% of container width
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
      }, row: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
  });

export default reportpolice;