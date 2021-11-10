import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";


const EditProfile = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Image style={[styles.imgProfile]} source={require('../assets/icon.png')}/>
          <View style={{width: '80%'}}>
            <Text style={{marginTop: 10}}>Name</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} value="asdasds asdsadds" editable={false}/>
            </View>
            <Text style={{marginTop: 10}}>ID Card</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} value="1111111111111" editable={false}/>
            </View>
            <Text style={{marginTop: 10}}>Email</Text>
            <View style={{height: 40, backgroundColor: 'white'}}>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} editable={true} autoComplete="email" defaultValue="aasd@asd.asd"/>
            </View>
            <Text style={{marginTop: 10}}>Phone</Text>
            <View style={{height: 40, backgroundColor: 'white', marginBottom: 20}}>
              <View style={styles.row}></View>
            <TextInput style={{backgroundColor: 'white', height: 40, paddingLeft: 10}} editable={true} defaultValue="063232313"/>
            </View>
            <Button title="Update" color="green"></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgProfile: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 60,
  },
});

export default EditProfile;
