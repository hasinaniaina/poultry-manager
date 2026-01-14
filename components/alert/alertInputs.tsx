import { createAlert, retrievePoultry } from "@/constants/controller";
import { AlertInterface, PoultryInterface } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useChangedStore } from "@/constants/store";
import { toastConfig } from "@/constants/toastConfig";
import { dateFormated } from "@/constants/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";

export default function AlertInputs() {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const [data, setData] = useState<AlertInterface | undefined>();

  const changed = useChangedStore((state) => state.changed);
  const setChangedTrue = useChangedStore((state) => state.setChangedTrue);
  const [groups, setGroups] = useState<PoultryInterface[] | null>();

  const sendData = async () => {
    if (data && data?.label && data?.date && data?.idPoultry) {
      const result = await createAlert(data);

      if (!result) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Expense inserted!",
        });

        setChangedTrue();
        // if (dataToUpdate) {
        //   setTimeout(() => {
        //     setBottomSheetStatus(false);
        //     setDataToUpdate(undefined);
        //   }, 1000);
        // }

        setChangedTrue();
        setData(undefined);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "All fields should not be empty!",
      });
    }
  };

  let groupList: any[] = [];

  groups?.map((group) => {
    groupList.push({ label: group.groupName, value: group.id });
  });

  useEffect(() => {
    (async () => {
      const groupTmp = await retrievePoultry();
      setGroups(groupTmp);
    })();
  }, [changed]);

  const dataTmp = [
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
          <Text style={styles.titleInput}>Group</Text>
          <View style={styles.listInputcontainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={groupList!}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Group"
              searchPlaceholder="Search..."
              value={data?.idPoultry}
              onChange={(group) => {
                const groupTmp = { ...data! };
                groupTmp.idPoultry = group.value;
                setData(groupTmp);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Label</Text>
          <View style={styles.listInputcontainer}>
            <TextInput
              style={styles.input}
              onChangeText={(label) => {
                const dataTmp = { ...data! };
                dataTmp.label = label;
                setData(dataTmp);
              }}
            ></TextInput>
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
              <Text>
                {data?.date
                  ? dateFormated(new Date(data?.date!))
                  : dateFormated(new Date())}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={data?.date ? new Date(data?.date!) : new Date()}
                onChange={(event, selectedDate) => {
                  const dataTmp = { ...data! };
                  dataTmp.date = String(selectedDate!);
                  setData(dataTmp);
                  setShowDatePicker(false);
                }}
              />
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={async () => {
          await sendData();
        }}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      <Toast config={toastConfig} position="bottom" bottomOffset={0} />
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
    width: "90%",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: appSettings.color.lowGrey,
  },
  selectedTextStyle: {},
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
