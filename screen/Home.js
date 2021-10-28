import React, {useContext} from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as AuthContext } from '../context/AuthContext';

const Home = () => {
    const {state, signin, clearLocal} = useContext(AuthContext);
    return(
        <View>
            <Text>Login successful!!!</Text>
            <Button
                title="Logout"
                onPress={()=>{clearLocal()}}
            />
        </View>
    )
}

export default Home;