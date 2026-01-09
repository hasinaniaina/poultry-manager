import { appSettings } from "@/constants/settings";
import { useBottomSheetStore } from "@/constants/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useNavigationState, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyBottomSheet from "./MyBottomSheet";

export default function MyTabs({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const insets = useSafeAreaInsets();
  const { buildHref } = useLinkBuilder();
  const router = useRoute();


  const routeNameTmp = useNavigationState((state) => {
    return state.routes[state.index].name == "index" 
      ? (router.params as {title: string}).title
      : state.routes[state.index].name

  });
  const setRouteName = useBottomSheetStore((state) => state.setRouteName);
  const setBottomSheetStatus = useBottomSheetStore((state) => state.setBottomSheetStatus);
  const bottomSheetStatus = useBottomSheetStore((state) => state.bottomSheetStatus);
 
  

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconManagement = (param: any) => {
          switch (param) {
            case "eggs":
              return "egg-outline";
            case "poultry":
              return "git-pull-request-outline";
            case "expenses":
              return "log-out-outline";
            case "income":
              return "log-in-outline";
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={index}
          >
            <Ionicons
              name={iconManagement(route.name)}
              size={25}
              color={
                isFocused ? appSettings.color.blue : appSettings.color.lowGrey
              }
            />
            <Text
              style={{
                color: isFocused
                  ? appSettings.color.blue
                  : appSettings.color.lowGrey,
                textAlign: "center",
              }}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => 
          {
            setBottomSheetStatus(true)
            setRouteName(routeNameTmp)
          }}
      >
        <Ionicons name="add-circle" size={60} color={appSettings.color.blue} />
      </TouchableOpacity>

      {bottomSheetStatus && (
          <MyBottomSheet />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingTop: 20,
    shadowOffset: { width: 10, height: 20 },
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "#FFFF",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  buttonAdd: {
    position: "absolute",
    alignItems: "center",
    top: -33,
    shadowOffset: { width: 10, height: 20 },
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 3,
  },
});
