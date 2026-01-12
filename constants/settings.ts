import { StatusBar } from "react-native";

export const appSettings = {
  title: {
    big: 20,
    meddium: 15,
  },
  color: {
    veryLowGrey: "#ebeaeaff",
    lowGrey: "#B4B4B4",
    mediumGrey: "#717171",
    blue: "#4EABD9",
    red: "#F24A41",
    green: "#447a70",
  },
  sectionContainer: {
    paddingTop: 10,
  },

  config: {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  },

  container: {
    container: {
      paddingTop: StatusBar.currentHeight || 0,
      paddingHorizontal: 10,
      overflow: "hidden",
      backgroundColor: "#FFF",
      flex: 1,
    },
  },
                     
};
