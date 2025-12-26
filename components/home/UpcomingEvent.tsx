import { appSettings } from "@/constants/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UpcomingEvent() {
  return (
    <View style={styles.upcomingEventContainer}>
      <Text style={styles.upcomingEvent}>Upcoming Event</Text>
      <TouchableOpacity style={styles.iconEventItemContainer}>
        <Ionicons
          name="medkit-outline"
          style={styles.icon}
          size={20}
          color="black"
        />
        <View>
          <Text style={styles.text}>Vaccination</Text>
          <Text style={styles.dates}>4th September 2025</Text>
        </View>
      </TouchableOpacity>
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
});
