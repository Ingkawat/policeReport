import React, {useContext} from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as AuthContext } from '../context/AuthContext';

const Report = () => {
    const {state, signin, clearLocal} = useContext(AuthContext);
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text>Report</Text>
        </View>
    )
}

export default Report;