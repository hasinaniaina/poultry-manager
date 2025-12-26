import { appSettings } from "@/constants/settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomDrawerContent(props: any) {
  const navigation = useRouter();

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate({pathname: "/management/poultry",  params: {title: "poultry"}});
        }}
      >
        <Ionicons
          name="folder-outline"
          style={styles.icon}
          size={20}
          color="black"
        />
        <Text style={styles.menuText}>Management</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate({pathname:"/finance/expenses",  params: {title: "expenses"}});
        }}
      >
        <Ionicons
          name="cash-outline"
          style={styles.icon}
          size={20}
          color="black"
        />
        <Text style={styles.menuText}>Finance</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => {
        navigation.navigate({pathname:"/stockManagement",  params: {title: "stockManagement"}});
      }}>
        <Ionicons
          name="cart-outline"
          style={styles.icon}
          size={20}
          color="black"
        />
        <Text style={styles.menuText}>Stock management</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => {
        navigation.navigate({pathname:"/alert",  params: {title: "alert"}});
      }}>
        <Ionicons
          name="medkit-outline"
          style={styles.icon}
          size={20}
          color="black"
        />
        <Text style={styles.menuText}>Alert</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => {
        navigation.navigate({pathname:"/alert",  params: {title: "statistic"}});
      }}>
        <Ionicons
          name="stats-chart-outline"
          style={styles.icon}
          size={20}
          color="black"
        />
        <Text style={styles.menuText}>statistic</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    marginVertical: 30,
  },
  icon: {
    marginRight: 20,
  },
  menuText: {
    fontSize: appSettings.title.meddium,
    fontWeight: 400,
    marginRight: 20,
  },
});
