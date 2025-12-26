import { appSettings } from "@/constants/settings";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PoultryInputs() {
  return (
    <View>
      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Group name</Text>
          <View style={styles.listInputcontainer}>
            <TextInput style={styles.input}></TextInput>
          </View>
        </View>
      </View>

      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Number</Text>
          <View style={styles.listInputcontainer}>
            <TextInput keyboardType="numeric" style={styles.input}></TextInput>
          </View>
        </View>
      </View>

      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Age (days number)</Text>
          <View style={styles.listInputcontainer}>
            <TextInput keyboardType="numeric" style={styles.input}></TextInput>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    
  inputItem: {
    marginBottom: 20,
  },
  InputContainer: {
    backgroundColor: appSettings.color.veryLowGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  titleInput: {
    color: appSettings.color.mediumGrey,
  },
  input: {
    flex: 1,
  },
  listInputcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonAdd: {
    backgroundColor: appSettings.color.blue,
    alignItems: "center",
    width: 170,
    paddingVertical: 15,
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
  },
})
