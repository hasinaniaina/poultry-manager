import {
  ParamListBase,
  RouteProp,
  useNavigationState,
} from "@react-navigation/native";
import Moment from "moment";
import { createContext } from "react";
import { BottomSheetContextType, ChangedViewContextType } from "./interface";

export const dateFormated = (date: Date) => {
  return Moment(date).format("DD/MM/Y");
};

export const BottomSheetStatusContext =
  createContext<BottomSheetContextType | null>(null);

export const ChangeViewStatusContext =
  createContext<ChangedViewContextType | null>(null);

export const getRouteName = (router: RouteProp<ParamListBase>) => {
  return useNavigationState((state) =>
    state.routes[state.index].name == "index"
      ? (router.params as { title: string }).title
      : state.routes[state.index].name
  );
};

const intervalOfDate = (createdDate: Date): number => {
  const date1: any = new Date(createdDate);
  const date2: any = new Date();

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const convertDaysToWeeks = (days: number, createdDate: Date) => {
  const intervalOfDateTmp = intervalOfDate(createdDate);
  const daysTmp = Number(days) + Number(intervalOfDateTmp);
  
  const weeks = Math.floor(daysTmp / 7);
  const remainingDays = daysTmp % 7;
  const weeksRemainingDays = weeks + " week(s) - " + remainingDays + " day(s)";

  return weeksRemainingDays;
};
