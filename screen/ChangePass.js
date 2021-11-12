import React, { useState, useEffect, useContext } from "react";
import * as Animatable from 'react-native-animatable'
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
} from "react-native";

import { Context  as AccountContext} from '../context/AccountContext';
import { Context  as ValidationContext} from '../context/ValidationContext';

import { Context as AuthContext  } from '../context/AuthContext';

const ChangePass = () => {

  const {state, changepassword} = useContext(AccountContext);
  let state1 = useContext(AuthContext).state;
  const {validate_Password} = useContext(ValidationContext);
  let state2 = useContext(ValidationContext).state;

  const confirm = () =>{
    if(conpass === newpassword){
      changepassword(newpassword,oldpassword, state1.username)
      setOldpassword("")
      setNewpassword("")
      setConpass("")
    }else{
      console.log("pass is not match")
    }
  }

  const valid = () =>{
    if(state2.errorPassword == ''){
      confirm()
    }
    else{
      console.log("pass invalid")
    }
  }

  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [conpass, setConpass] = useState("");
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <View style={{width: '80%'}}>
            <Text style={{marginTop: 10}}>Old Password</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} secureTextEntry={true} editable={true} onChangeText={setOldpassword} value={oldpassword}/>
            </View>
            <Text style={{marginTop: 10}}>New Password</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} secureTextEntry={true} editable={true} value={newpassword} onChangeText={(value)=>{setNewpassword(value),validate_Password(value)}}/>
            </View>
          
        {state2.errorPassword ? 
          <Animatable.View animation="fadeInLeft" duration={500} style={{flexWrap:"nowrap"}}>
           <Text style={{color:"red",left:25, }}>{state2.errorPassword}</Text>
          </Animatable.View>: null} 

            <Text style={{marginTop: 10}}>Confirm New Password</Text>
            <View style={{height: 40, backgroundColor: 'white', marginBottom: 20}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} secureTextEntry={true} value={conpass} editable={true} onChangeText={setConpass}/>
            </View>
            <Button title="Change Password" color="green" onPress={()=>{valid()}}></Button>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({

});

export default ChangePass;
