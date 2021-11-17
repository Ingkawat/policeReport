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
  Linking,
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Context as AuthContext } from "../context/AuthContext";
import axios from "axios";
import Hint from "../screen/Hint";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";

const registerForPushNotificationsAsync = async () => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status != "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  }
  if (status != "granted") {
    alert("Fail to get Token");
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

const updateToken = (token, id) => {
  axios
    //use your ip address type in cmd ipconfig***
    .post(`http://192.168.1.36:3000/updateToken/${token}/${id}`)
    .then(async (res) => {
      console.log("update Token");
    })
    .catch((err) => {
      console.log(err);
    });
};
var arr = [];
const Report = ({ navigation }) => {
  const { state } = useContext(AuthContext);

  const [articles1, setArticles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log(state.role);
    registerForPushNotificationsAsync()
      .then((token) => updateToken(token, state.username))
      .catch((err) => console.log(err));

    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=th&apiKey=4c344f6c49be434088332614e6893d6c"
      )
      .then(async (res) => {
        arr = [];
        for (var i = 0; i < res.data.articles.length; i++) {
          if (i == 10) {
            break;
          } else {
            arr.push(res.data.articles[i]);
            setArticles(res.data.articles[i]);
          }
        }
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  return (
    <ScrollView style={{backgroundColor: '#483434'}}>
      <View>
      {state.role == "people" ?
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonReport}
          onPress={() => navigation.navigate("ReportDocument")}
        >
          <Entypo name="text-document" size={35} color="black" />
          <Text>เอกสารหาย</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonReport}
          onPress={() => navigation.navigate("MissingPeople")}
        >
          <SimpleLineIcons name="people" size={35} color="black" />
          <Text>แจ้งคนหาย</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonReport}
          onPress={() => navigation.navigate("Hint")}
        >
          <AntDesign name="message1" size={35} color="black" />
          <Text>แจ้งเบาะแส</Text>
        </TouchableOpacity>
        </View>
        :null
      }

        {arr.map((name, key) => {
          return (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  paddingBottom: 30
                }}
                onPress={() => {
                  Linking.openURL(name.url);
                }}
              >
                <View style={{backgroundColor: 'white', width: '90%', borderRadius: 15, height: 100}}>
                <ImageBackground
                    source={{ uri: name.urlToImage }}
                    style={{ width: "100%", height: 110, alignItems: 'center', justifyContent: 'flex-end'}}
                    imageStyle={{borderRadius: 15}}
                  >
                  <View style={{backgroundColor: 'white', width: '100%', }}>
                    <Text style={{fontSize: 12.5, color: 'red'}}>{name.title}</Text>
                  </View>
                  
                  </ImageBackground>
                </View>

              </TouchableOpacity>
          );
        })}


      </View>
    </ScrollView>
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
  buttonReport: {
    backgroundColor: "white",
    height: 110,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 10,
  },
});

export default Report;