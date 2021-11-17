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
    .post("http://192.168.1.113:3000/account", {
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
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>

          <View style={{width: '80%'}}>
            <Text style={{marginTop: 10}}>Name</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} value={name+"  "+lname} editable={false}/>
            </View>
            </View>
            <Text style={{marginTop: 10}}>ID Card</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} value={state.username} editable={false}/>
            </View>
            </View>

            <Text style={{marginTop: 10}}>Email</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}}   defaultValue={oemail} onChangeText={(value) => {validate_Email(value),setEmail(value)}}/>
            </View>
            </View>
            {state2.errorEmail ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red"}}>{state2.errorEmail}</Text>
          </Animatable.View>: null }


            <Text style={{marginTop: 10}}>Phone</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} defaultValue={ophone} onChangeText={(value) => {validate_Phonenumber(value),setPhone(value)}}/>
            </View>
            </View>
            {state2.errorPhonenumber ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red"}}>{state2.errorPhonenumber}</Text>
          </Animatable.View> :null }
          <View style={{paddingTop: 20}}>
          <Button title="Update" color="green" onPress={() =>  valid()}></Button>
          </View>
            
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
