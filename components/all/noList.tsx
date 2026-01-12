import { globalStyle } from "@/constants/globalStyle";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

export default function NoList({imageUrl}: {
    imageUrl: ImageSourcePropType;
}) {


  return (
    <View style={globalStyle.noList}>
      <Image source={imageUrl} />
      <Text style={globalStyle.noListText}>No list</Text>
    </View>
  );
}
