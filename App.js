import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screen/Login';
import { Provider as AuthProvider } from './context/AuthContext';
import Mynavigator from './navigation/Mynavigator';

export default function App() {
  return (
    <AuthProvider>
      <Mynavigator/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
