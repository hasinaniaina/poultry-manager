// App.jsx
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { appSettings } from "./settings";

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        marginHorizontal: 10,
        backgroundColor: appSettings.color.green,
        width: "100%",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "600",
        color: "white",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{ color: "#FFF", fontSize: 15, fontWeight: "600" }}
      style={{
        width: "100%",
        backgroundColor: appSettings.color.red,
        borderLeftColor: appSettings.color.red,
      }}
    />
  ),
};
