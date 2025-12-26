import Carousel from "@/components/home/Carousel";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import { appSettings } from "@/constants/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons
          name="menu-outline"
          size={40}
          color="black"
          style={styles.ionicons}
        />
      </TouchableOpacity>
      <View style={styles.helloNameItsTimeContainer}>
        <Text style={styles.helloName}>Hello Hasinaniaina</Text>
        <Text style={styles.itsTime}>It's time to feed your birds</Text>
      </View>
      <Carousel />
      <UpcomingEvent />
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
  helloNameItsTimeContainer: {
    marginVertical: 30,
  },
  helloName: {
    fontSize: appSettings.title.big,
    fontWeight: "bold",
  },
  itsTime: {
    color: appSettings.color.lowGrey,
    fontSize: appSettings.title.meddium,
  },
});
