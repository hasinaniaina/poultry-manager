import MyBottomSheet from "@/components/all/MyBottomSheet";
import NoList from "@/components/all/noList";
import Modals from "@/components/management/modals";
import {
  removeAlert,
  retrieveAlert,
  retrievePoultry,
} from "@/constants/controller";
import { AlertInterface, GroupNameProps } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useBottomSheetStore, useChangedStore } from "@/constants/store";
import {
  deprecatedAlert,
  formatDate,
  removeIndexAlertArray,
  retreiveGroup,
} from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigationState, useRoute } from "@react-navigation/native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Alert() {
  const router = useRoute();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [datas, setDatas] = useState<AlertInterface[] | undefined>();
  const [id, setId] = useState<string>();
  const [groupName, setGroupName] = useState<GroupNameProps[]>([]);

  const routeName = useNavigationState(
    (state) => (router.params as { title: string }).title,
  );

  const changed = useChangedStore((state) => state.changed);
  const setChangedFalse = useChangedStore((state) => state.setChangedFalse);

  const bottomSheetStatus = useBottomSheetStore(
    (state) => state.bottomSheetStatus,
  );

  const setBottomSheetStatus = useBottomSheetStore(
    (state) => state.setBottomSheetStatus,
  );
  const setRouteName = useBottomSheetStore((state) => state.setRouteName);

  const setDataToUpdate = useBottomSheetStore((state) => state.setDataToUpdate);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setChangedFalse();

    (async () => {
      const datasTmp: AlertInterface[] | undefined = await retrieveAlert();

      const deprecatedAlertIdPoultries = deprecatedAlert(datasTmp!);

      if (deprecatedAlertIdPoultries.length > 0) {
        deprecatedAlertIdPoultries.map((idAlert) => {
          removeAlert(idAlert);

          removeIndexAlertArray(datasTmp!, idAlert);
        });
      }

      setDatas(datasTmp);

      const poultries = await retrievePoultry();
      const groupNameTmp = retreiveGroup(datasTmp!, poultries!);
      setGroupName(groupNameTmp);
    })();
  }, [changed]);

  return (
    <View style={styles.container}>
      {datas && datas.length > 0 ? (
        <ScrollView style={styles.scroll}>
          {datas?.map((data, index) => {
            return (
              <TouchableOpacity
                style={styles.itemContainer}
                key={data.id}
                onPress={() => {
                  setRouteName("alert");
                  setBottomSheetStatus(true);
                  setDataToUpdate(data!);
                }}
              >
                <Image
                  source={require("@/assets/images/calendar.png")}
                  style={styles.image}
                />
                <View style={styles.textWeightDateContainer}>
                  <Text style={styles.text}>
                    {groupName.find((item) => item.id === data.id)?.groupName}
                    &nbsp;-&nbsp;{data.label}
                  </Text>
                  <Text style={styles.month}>
                    {formatDate(new Date(data.date))}
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
        <NoList imageUrl={require("@/assets/images/calendar-nolist.png")} />
      )}
      <TouchableOpacity
        style={[styles.buttonAdd, { marginBottom: insets.bottom }]}
        onPress={() => {
          setRouteName(routeName);
          setBottomSheetStatus(true);
        }}
      >
        <Ionicons name="add-circle" size={60} color={appSettings.color.blue} />
      </TouchableOpacity>

      <Modals
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        view="alert"
        id={id}
      />
      {bottomSheetStatus && <MyBottomSheet />}
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
