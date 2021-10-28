import React, {useState, useContext} from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const Signin = ({navigation}) => {
  const {state, register} = useContext(AuthContext);
  const [id, setId] = useState();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  

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
        { text: "OK", onPress: () => {navigation.navigate("LoginScreen")} }
      ]
    );

    console.log(state)

  return (
    <View>
      <Input label="เลขบัตรประชาชน" value = {id} onChangeText={setId}/>
      <Input label="firstname" value = {fname} onChangeText={setFname}/>
      <Input label="lastname" value = {lname} onChangeText={setLname}/>
      <Input label="password"value = {password} onChangeText={setPassword} />
      <Button title="Signup" type="solid" onPress={()=> register({id, fname, lname, password})}/>
      {
          state.isSignin ? createThreeButtonAlert(): null
      }
    </View>
  );
};

export default Signin;
