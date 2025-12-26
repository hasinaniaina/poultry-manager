import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Alert",
          animation: "slide_from_left",
          headerBackVisible: true         
        }}
        initialParams={{ title: "Alert" }}
      />
    </Stack>
  );
}
