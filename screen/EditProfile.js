import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AccountContext } from "../context/AccountContext";
import { Context  as ValidationContext} from '../context/ValidationContext';
import * as Animatable from 'react-native-animatable'
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
  Alert
} from "react-native";


const EditProfile = ({navigation}) => {
  const {state, login, clearLocal} = useContext(AuthContext);
  const {editprofile} = useContext(AccountContext);
  let state1 = useContext(AccountContext).state;


  const {validate_Email,validate_Phonenumber} = useContext(ValidationContext);

  let state2 = useContext(ValidationContext).state;



  const [name,setName] = useState("");
  const [lname,setLname] = useState("");

  const [oemail,setoEmail] = useState("");

  const [ophone,setoPhone] = useState("");

  const [email,setEmail] = useState("");

  const [phone,setPhone] = useState("");


  useEffect(() => {
   
    axios
    //use your ip address type in cmd ipconfig***
    .post("http://192.168.1.36:3000/account", {
      id_card: state.username
    })
    .then(async (res) => {
      setName(res.data[0][0].f_name)      
      setLname(res.data[0][0].l_name)
      setoEmail(res.data[0][0].email)    
      setoPhone(res.data[0][0].phonenumber)
    })
    .catch((err) => {
        console.log("error")   
    });

    

});

const valid = async () =>{

    if(state2.errorPhonenumber == '' && state2.errorEmail == ''){
      if(phone.length === 0){
         setPhone(ophone)
     } 
     if (email.length === 0){
        setEmail(oemail)
     }if(phone.length === 0 && email.length === 0){
        setEmail(oemail)
        setPhone(ophone)
     }

      await editprofile(email,phone,state.username)
      navigation.navigate("Account",{email:email,phone:phone})
     

    }
    else{
      Alert.alert("Email or Password is invalid.")
    }
  
}

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>

          <View style={{width: '80%'}}>
            <Text style={{marginTop: 10}}>Name</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} value={name+"  "+lname} editable={false}/>
            </View>
            <Text style={{marginTop: 10}}>ID Card</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} value={state.username} editable={false}/>
            </View>

            <Text style={{marginTop: 10}}>Email</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}}   defaultValue={oemail} onChangeText={(value) => {validate_Email(value),setEmail(value)}}/>
            </View>
            {state2.errorEmail ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state2.errorEmail}</Text>
          </Animatable.View>: null }


            <Text style={{marginTop: 10}}>Phone</Text>
            <View style={{height: 40, backgroundColor: 'white', marginBottom: 20}}>
              <View style={styles.row}></View>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}}   defaultValue={ophone} onChangeText={(value) => {validate_Phonenumber(value),setPhone(value)}}/>
            </View>
            {state2.errorPhonenumber ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state2.errorPhonenumber}</Text>
          </Animatable.View> :null }
            <Button title="Update" color="green" onPress={() =>  valid()}></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgProfile: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 60,
  },
});

export default EditProfile;