import Modals from "@/components/management/modals";
import { appSettings } from "@/constants/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StockManagement() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.TotalWeight}>18 kg</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={require("@/assets/images/seed-sack.png")}
            style={styles.image}
          />
          <View style={styles.textWeightDateContainer}>
            <Text style={styles.text}>Provende</Text>
            <Text style={styles.weight}>6kg - 3000 Ariary</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={[styles.buttonAdd, { marginBottom: insets.bottom }]}
      >
        <Ionicons name="add-circle" size={60} color={appSettings.color.blue} />
      </TouchableOpacity>
      <Modals modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
  totalContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  total: {
    color: appSettings.color.mediumGrey,
  },
  TotalWeight: {
    color: appSettings.color.blue,
    fontWeight: 600,
  },
  scroll: {
    height: 300,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  textWeightDateContainer: {},
  image: {
    width: 70,
    height: 70,
  },
  text: {
    fontWeight: 600,
  },
  weight: {
    fontSize: 10,
    color: appSettings.color.blue,
  },
  month: {
    color: appSettings.color.lowGrey,
    fontSize: 10,
  },
  buttonAdd: {
    position: "absolute",
    alignItems: "center",
    bottom: 10,
    right: 10,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    
  },
});
