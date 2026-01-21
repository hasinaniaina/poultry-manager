import NoList from "@/components/all/noList";
import Modals from "@/components/management/modals";
import { retrievePoultry } from "@/constants/controller";
import { PoultryInterface } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useBottomSheetStore, useChangedStore } from "@/constants/store";
import { calculTotalPoultries, convertDaysToWeeks } from "@/constants/utils";
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

export default function Poultry() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [datas, setDatas] = useState<PoultryInterface[] | null>();
  const [totalPoultry, setTotalPoultry] = useState<Number | undefined>();
  const [id, setId] = useState<string | null>();

  const changed = useChangedStore((state) => state.changed);
  const setChangedFalse = useChangedStore((state) => state.setChangedFalse);

  const setDataToUpdate = useBottomSheetStore((state) => state.setDataToUpdate);

  const bottomSheetStatus = useBottomSheetStore(
    (state) => state.bottomSheetStatus,
  );
  const setBottomSheetStatus = useBottomSheetStore(
    (state) => state.setBottomSheetStatus,
  );
  const routeName = useBottomSheetStore((state) => state.routeName);
  const setRouteName = useBottomSheetStore((state) => state.setRouteName);

  useEffect(() => {
    setChangedFalse();

    (async () => {
      const poultry = await retrievePoultry();
      setDatas(poultry);
      const totalPoultryTmp = calculTotalPoultries(poultry!);
      setTotalPoultry(totalPoultryTmp);
    })();
  }, [changed]);

  return (
    <View style={styles.container}>
      <View style={styles.totalPoultryContainer}>
        <Text style={styles.total}>Total: </Text>
        <Text style={styles.number}>{String(totalPoultry)}&nbsp;poultries</Text>
      </View>
      {datas && datas.length > 0 ? (
        <ScrollView style={styles.scroll}>
          {datas?.map((data: PoultryInterface) => {
            return (
              <TouchableOpacity
                style={styles.poultryItemContainer}
                key={data.id}
                onPress={() => {
                  setRouteName("poultry");
                  setBottomSheetStatus(true);
                  setDataToUpdate(data);
                }}
              >
                <Image
                  source={require("@/assets/images/chicken.png")}
                  style={styles.image}
                />
                <View style={styles.textMonthDateContainer}>
                  <Text style={styles.text}>{data.groupName}&nbsp;group</Text>
                  <Text style={styles.week}>
                    {convertDaysToWeeks(data.age!, data.createdDate!)}
                  </Text>
                  <Text style={styles.month}>
                    {data.quantity}&nbsp;poultries
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setId(data.id);
                  }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={25}
                    color={appSettings.color.red}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <NoList imageUrl={require("@/assets/images/chicken-noList.png")} />
      )}
      <Modals
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        id={id}
        view="poultry"
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
  text: {
    fontWeight: 600,
  },
  week: {
    color: appSettings.color.lowGrey,
    fontSize: 10,
  },
  month: {
    color: appSettings.color.blue,
    fontSize: 10,
  },
});
