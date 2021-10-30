import React, {useState, useContext, useEffect} from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,ImageBackground, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable'

import { Context as AuthContext } from '../context/AuthContext';
import Header from "../components/Hearders";
import Icon from 'react-native-vector-icons/FontAwesome';



const Login = ({navigation}) => {

    const {state, login, tryLocalSignin} = useContext(AuthContext);
    const [id_card, setId_Card] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {tryLocalSignin();}, []);
   


const [checkValidId_card , setCheckValidId_card ] = useState(true)
const [error, setError] = useState("");
const valid_idCard = (value) => {
  if(value.length > 12 && value.length < 14){
    setError(" ")
    setCheckValidId_card(true)
  }
  else{
    setError("IdCrad must be a number and have 13 characters.")
    setCheckValidId_card(false)
  }
  setId_Card(value)
}


const [checkValidPassword , setCheckValidPassword ] = useState(true)
const [error2, setError2] = useState("");
const valid_password = (value) => {
  let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@_=;:()*"':{}[%\$%\^&\*])(?=.{8,})/;
  if(reg.test(value) === true){
    setError2(" ")
    setCheckValidPassword(true)
  }
  else{
    setError2("Password must have a large, small, special, and must have 8 characters.")
    setCheckValidPassword(false)
  }
  setPassword(value)
}

const Check_onsubmit = () =>{
  if(checkValidId_card == false && checkValidPassword == true){
    Alert.alert("IdCrad requirement is invalid.")

  }else if(checkValidPassword == false && checkValidId_card == true){
    Alert.alert("Password requirement is invalid.")
  }
  else if(checkValidId_card == false && checkValidPassword == false){
    Alert.alert("Password and IdCrad requirement is invalid.")
  }
  else{
    login({id_card, password,checkValidId_card,checkValidPassword})

  } 

}



  return (
    <View style={styles.screen}>
    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
    <SafeAreaView style={styles.container}>
      <Header title="Police Report"/>
      <View style={[styles.action, {width: '80%'}]}>
        <Icon name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="ID CARD" keyboardType="default" placeholderTextColor="white"
          value={id_card}
          onChangeText={(value)=>{valid_idCard(value)
          }}
          
        ></TextInput>
        
      </View>
      {checkValidId_card ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
           <Text style={{color:"red",left:-36}}>{error}</Text>
          </Animatable.View>} 

      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <Icon name='lock' size={30} />
        <TextInput style={styles.textInput} placeholder="Password" keyboardType="default" secureTextEntry={true} placeholderTextColor="white"
          value={password}
          onChangeText={(value)=>{valid_password(value)
          }}
         
          ></TextInput>

      </View>
      {checkValidPassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500} style={{flexWrap:"nowrap"}}>
           <Text style={{color:"red",left:25, }}>{error2}</Text>
          </Animatable.View>} 

     

      <TouchableOpacity style={[styles.button, {backgroundColor: '#60b45c', marginTop: 35}]}  onPress={() => Check_onsubmit()}>
        <Text style={styles.fontButton}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#2596be', marginTop: 15}]}  onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.fontButton}>Sign Up</Text>
      </TouchableOpacity>

      {state.errorMessage ? 
      <Animatable.View animation="fadeInLeft" duration={500} style={{flexWrap:"nowrap"}}>
           <Text style={{color:"red"}}>{state.errorMessage}</Text>
          </Animatable.View>:null} 
   
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
  valid:{
    left:150
  }
});

export default Login;
