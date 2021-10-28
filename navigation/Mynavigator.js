import React, {useContext, useEffect} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context as AuthContext } from '../context/AuthContext';

import Login from "../screen/Login";
import Signin from "../screen/Signin";
import Home from "../screen/Home";

const LoginNavigator = createNativeStackNavigator();

// function SigninNavigator(){
//     <LoginNavigator.Navigator>
//         <LoginNavigator.Screen name = "Login" component={Login}/>
//         <LoginNavigator.Screen name = "Signin" component={Signin}/>
//         <LoginNavigator.Screen name = "Home" component={Home}/>
//     </LoginNavigator.Navigator>
// }

export default function Mynavigator() {
  const {state, tryLocalSingin} = useContext(AuthContext);  
  return (

    

    <NavigationContainer>
      <LoginNavigator.Navigator >
        {state.username == null ? (
            <>
                <LoginNavigator.Screen name="LoginScreen" component={Login}/>
                <LoginNavigator.Screen name="SigninScreen" component={Signin}/>
            </>
            
        ):(<LoginNavigator.Screen name = "Home" component={Home}/>)
        }
      </LoginNavigator.Navigator>
    </NavigationContainer>
  );
}
