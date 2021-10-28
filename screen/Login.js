import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';


const Login = ({navigation}) => {
    const {state, signin, tryLocalSignin} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {tryLocalSignin();}, []);
  

  return (
    <View>
      <Text>Login.js</Text>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        leftIcon={{ type: "MaterialIcons", name: "email" }}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        leftIcon={{ type: "SimpleLineIcons", name: "lock" }}
      />
      <Button title="Login" type="solid" onPress={()=> signin({email, password, navigation})}/>
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      <Button title="Register" type="solid" onPress={()=> {navigation.navigate("SigninScreen")}}/>
      
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
