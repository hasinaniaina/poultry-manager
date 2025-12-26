import MyTabs from "@/components/all/myTabs";
import { appSettings } from "@/constants/settings";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {

  return (
    <View style={{flex: 1}}>
      <Tabs
        screenOptions={{ tabBarActiveTintColor: appSettings.color.blue }}
        tabBar={(props) => <MyTabs {...props} />}
      >
        <Tabs.Screen
          name="poultry"
          options={{
            animation: "shift",
            title: "Poultry",
            headerTitle: "Management",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="eggs"
          options={{
            animation: "shift",
            title: "Eggs",
            headerTitle: "Management",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
