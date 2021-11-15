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
  RefreshControl,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import axios from "axios";
import policeData from "../thiitangsthaaniitamrwcchnkhrbaal-.json";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Status = ({ navigation }) => {
  const { state, getReport } = useContext(AuthContext);
  const [report, setreport] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const police_station = ["-"];
  for (let i = 0; i < policeData.features.length; i++) {
    police_station.push(policeData.features[i].properties.name);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    axios
      //use your ip address type in cmd ipconfig***
      .post(`http:/192.168.1.113:3000/report/${state.username}`)
      .then((res) => {
        setreport(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(report);

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {report.map((prop, key) => {
          return (
            <View>
              {prop.status == "inprocess" ? (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    navigation.navigate("Info", {
                      report_id: prop.report_id,
                      police_id: prop.police_id,
                      report_type: prop.report_type,
                    });
                  }}
                >
                  <View
                    style={[
                      styles.container,
                      {
                        backgroundColor: "#1597e5",
                        height: 100,
                        borderBottomWidth: 1,
                        borderBottomColor: "#E4DFD9",
                      },
                    ]}
                  >
                    <View
                      style={{
                        width: "15%",
                        justifyContent: "center",
                        height: 100,
                        alignItems: "center",
                      }}
                    >
                      <Entypo name="text-document" size={50} color="black" />
                    </View>
                    <View
                      style={{
                        width: "45%",
                        justifyContent: "center",
                        height: 100,
                      }}
                    >
                      <Text>{prop.report_type}</Text>
                      <Text>{police_station[prop.station]}</Text>
                    </View>
                    <View
                      style={{
                        width: "35%",
                        justifyContent: "center",
                        height: 100,
                      }}
                    >
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <AntDesign name="calendar" size={20} color="black" />
                        <Text style={{ fontSize: 12 }}> {prop.date}</Text>
                      </View>
                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        <Text>{prop.status}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View>
                  {prop.status == "pending" ? (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        navigation.navigate("Info", {
                          report_id: prop.report_id,
                          police_id: prop.police_id,
                          report_type: prop.report_type,
                        });
                      }}
                    >
                      <View
                        style={[
                          styles.container,
                          {
                            height: 100,
                            borderBottomWidth: 1,
                            borderBottomColor: "#E4DFD9",
                          },
                        ]}
                      >
                        <View
                          style={{
                            width: "15%",
                            justifyContent: "center",
                            height: 100,
                            alignItems: "center",
                          }}
                        >
                          <Entypo
                            name="text-document"
                            size={50}
                            color="black"
                          />
                        </View>
                        <View
                          style={{
                            width: "45%",
                            justifyContent: "center",
                            height: 100,
                          }}
                        >
                          <Text style={{color:'black'}}>{prop.report_type}</Text>
                          <Text style={{color:'black'}}>{police_station[prop.station]}</Text>
                        </View>
                        <View
                          style={{
                            width: "35%",
                            justifyContent: "center",
                            height: 100,
                          }}
                        >
                          <View
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                          >
                            <AntDesign
                              name="calendar"
                              size={20}
                              color="black"
                            />
                            <Text style={{ fontSize: 12, color: 'black' }}> {prop.date}</Text>
                          </View>
                          <View
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                          >
                            <Text style={{color:'black'}}> {prop.status}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          navigation.navigate("Info", {
                            report_id: prop.report_id,
                            police_id: prop.police_id,
                            report_type: prop.report_type,
                          });
                        }}
                      >
                        <View
                          style={[
                            styles.container,
                            {
                              backgroundColor: "#9ae66d",
                              height: 100,
                              borderBottomWidth: 1,
                              borderBottomColor: "#E4DFD9",
                            },
                          ]}
                        >
                          <View
                            style={{
                              width: "15%",
                              justifyContent: "center",
                              height: 100,
                              alignItems: "center",
                            }}
                          >
                            <Entypo
                              name="text-document"
                              size={50}
                              color="black"
                            />
                          </View>
                          <View
                            style={{
                              width: "45%",
                              justifyContent: "center",
                              height: 100,
                            }}
                          >
                            <Text style={{color:'black'}}>{prop.report_type}</Text>
                            <Text style={{color:'black'}}>{police_station[prop.station]}</Text>
                          </View>
                          <View
                            style={{
                              width: "35%",
                              justifyContent: "center",
                              height: 100,
                            }}
                          >
                            <View
                              style={{ flexDirection: "row", flexWrap: "wrap" }}
                            >
                              <AntDesign
                                name="calendar"
                                size={20}
                                color="black"
                              />
                              <Text style={{ fontSize: 12, color: 'black' }}> {prop.date}</Text>
                            </View>
                            <View
                              style={{ flexDirection: "row", flexWrap: "wrap" }}
                            >
                              <Text style={{color:'black'}}>{prop.status}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    width: "50%", // is 50% of container width
  },
});

export default Status;
