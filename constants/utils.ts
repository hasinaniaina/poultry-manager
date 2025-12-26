import { ParamListBase, RouteProp, useNavigationState } from "@react-navigation/native";
import Moment from "moment";
import { createContext } from "react";

export const dateFormated = (date: Date) => {
  return Moment(date).format("DD/MM/Y");
};

interface BottomSheetContextType {
  bottomSheetStatus: boolean;
  setBottomSheetStatus: React.Dispatch<React.SetStateAction<boolean>>;
  routeName: string;
}

export const BottomSheetStatusContext =
  createContext<BottomSheetContextType | null>(null);



export const getRouteName = (router: RouteProp<ParamListBase>) => {
  return useNavigationState((state) => 
    state.routes[state.index].name == "index"
      ? (router.params as { title: string }).title
      : state.routes[state.index].name
  );
};
