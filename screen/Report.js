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
import { CheckBox } from "react-native-elements";

const Report = () => {
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
        <TouchableOpacity style={styles.buttonReport}>
          <Text>เอกสารหาย</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReport}>
          <Text>TEST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReport}>
          <Text>TEST</Text>
        </TouchableOpacity>
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
              <Text style={styles.modalText}>Hello World!</Text>
              <CheckBox checked={true} />
              <View style={styles.row}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
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
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
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
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
  },
});

export default Report;
