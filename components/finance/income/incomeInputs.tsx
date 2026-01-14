import {
  createIncome,
  editIncome,
  retrievePoultry,
} from "@/constants/controller";
import { IncomeInterface, PoultryInterface } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useBottomSheetStore, useChangedStore } from "@/constants/store";
import { toastConfig } from "@/constants/toastConfig";
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

export default function IncomeInputs() {
  const dataToUpdate = useBottomSheetStore((state) => state.dataToUpdate);
  const [data, setData] = useState<IncomeInterface | undefined>(dataToUpdate);

  const setChangedTrue = useChangedStore((state) => state.setChangedTrue);
  const addOrUpdate = useBottomSheetStore((state) => state.addOrUpdate);
  const setDataToUpdate = useBottomSheetStore((state) => state.setDataToUpdate);
  const setBottomSheetStatus = useBottomSheetStore(
    (state) => state.setBottomSheetStatus
  );

  const changed = useChangedStore((state) => state.changed);

  const [groups, setGroups] = useState<PoultryInterface[] | null>();

  let groupList: any[] = [];

  groups?.map((group) => {
    groupList.push({ label: group.groupName, value: group.id });
  });

  const sendData = async () => {
    console.log(data);

    if (
      data &&
      data?.label &&
      data?.price &&
      data?.quantity &&
      data.idPoultry
    ) {
      let result: any = {};

      if (dataToUpdate) {
        const dataTmp = { ...data };
        dataTmp.id = dataToUpdate.id;
        result = await editIncome(dataTmp);
      } else {
        result = await createIncome(data!);
      }

      if (!result) {
        Toast.show({
          type: "error",
          text1: "Perhaps a quantity error!",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Income inserted!",
        });

        if (dataToUpdate) {
          setTimeout(() => {
            setBottomSheetStatus(false);
            setDataToUpdate(undefined);
          }, 1000);
        }

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

  const dataLabel = [
    { label: "Sell poultry", value: "Sell poultry" },
    { label: "Sell eggs", value: "Sell eggs" },
    { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    (async () => {
      const groupTmp = await retrievePoultry();
      setGroups(groupTmp);
    })();
  }, [changed]);
  return (
    <View>
      {!dataToUpdate && (
        <View style={styles.inputItem}>
          <View style={styles.InputContainer}>
            <Text style={styles.titleInput}>Label</Text>
            <View style={styles.listInputcontainer}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataLabel}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select label"
                searchPlaceholder="Search..."
                value={data?.label}
                onChange={(item) => {
                  let dataTmp = { ...data! };
                  dataTmp.label = item.value;
                  setData(dataTmp);
                }}
              />
            </View>
          </View>
        </View>
      )}

      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Price (Ariary)</Text>
          <View style={styles.listInputcontainer}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="1.000"
              value={data?.price ? String(data?.price) : ""}
              onChangeText={(price) => {
                let dataTmp = { ...data! };
                dataTmp.price = !isNaN(Number(price)) ? Number(price) : null;
                setData(dataTmp);
              }}
            ></TextInput>
          </View>
        </View>
      </View>
      {!dataToUpdate && (
        <>
          <View style={styles.inputItem}>
            <View style={styles.InputContainer}>
              <Text style={styles.titleInput}>Quantity (kg/unity)</Text>
              <View style={styles.listInputcontainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="12"
                  value={data?.quantity ? String(data?.quantity) : ""}
                  onChangeText={(quantity) => {
                    let dataTmp = { ...data! };
                    dataTmp.quantity = !isNaN(Number(quantity))
                      ? Number(quantity)
                      : null;
                    setData(dataTmp);
                  }}
                ></TextInput>
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
                  data={groupList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Group"
                  searchPlaceholder="Search..."
                  value={data?.idPoultry}
                  onChange={(item) => {
                    const dataTmp = { ...data! };
                    dataTmp.idPoultry = item.value;
                    setData(dataTmp);
                  }}
                />
              </View>
            </View>
          </View>
        </>
      )}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={async () => {
          await sendData();
        }}
      >
        {dataToUpdate ? (
          <Text style={styles.buttonText}>Update</Text>
        ) : (
          <Text style={styles.buttonText}>Add</Text>
        )}
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
