import React, {useContext, useEffect} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context as AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import Login from "../screen/Login";
import Register from "../screen/Register";
import Home from "../screen/Home";
import Notifications from "../screen/Notifications";
import Account from "../screen/Account";

const Tab = createBottomTabNavigator();
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

    

    <NavigationContainer >

        {state.username == null ? (
            <LoginNavigator.Navigator screenOptions={{headerShown:false}}>
                <LoginNavigator.Screen name="LoginScreen" component={Login}/>
                <LoginNavigator.Screen name="RegisterScreen" component={Register}/>
            </LoginNavigator.Navigator>
            
        ):(
          <Tab.Navigator>
            <Tab.Screen name = "Report" component={Home}
                    options={{
                    tabBarLabel: 'Report',
                    tabBarIcon: ({ color, size }) => (
                      <Octicons name="report" color={color} size={size} />
                    ),
                  }}/>
            <Tab.Screen name = "Notifications" component={Notifications}
                    options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="bell" color={color} size={size} />
                    ),
                  }}/>
            <Tab.Screen name = "Account" component={Account}
                    options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                  }}/>
          </Tab.Navigator>
        
        )
        }
      
    </NavigationContainer>
  );
}
