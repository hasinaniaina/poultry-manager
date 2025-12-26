import { appSettings } from "@/constants/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Modals({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}) {
  const displayBlackground = !modalVisible ? "none" : "flex";
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <View
          style={[styles.blackBackground, { display: displayBlackground }]}
        ></View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Ionicons name="close-circle" size={50} color={appSettings.color.red} />
              <Text style={styles.modalText}>Delete</Text>
              <Text style={styles.TextConfirmation}>
                Are you sure you want do to this action?
              </Text>
              <View style={styles.buttonModalContainer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={[styles.textStyle, styles.TextCancel]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blackBackground: {
    position: "absolute",
    bottom: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#000",
    opacity: 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal:20,

  },
  buttonDelete: {
    backgroundColor: appSettings.color.veryLowGrey
  },
  buttonClose: {
    backgroundColor: appSettings.color.red
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  TextCancel: {
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: appSettings.title.big,
  },
  TextConfirmation: {
    color: appSettings.color.lowGrey,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonModalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});
