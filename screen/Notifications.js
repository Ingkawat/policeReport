import * as React from "react";
import { ScrollView, Text, View, SafeAreaView, StyleSheet } from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

function Notifications() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#135DD8",
              width: "90%",
              height: 50,
              borderRadius: 5,
              marginTop: 10,
              justifyContent: 'center'
            }}
          >
            <View style={[styles.row, {paddingLeft: 10}]}>
              <Entypo name="text-document" size={20} color="white" />
              <Text style={{paddingLeft: 10, color: 'white'}}>asd</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Notifications;

