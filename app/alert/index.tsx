import MyBottomSheet from "@/components/all/MyBottomSheet";
import Modals from "@/components/management/modals";
import { appSettings } from "@/constants/settings";
import { BottomSheetStatusContext } from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigationState, useRoute } from "@react-navigation/native";
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

export default function Alert() {
  const router = useRoute();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bottomSheetStatus, setBottomSheetStatus] = useState<boolean>(false);

  const routeName = useNavigationState(
    (state) => (router.params as {title: string}).title
  );

  // const routeName = getRouteName(router);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.itemContainer}>
          <Image
            source={require("@/assets/images/syringe.png")}
            style={styles.image}
          />
          <View style={styles.textWeightDateContainer}>
            <Text style={styles.text}>Vaccination parvo</Text>
            <Text style={styles.month}>6th September 2025</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={[styles.buttonAdd, { marginBottom: insets.bottom }]}
        onPress={() => setBottomSheetStatus(!bottomSheetStatus)}
      >
        <Ionicons name="add-circle" size={60} color={appSettings.color.blue} />
      </TouchableOpacity>

      <Modals modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {bottomSheetStatus && (
        <BottomSheetStatusContext.Provider
          value={{ bottomSheetStatus, setBottomSheetStatus, routeName }}
        >
          <MyBottomSheet />
        </BottomSheetStatusContext.Provider>
      )}
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
    bottom: 0,
    right: 10,
    shadowOffset: { width: 10, height: 20 },
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 10,
    zIndex: 10,
  },
});
