import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          animation: "slide_from_left",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
