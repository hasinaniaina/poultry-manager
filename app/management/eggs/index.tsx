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

export default function Eggs() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.totalPoultryContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.number}>60 Egg(s)</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.poultryItemContainer}>
          <Image
            source={require("@/assets/images/egg.png")}
            style={styles.image}
          />
          <View style={styles.textMonthDateContainer}>
            <Text style={styles.numberEggs}>30</Text>
            <Text style={styles.group}>Group: Bevolo</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.poultryItemContainer}>
          <Image
            source={require("@/assets/images/egg.png")}
            style={styles.image}
          />
          <View style={styles.textMonthDateContainer}>
            <Text style={styles.numberEggs}>30</Text>
            <Text style={styles.group}>Group: Bevolo</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.poultryItemContainer}>
          <Image
            source={require("@/assets/images/egg.png")}
            style={styles.image}
          />
          <View style={styles.textMonthDateContainer}>
            <Text style={styles.numberEggs}>30</Text>
            <Text style={styles.group}>Group: Bevolo</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity>
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
  totalPoultryContainer: {
    flexDirection: "row",
    marginBottom: 40,
  },
  total: {
    color: appSettings.color.mediumGrey,
  },
  number: {
    color: appSettings.color.blue,
    fontWeight: 600,
  },
  scroll: {
    height: 300,
  },
  poultryItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  textMonthDateContainer: {},
  image: {
    width: 70,
    height: 70,
  },
  numberEggs: {
    color: appSettings.color.blue,
    fontWeight: 600,
  },
  group: {
    fontSize: 10,
  },
  month: {
    color: appSettings.color.lowGrey,
    fontSize: 10,
  },
});
