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
          name="expenses"
          options={{
            animation: "shift",
            title: "Expenses",
            headerTitle: "Finance",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="money" color={color} />
            ),
          }}
          initialParams={{ title: "expenses" }}
        />

        <Tabs.Screen
          name="income"
          options={{
            animation: "shift",
            title: "Income",
            headerTitle: "Finance",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="money" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
