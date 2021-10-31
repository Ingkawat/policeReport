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
  ScrollView,
} from "react-native";


const ChangePass = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <View style={{width: '80%'}}>
            <Text style={{marginTop: 10}}>Old Password</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} secureTextEntry={true} editable={true}/>
            </View>
            <Text style={{marginTop: 10}}>New Password</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} secureTextEntry={true} editable={true}/>
            </View>
            <Text style={{marginTop: 10}}>Confirm New Password</Text>
            <View style={{height: 40, backgroundColor: 'white', marginBottom: 20}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} secureTextEntry={true} editable={true}/>
            </View>
            <Button title="Change Password" color="green"></Button>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({

});

export default ChangePass;
