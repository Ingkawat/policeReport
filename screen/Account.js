import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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
  ScrollView,
  TouchableHighlight
} from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';



import {
  Entypo,
  MaterialCommunityIcons,
  Octicons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";


const Account = ({navigation,route}) => {


  const {state, login, clearLocal} = useContext(AuthContext);


  const [name,setName] = useState("");
  const [lname,setLname] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [image,setImage] = useState("");
  const [imagenew,setImagenew] = useState(null);



 


  useEffect(() => {

        axios
        //use your ip address type in cmd ipconfig***
        .post("http://192.168.1.36:3000/account", {
          id_card: state.username
        })
        .then(async (res) => {
          setName(res.data[0][0].f_name)
          setLname(res.data[0][0].l_name)
          setEmail(res.data[0][0].email)
          setPhone(res.data[0][0].phonenumber)     
          setImagenew(res.data[0][0].imageuser)

          console.log(imagenew)
      
        })
        .catch((err) => {
            console.log("error")   
        });   
  });

  const chooseimage = async ()=>{

    let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });
   setImage(result.uri)

   const data = new FormData();
   let doc = {uri: result.uri, name: "name.jpg", type: 'image'}
   data.append("image", doc)
   data.append("id",state.username)
   axios
   .post("http://192.168.1.36:3000/addimage/account",data)
   .then( async (res) => {
    axios
    //use your ip address type in cmd ipconfig***
    .post("http://192.168.1.36:3000/account", {
      id_card: state.username
    })
    .then(async (res) => {
      setImagenew(res.data[0][0].imageuser)

      console.log(imagenew)
  
    })
    .catch((err) => {
        console.log("error")   
    });   
    
   })
   .catch((err) => {
       console.log(err)
   });

   setcount(0)
  }



  return (
    <SafeAreaView>
      <ScrollView>
        
 
        <View
          style={[
            styles.row,
            { alignItems: "center", justifyContent: "center", paddingTop: 20 },
          ]}>
            

            <View style={{ flexDirection: "column", paddingRight: 25 }}>
            {imagenew == null ? <View>
          <TouchableOpacity onPress={()=>{chooseimage()}}>
      <Image style={styles.imgProfile} source={{uri:image}}></Image>
      </TouchableOpacity>

        </View>:
        <View>
                    <TouchableOpacity onPress={()=>{chooseimage()}}>
      <Image style={styles.imgProfile} source={{uri:"http://192.168.1.36:3000/"+imagenew}}></Image>
      </TouchableOpacity>
        </View>
        }
          </View>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <View style={styles.row}>
          
              <Text style={{ paddingLeft: 10, fontSize: 20 }}>
                {name} {lname} 
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={{ paddingLeft: 10, fontSize: 13 }}>
                {email}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{ paddingLeft: 10, fontSize: 13 }}>
                {phone}
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.navigate("EditProfile")}>
                <Text style={{ textDecorationLine: "underline", fontSize: 13 }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
        <View style={{ alignItems: "center", paddingTop: 30 }}>
        {state.role == "people" ?
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
            }}
          >
        
            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
              onPress={() => navigation.navigate("Status")}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
              <MaterialIcons name="pending" size={15} color="black" /> Status
              </Text>
            </TouchableOpacity>
       
          </View>
          :null
               }
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
              onPress={() => navigation.navigate("Location")}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
                <Entypo name="location" size={15} color="black" /> My Location
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
              onPress={() => navigation.navigate("ChangePass")}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
                <MaterialCommunityIcons
                  name="form-textbox-password"
                  size={15}
                  color="black"
                />{" "}
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
          {state.role == "police" ?
          <View style={{width: '80%'}}>
           <View
           style={{
            borderColor: "white",
            borderBottomWidth: 1,
            height: 35,
            width: "80%",
            alignItems: "flex-start",
            marginTop: 10,
          }}
         >
 
           <TouchableOpacity
             style={{
               height: 35,
               width: "100%",
             }}
             onPress={() => navigation.navigate("reportpolice")}
           >
             <Text style={{ fontSize: 15, color: "grey" }}>
             <Octicons name="report" size={15} color="black" /> Report Police
             </Text>
           </TouchableOpacity>
          
         </View>
         <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
                  <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
              onPress={() => navigation.navigate("statuspolice")}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
              <MaterialIcons name="pending" size={15} color="black" /> Status Police
              </Text>
            </TouchableOpacity>
            </View>
          <View
            style={{
              borderColor: "white",
              borderBottomWidth: 1,
              height: 35,
              width: "80%",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
          

            <TouchableOpacity
              style={{
                height: 35,
                width: "100%",
              }}
              onPress={() => navigation.navigate("PoliceHome")}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>
              <Ionicons name="home-outline" size={15} color="black" /> Police Home
              </Text>
            </TouchableOpacity>
           
          </View>
          </View>
          :null
        }
          <TouchableOpacity
            onPress={() => {
              
              clearLocal();
            }}
            style={{ fontSize: 15, paddingTop: 20 }}
          >
            <Text>
              Logout <MaterialIcons name="logout" size={15} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 75
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 10,
  },
  imgProfile: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 60,
    borderColor: 'black'
  },
});

export default Account;