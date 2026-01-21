import { globalStyle } from "@/constants/globalStyle";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function NoList({
  imageUrl,
}: {
  imageUrl: ImageSourcePropType;
}) {
  return (
    <View style={globalStyle.noList}>
      <Image source={imageUrl} style={styles.nolistImage} />
      <Text style={globalStyle.noListText}>No list</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nolistImage: {
    width: 200,
    height: 200,
  },
});
