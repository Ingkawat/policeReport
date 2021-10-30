import React, {useState, useContext} from "react";
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert,ImageBackground } from "react-native";
import * as Animatable from 'react-native-animatable'

import { Context as AuthContext } from "../context/AuthContext";
import { Context  as ValidationContext} from '../context/ValidationContext';
import Header from "../components/Hearders";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


const Register = ({navigation}) => {
  const {state, register} = useContext(AuthContext);
  const [id_Card, setId_Card] = useState();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const {validate_Idcard, validate_Password, validate_Email,validate_Fname,validate_Lname,validate_Phonenumber} = useContext(ValidationContext);

  let state1 = useContext(ValidationContext).state;


  const [conpass, setConpass] = useState("");

  const onSubmit_Register = () =>{
    if(password != confirmpassword){
      setConpass("password not match")
    }
    else if(state1.errorFname === '' && state1.errorLname === '' && state1.errorEmail === '' &&
    state1.errorPassword === '' && state1.errorPhonenumber === '' 
    ){
      register({id_Card, fname, lname, password,phoneNumber,email})
    }
    else{
      console.log("password not match")
    }
  }
  
  
  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => { navigation.navigate("LoginScreen")} }
      ]
    );



  return (
    <View style={styles.screen}>
      <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        
     
      <Header title="Police Report"/>

      <View style={[styles.action, {width: '80%'}]}>
        <FontAwesome name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="FirstName" keyboardType="default" placeholderTextColor="white"
        value = {fname} onChangeText={(value) => {setFname(value), validate_Fname(value)}}
        ></TextInput>
      </View>
      {state1.errorFname ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state1.errorFname}</Text>
          </Animatable.View> :null }


      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <FontAwesome name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="LastName" keyboardType="default" placeholderTextColor="white"
        value = {lname} onChangeText={(value) => {setLname(value), validate_Lname(value)}}
        ></TextInput>
      </View>
      {state1.errorLname ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state1.errorLname}</Text>
          </Animatable.View> :null }


      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <FontAwesome name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="PhoneNumber" keyboardType="default" placeholderTextColor="white"
         value = {phoneNumber} onChangeText={(value) => {setPhoneNumber(value), validate_Phonenumber(value)}}
         ></TextInput>
      </View>
      {state1.errorPhonenumber ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state1.errorPhonenumber}</Text>
          </Animatable.View> :null }


      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <FontAwesome name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="ID Card" keyboardType="default" placeholderTextColor="white"
        value = {id_Card} onChangeText={(value) => {setId_Card(value), validate_Idcard(value)}}
        ></TextInput>
      </View>
      {state1.errorIdcard ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state1.errorIdcard}</Text>
          </Animatable.View> :null }

      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <FontAwesome name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="Email" keyboardType="default" placeholderTextColor="white" autoCapitalize="none"
        value = {email} onChangeText={(value) => {setEmail(value), validate_Email(value)}}
        ></TextInput>
      </View>
      {state1.errorEmail ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state1.errorEmail}</Text>
          </Animatable.View>: null }


      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <Feather name='lock' size={20} />
        <TextInput style={styles.textInput} placeholder="Password" keyboardType="default" secureTextEntry={true} placeholderTextColor="white"
        value = {password} onChangeText={(value) => {setPassword(value), validate_Password(value)}} 
        ></TextInput>
      </View>
      {state1.errorPassword ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{state1.errorPassword}</Text>
          </Animatable.View>: null }

      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <Feather name='lock' size={20} />
        <TextInput style={styles.textInput} placeholder="Confirm Password" keyboardType="default" secureTextEntry={true} placeholderTextColor="white"
        value = {confirmpassword} onChangeText={(value) =>{setConfirmpassword(value)}} 
        ></TextInput>
      </View>
      {conpass ?
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{conpass}</Text>
          </Animatable.View>: null }



      <TouchableOpacity style={[styles.button, {backgroundColor: '#60b45c', marginTop: 35}]}  onPress={()=> onSubmit_Register()}>
        <Text style={styles.fontButton}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 10}} onPress={()=> navigation.navigate("LoginScreen")}>
        <Text style={styles.fontButton}>Back to login?</Text>
      </TouchableOpacity>
      {
          state.isSignin ? createThreeButtonAlert(): console.log("fail")
      }

 
    </SafeAreaView>
    </ImageBackground>
  </View>

  
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fontButton: {
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    width: '80%',
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
  },
});

export default Register;
