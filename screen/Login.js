import React, {useState, useContext, useEffect} from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable'

import { Context as AuthContext } from '../context/AuthContext';
import Header from "../components/Hearders";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
    const {state, login, tryLocalSignin} = useContext(AuthContext);
    const [id_card, setId_Card] = useState("");
    const [password, setPassword] = useState("");

    
    useEffect(() => {tryLocalSignin();}, []);






  return (

    <View style={styles.screen}>
    <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
    <SafeAreaView style={styles.container}>
      <Header title="Police Report"/>
      <View style={[styles.action, {width: '80%'}]}>
        <Icon name='user-o' size={20} />
        <TextInput style={styles.textInput} placeholder="ID CARD" keyboardType="default" placeholderTextColor="white"
          value={id_card}
          onChangeText={setId_Card}
        ></TextInput>
      </View>

      <View style={[styles.action, {width: '80%', marginTop: 35}]}>
        <Icon name='lock' size={30} />
        <TextInput style={styles.textInput} placeholder="Password" keyboardType="default" secureTextEntry={true} placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
          ></TextInput>
      </View>

      <TouchableOpacity style={[styles.button, {backgroundColor: '#60b45c', marginTop: 35}]}  onPress={()=> login({id_card, password})}>
        <Text style={styles.fontButton}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#2596be', marginTop: 15}]}  onPress={()=> {navigation.navigate("RegisterScreen")}}>
        <Text style={styles.fontButton}>Sign Up</Text>
      </TouchableOpacity>
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
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

export default Login;
