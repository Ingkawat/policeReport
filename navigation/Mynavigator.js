import React, {useContext, useEffect} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context as AuthContext } from '../context/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Octicons, Entypo } from '@expo/vector-icons';

import Login from "../screen/Login";
import Register from "../screen/Register";
import Report from "../screen/Report";
import Peoplereport from "../screen/Peoplereport";
import Account from "../screen/Account";
import Location from "../screen/Location"
import EditProfile  from "../screen/EditProfile";
import ChangePass from "../screen/ChangePass"
import Status from "../screen/Status"

import ReportDocument from "../screen/ReportDocument";
import PoliceHome from "../screen/PoliceHome";
import Approve from "../screen/approve";
import MissingPeople from "../screen/MissingPeople"
import Hint from "../screen/Hint";
import ReportHint from "../screen/ReportHint";
import StatusInfo from "../screen/StatusInfo";
import Goodpeople from "../screen/Goodpeople";
import { View } from "react-native-animatable";
import reportpolice from "../screen/reportpolice";
import statuspolice from "../screen/statuspolice";
import PeoplereportDetail from "../screen/PeoplereportDetail";
import statuspoliceinfo from "../screen/statuspoliceinfo";

const Tab = createBottomTabNavigator();
const LoginNavigator = createNativeStackNavigator();


export default function Mynavigator() {
  const {state, tryLocalSingin} = useContext(AuthContext);  
  
const stack = createNativeStackNavigator();

  function AccountStack(){
    return (
      <stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: "#4a148c" },headerTintColor: "white"}}>

        <stack.Screen name="Account" component={Account}/>
        <stack.Screen name="Location" component={Location} />
        <stack.Screen name="EditProfile" component={EditProfile} />
        <stack.Screen name="ChangePass" component={ChangePass} />
        <stack.Screen name="Status" component={Status} />
        <stack.Screen name="Info" component={StatusInfo}/>
      </stack.Navigator>
    )
  }

  function ReportStack(){
    return (
      <stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: "#4a148c" },headerTintColor: "white"}}>
        <stack.Screen name="Report" component={Report} options={{title: 'แจ้งความ'}}/>
        <stack.Screen name="ReportDocument" component={ReportDocument} options={{title: 'แจ้งเอกสารหาย'}}/>
        <stack.Screen name="MissingPeople" component={MissingPeople} options={{title: 'แจ้งคนหาย'}}/>
        <stack.Screen name="Hint" component={Hint} options={{title: 'แจ้งเบาะแส'}}/>
        <stack.Screen name="ReportHint" component={ReportHint} options={{title: 'แจ้งเบาะแส'}}/>
      </stack.Navigator>
    )
  
  }

  function PoliceStack(){
    return(
      <stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: "#4a148c" },headerTintColor: "white"}}>
           <stack.Screen name="Account" component={Account}/>
          <stack.Screen name="Location" component={Location} />
          <stack.Screen name="EditProfile" component={EditProfile} />
          <stack.Screen name="ChangePass" component={ChangePass} />
          <stack.Screen name="reportpolice" component={reportpolice}/>
          <stack.Screen name="statuspolice" component={statuspolice}/>
          <stack.Screen name="statuspoliceinfo" component={statuspoliceinfo}/>
          
        <stack.Screen name="PoliceHome" component={PoliceHome}/>
        <stack.Screen name="Approve" component={Approve}/>
        <stack.Screen name="Goodpeople" component={Goodpeople}/>
      </stack.Navigator>
    )
  }

  function peoplereport1(){
    return(
      <stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: "#4a148c" },headerTintColor: "white"}}>

        <stack.Screen name="Peoplereport" component={Peoplereport} options={{title: 'ผู้ต้องสงสัย'}}/>
        <stack.Screen name="PeoplereportDetail" component={PeoplereportDetail}/>
      </stack.Navigator>
    )
  }

  
  
  return (

    <NavigationContainer >

        {state.username == null ? (
            <LoginNavigator.Navigator screenOptions={{headerShown:false}}>
                <LoginNavigator.Screen name="LoginScreen" component={Login}/>
                <LoginNavigator.Screen name="RegisterScreen" component={Register}/>
            </LoginNavigator.Navigator>
            
        ):(
          <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: "#4a148c" },headerTintColor: "white"}}>
            <Tab.Screen name = "ReportStack" component={ReportStack}
                    options={{
                      headerShown: false,
                    tabBarLabel: 'Report',
                    tabBarIcon: ({ color, size }) => (
                      <Octicons name="report" color={color} size={size} />
                    ),
                  }}/>
             <Tab.Screen name = "peoplereport1" component={peoplereport1}
                  options={{
                    headerShown:false,
                  tabBarLabel: 'ผู้ต้องสงสัย',
                  tabBarIcon: ({ color, size }) => (
                    <Entypo name="flashlight" color={color} size={size} />
                  ),
                }}/>
                  {state.role == "people" ?
                              <Tab.Screen name = "AccountStack" component={AccountStack}
                              options={{
                                headerShown: false,
                              tabBarLabel: 'Account',
                              tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="account" color={color} size={size} />
                              ),
                            }}/>:            <Tab.Screen name = "AccountStack" component={PoliceStack}
                            options={{
                              headerShown: false,
                            tabBarLabel: 'Account',
                            tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="account" color={color} size={size} />
                            ),
                          }}/>
                  }

          </Tab.Navigator>
        
        )
        }
      
    </NavigationContainer>
  );
}