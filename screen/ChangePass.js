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
    <View style={{flex: 1, alignItems: 'center', backgroundColor:'white'}}>
      <View style={{paddingTop: 20}}>
      <View style={{width: '80%'}}>
            <Text style={{marginTop: 10}}>Old Password</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} secureTextEntry={true} editable={true} onChangeText={setOldpassword} value={oldpassword}/>
            </View></View>
            <Text style={{marginTop: 10}}>New Password</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} secureTextEntry={true} editable={true} value={newpassword} onChangeText={(value)=>{setNewpassword(value),validate_Password(value)}}/>
            </View></View>
          
        {state2.errorPassword ? 
          <Animatable.View animation="fadeInLeft" duration={500} style={{flexWrap:"nowrap"}}>
           <Text style={{color:"red" }}>{state2.errorPassword}</Text>
          </Animatable.View>: null} 

            <Text style={{marginTop: 10}}>Confirm New Password</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1,borderColor: '#e1e1e1', borderRadius: 10}}>
          <View style={{flexDirection: 'column', flexWrap: 'wrap', width:'90%'}}>
            <TextInput style={{height: 35, width: '100%', paddingLeft: 10}} secureTextEntry={true} value={conpass} editable={true} onChangeText={setConpass}/>
            </View></View>
            <View style={{paddingTop: 20}}>
          <Button title="Update" color="green" onPress={() =>  valid()}></Button>
          </View>
          </View>
      </View>
          
        </View>
  );
};

const styles = StyleSheet.create({

});

export default ChangePass;
