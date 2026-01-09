import { createPoultry, editPoultry } from "@/constants/controller";
import { PoultryInterface } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useBottomSheetStore, useChangedStore } from "@/constants/store";
import { toastConfig } from "@/constants/toastConfig";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function PoultryInputs() {
  const dataToUpdate = useBottomSheetStore((state) => state.dataToUpdate);

  const [data, setData] = useState<PoultryInterface | undefined>(dataToUpdate);

  const setChangedTrue = useChangedStore((state) => state.setChangedTrue);
  const addOrUpdate = useBottomSheetStore((state) => state.addOrUpdate);
  const setDataToUpdate = useBottomSheetStore((state) => state.setDataToUpdate);
  const setBottomSheetStatus = useBottomSheetStore(
    (state) => state.setBottomSheetStatus
  );

  const sendData = async () => {
    if (data && data?.age && data?.groupName && data?.quantity) {
      let result: any = {};

      if (dataToUpdate) {
        const dataTmp = { ...data };
        dataTmp.id = dataToUpdate.id;
        result = await editPoultry(dataTmp);
      } else {
        result = await createPoultry(data!);
      }

      if (!result) {
        Toast.show({
          type: "error",
          text1: "Something went wrong!",
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Poultry inserted!",
        });

        setChangedTrue();
        setData(undefined);
        setDataToUpdate(undefined);

        if (dataToUpdate) {
          setTimeout(() => {
            setBottomSheetStatus(false);
          }, 1000);
        }
      }
    } else {
      Toast.show({
        type: "error",
        text1: "All fields should not be empty!",
      });
    }
  };

  return (
    <View>
      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Group name</Text>
          <View style={styles.listInputcontainer}>
            <TextInput
              style={styles.input}
              value={data?.groupName}
              onChangeText={(groupName) => {
                let poultryTmp = { ...data! };
                (poultryTmp as PoultryInterface).groupName = groupName;
                setData(poultryTmp);
              }}
            ></TextInput>
          </View>
        </View>
      </View>

      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Quantity</Text>
          <View style={styles.listInputcontainer}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={data?.quantity ? data?.quantity!.toString() : ""}
              onChangeText={(quantity) => {
                let poultryTmp = { ...data! };
                (poultryTmp as PoultryInterface).quantity = !isNaN(
                  parseInt(quantity)
                )
                  ? parseInt(quantity)
                  : null;
                setData(poultryTmp);
              }}
            ></TextInput>
          </View>
        </View>
      </View>

      <View style={styles.inputItem}>
        <View style={styles.InputContainer}>
          <Text style={styles.titleInput}>Age (days number)</Text>
          <View style={styles.listInputcontainer}>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              value={data?.age ? data?.age.toString() : ""}
              onChangeText={(age) => {
                let poultryTmp = { ...data! };
                (poultryTmp as PoultryInterface).age = !isNaN(parseInt(age))
                  ? parseInt(age)
                  : null;
                setData(poultryTmp);
              }}
            ></TextInput>
          </View>
        </View>
      </View>
      {dataToUpdate ? (
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={async () => {
            await sendData();
          }}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={async () => {
            await sendData();
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}

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
});
