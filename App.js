
import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as ValidationContext } from './context/ValidationContext';
import { Provider as AccountContext } from './context/AccountContext';
import Mynavigator from './navigation/Mynavigator';
import PoliceHome from './screen/PoliceHome';
import Approve from './screen/approve';

export default function App() {
  return (
   
    
    <AuthProvider >   
       <ValidationContext>
         <AccountContext>
      <Mynavigator/> 
      </AccountContext>
      </ValidationContext>
    </AuthProvider>
    
  );
}


