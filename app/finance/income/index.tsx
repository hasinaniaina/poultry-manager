import NoList from "@/components/all/noList";
import Modals from "@/components/management/modals";
import { retrieveIncome, retrievePoultry } from "@/constants/controller";
import { IncomeInterface } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useBottomSheetStore, useChangedStore } from "@/constants/store";
import { calculTotal, formatDate, numStr, retreiveGroup } from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
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
  const changed = useChangedStore((state) => state.changed);
  const setChangedFalse = useChangedStore((state) => state.setChangedFalse);
  const [datas, setDatas] = useState<IncomeInterface[] | undefined>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [id, setId] = useState<string>();
    const [groupName, setGroupName] = useState<string[]>([]);

  const setBottomSheetStatus = useBottomSheetStore(
    (state) => state.setBottomSheetStatus
  );
  const setRouteName = useBottomSheetStore((state) => state.setRouteName);

  const setDataToUpdate = useBottomSheetStore((state) => state.setDataToUpdate);

  useEffect(() => {
    setChangedFalse();
    (async () => {
      const dataTmp: IncomeInterface[] | undefined = await retrieveIncome();

      const poultries = await retrievePoultry();
      const groupNameTmp = retreiveGroup(dataTmp!, poultries!);
      setGroupName(groupNameTmp);

      let totalAmountTmp = calculTotal(dataTmp);
      setTotalAmount(totalAmountTmp);
      setDatas(dataTmp);
    })();
  }, [changed]);
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.TotalPrice}>
          {numStr(totalAmount.toString(), ".")}&nbsp;Ariary
        </Text>
      </View>
      {datas && datas.length > 0 ? (
        <ScrollView style={styles.scroll}>
          {datas?.map((data, index) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                  setRouteName("income");
                  setBottomSheetStatus(true);
                  setDataToUpdate(data!);
                }}
              >
                <Image
                  source={require("@/assets/images/cash.png")}
                  style={styles.image}
                />
                <View style={styles.textPriceDateContainer}>
                  <Text style={styles.text}>{groupName[index]}&nbsp;-&nbsp;{data.label}</Text>
                  <Text style={styles.price}>
                    {numStr(data.price!.toString(), ".")}&nbsp;Ariary
                  </Text>
                  <Text style={styles.month}>
                    {formatDate(new Date(data.createdDate!))}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setId(data.id);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Ionicons name="trash-outline" size={25} color="red" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <NoList imageUrl={require("@/assets/images/cash-nolist.png")} />
      )}
      <Modals
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        view="income"
      />
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
