
import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as ValidationContext } from './context/ValidationContext';
import Mynavigator from './navigation/Mynavigator';

export default function App() {
  return (
   
    
    <AuthProvider >   
       <ValidationContext>
      <Mynavigator/> 
      </ValidationContext>
    </AuthProvider>
    
  );
}


