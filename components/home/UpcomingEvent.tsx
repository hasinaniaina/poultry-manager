import { retrieveAlert, retrievePoultry } from "@/constants/controller";
import { AlertInterface, GroupNameProps } from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useChangedStore } from "@/constants/store";
import { formatDate, retreiveGroup } from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UpcomingEvent() {
  const [datas, setDatas] = useState<AlertInterface[] | undefined>();
  const [groupName, setGroupName] = useState<GroupNameProps[]>([]);

  const changed = useChangedStore((state) => state.changed);

  useEffect(() => {
    (async () => {
      const datasTmp: AlertInterface[] | undefined = await retrieveAlert();
      setDatas(datasTmp);

      const poultries = await retrievePoultry();
      const groupNameTmp = retreiveGroup(datasTmp!, poultries!);
      setGroupName(groupNameTmp);
    })();
  }, [changed]);
  return (
    <View style={styles.upcomingEventContainer}>
      <Text style={styles.upcomingEvent}>Upcoming Event</Text>
      {datas && datas.length > 0 ? (
        datas?.map((data, index) => {
          return (
            <TouchableOpacity
              style={styles.iconEventItemContainer}
              key={data.id}
            >
              <Ionicons
                name="alarm-outline"
                style={styles.icon}
                size={20}
                color="red"
              />
              <View>
                <Text style={styles.text}>
                  {groupName.find((item) => item.id === data.id)?.groupName}
                  &nbsp;-&nbsp;{data.label}
                </Text>
                <Text style={styles.dates}>
                  {formatDate(new Date(data.date))}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={styles.noAlert}>
          <Image
            source={require("@/assets/images/calendar-nolist.png")}
            style={styles.noAlertImage}
          />
          <Text style={styles.noAlertText}>No Alert</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  upcomingEventContainer: {
    paddingTop: appSettings.sectionContainer.paddingTop,
  },
  upcomingEvent: {
    fontSize: appSettings.title.meddium,
    color: appSettings.color.mediumGrey,
    fontWeight: 600,
  },
  iconEventItemContainer: {
    flexDirection: "row",
    marginVertical: 20,
    alignItems: "center",
  },

  icon: {
    marginRight: 20,
  },
  text: {
    color: appSettings.color.blue,
    fontSize: appSettings.title.meddium,
    fontWeight: 600,
    marginBottom: 3,
  },
  dates: {
    color: appSettings.color.mediumGrey,
    fontSize: 12,
  },
  noAlert: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    marginTop: 20,
  },
  noAlertImage: {
    width: 140,
    height: 140,
  },
  noAlertText: {
    marginTop: 50,
    fontWeight: 300,
    fontSize: 20,
  },
});
