import React, {useState, useEffect} from "react";
import { View,  Text, Button, Image} from "react-native";
import * as DocumentPicker from 'expo-document-picker';

import axios from "axios";





const Approve = ({route, navigation}) => {
    const [pic, setPic] = useState(null);
    const {report_id, user_id} = route.params
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({})
        let doc = {uri: result.uri, name: result.name, type: 'application/pdf'}

        // await setDoc({
        //   uri: result.uri,
        //   name: result.name,
        //   type: 'application/pdf',
        // })
        const data = new FormData();

        console.log(doc)
        console.log(result.uri)
        data.append("userid_card", user_id)
        data.append("id", report_id)
        data.append("image", doc)
        await axios
          .post("http://192.168.1.37:3000/users", data)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("Doc: " + doc.uri);
    }
    
    return(
        <View>
            <Button title="..." onPress={() => console.log('test')}/>
            <Button title="..." onPress={() => console.log('test')}/>
            <Button title="..." />
            <Button title="select file" onPress={() => pickDocument()}/>
            <Button title="Approve!!!" onPress={() => navigation.popToTop()}/>
            
        </View>
    )
}

export default Approve;