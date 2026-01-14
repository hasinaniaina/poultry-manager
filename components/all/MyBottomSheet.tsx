import { appSettings } from "@/constants/settings";
import { useBottomSheetStore } from "@/constants/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  findNodeHandle,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlertInputs from "../alert/alertInputs";
import ExpensesInputs from "../finance/expenses/expensesInputs";
import IncomeInputs from "../finance/income/incomeInputs";
import EggsInputs from "../management/eggs/eggsInputs";
import PoultryInputs from "../management/Poultry/poultryInputs";

export default function MyBottomSheet() {
  const setBottomSheetStatus = useBottomSheetStore(
    (state) => state.setBottomSheetStatus
  );
  const routeName = useBottomSheetStore((state) => state.routeName);
  const bottomSheetStatus = useBottomSheetStore(
    (state) => state.bottomSheetStatus
  );
  const setDataToUpdate = useBottomSheetStore((state) => state.setDataToUpdate);

  const { top, bottom } = useSafeAreaInsets();
  const tabLayoutRef = useRef(null);
  const [tabLayoutPosition, setTabLayoutPosition] = useState({ y: 0 });

  const slideAnim = useRef(new Animated.Value(0)).current;

  // Récupérer la position du tabLayout
  const measureTabLayout = () => {
    const node = findNodeHandle(tabLayoutRef.current);

    if (node) {
      UIManager.measureInWindow(node, (x, y, width, height) => {
        const realY = y - (top + 33);
        setTabLayoutPosition({ y: realY });
      });
    }
  };

  useEffect(() => {
    measureTabLayout();
  }, []);

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setBottomSheetStatus(false);
    });
  };

  useEffect(() => {
    if (bottomSheetStatus) {
      slideUp();
    }
  }, [bottomSheetStatus]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });


  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

  return (
    <View
      ref={tabLayoutRef}
      style={[styles.backdrop, { top: -tabLayoutPosition.y + 100 }]}
    >
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Animated.View
          style={[
            styles.content,
            { paddingBottom: bottom, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Add {routeName}</Text>
            <TouchableOpacity
              onPress={() => {
                slideDown();
                setDataToUpdate(undefined);
              }}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>

          {routeName == "poultry" && <PoultryInputs />}
          {routeName == "eggs" && <EggsInputs />}
          {routeName == "expenses" && <ExpensesInputs />}
          {routeName == "income" && <IncomeInputs />}
          {routeName == "alert" && <AlertInputs />}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    height: Dimensions.get("screen").height - 80,
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(0,0,0,0.5)",
    elevation: 10,
    paddingTop: StatusBar.currentHeight || 0,
    justifyContent: "flex-end",
    zIndex: 20,
  },
  content: {
    backgroundColor: "#FFF",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: appSettings.title.big,
    fontWeight: 600,
  },
});
