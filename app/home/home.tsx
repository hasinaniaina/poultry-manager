import Carousel from "@/components/home/Carousel";
import { appSettings } from "@/constants/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function home() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons
          name="menu-outline"
          size={40}
          color="black"
          style={styles.ionicons}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.helloName}>Hello Hasinaniaina</Text>
        <Text style={styles.itsTime}>It's time to feed your birds</Text>
      </View>
        <Carousel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
    overflow: "hidden",
    backgroundColor: "#FFF",
    flex: 1,
  },
  ionicons: {
    alignSelf: "flex-end",
  },
  helloName: {
    fontSize: appSettings.title.big,
    fontWeight: "bold",
  },
  itsTime: {
    color: appSettings.color.lowGrey,
  }
});
