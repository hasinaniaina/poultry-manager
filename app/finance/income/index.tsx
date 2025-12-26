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

export default function Income() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.TotalPrice}>7000 Ariary</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={require("@/assets/images/cash.png")}
            style={styles.image}
          />
          <View style={styles.textPriceDateContainer}>
            <Text style={styles.text}>Bevolo - Vente akoho</Text>
            <Text style={styles.price}>3000 Ariary</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={require("@/assets/images/cash.png")}
            style={styles.image}
          />
          <View style={styles.textPriceDateContainer}>
            <Text style={styles.text}>Bevolo - Vente akoho</Text>
            <Text style={styles.price}>3000 Ariary</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={require("@/assets/images/cash.png")}
            style={styles.image}
          />
          <View style={styles.textPriceDateContainer}>
            <Text style={styles.text}>Bevolo - Vente akoho</Text>
            <Text style={styles.price}>3000 Ariary</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
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
  TotalPrice: {
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
  textPriceDateContainer: {},
  image: {
    width: 70,
    height: 70,
  },
  text: {
    fontWeight: 600,
  },
  price: {
    fontSize: 10,
    color: appSettings.color.blue,
  },
  month: {
    color: appSettings.color.lowGrey,
    fontSize: 10,
  },
});
