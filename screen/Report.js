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
} from "react-native";
import { CheckBox } from "react-native-elements";

const Report = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          { backgroundColor: "white", marginTop: 20, borderRadius: 10 },
        ]}
      >
        <Text style={{ paddingTop: 9, paddingLeft: 10, fontWeight: "bold" }}>
          เขตแจ้งความ
        </Text>
        <TextInput
          style={{
            width: "70%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 10,
            paddingLeft: 10,
          }}
          editable={false}
          value="test"
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.buttonReport}
          onPress={() => setModalVisible(true)}
        >
          <Text>เอกสารหาย</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReport}>
          <Text>TEST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReport}>
          <Text>TEST</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground source={require('../assets/bg.png')} style={{width: '100%', height: 250, justifyContent: 'flex-end', margin: 10}}>
        <Text style={{fontSize: 30, paddingLeft: 20, color: 'white'}}>News</Text>
      </ImageBackground>
      <ImageBackground source={require('../assets/bg.png')} style={{width: '100%', height: 250, justifyContent: 'flex-end', margin: 10}}>
        <Text style={{fontSize: 30, paddingLeft: 20, color: 'white'}}>News</Text>
      </ImageBackground>
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
              <Text style={styles.modalText}>Hello World!</Text>
              <CheckBox checked={true} />
              <View style={styles.row}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible),() => navigation.navigate("ReportDocument")}
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
};

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
  modalText: {
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
});

export default Report;
