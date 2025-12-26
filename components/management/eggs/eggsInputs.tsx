import { appSettings } from "@/constants/settings";
import { dateFormated } from "@/constants/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function EggsInputs() {
  const [eggsDate, setEggsDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  return (
    <View>
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
          <Text style={styles.titleInput}>Date</Text>
          <View style={styles.listInputcontainer}>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[styles.input, { paddingVertical: 10 }]}
            >
              <Text>{dateFormated(eggsDate)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={eggsDate}
                onChange={(event, selectedDate) => {
                  setEggsDate(selectedDate!);
                  setShowDatePicker(false);
                }}
              />
            )}
          </View>
        </View>
      </View>

      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Group</Text>
          <View style={styles.listInputcontainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Group"
              searchPlaceholder="Search..."
              value={"test"}
              onChange={(item) => {}}
            //   renderLeftIcon={() => (
            //     <AntDesign
            //       style={styles.icon}
            //       color="black"
            //       name="arrow-down"
            //       size={20}
            //     />
            //   )}
            />
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
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    width: "90%"
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: appSettings.color.lowGrey
  },
  selectedTextStyle: {
    
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
