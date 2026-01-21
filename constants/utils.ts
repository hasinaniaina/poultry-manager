import {
  ParamListBase,
  RouteProp,
  useNavigationState,
} from "@react-navigation/native";
import Moment from "moment";
import { createContext } from "react";
import {
  removeAlert,
  removeExpense,
  removeIncome,
  removePoultry,
} from "./controller";
import {
  AlertInterface,
  BottomSheetContextType,
  ChangedViewContextType,
  ExpenseInterface,
  GroupNameProps,
  IncomeInterface,
  PoultryInterface,
} from "./interface";

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
      : state.routes[state.index].name,
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

export const removeItem = async (
  id: string,
  view: string,
): Promise<boolean> => {
  let result = false;
  switch (view) {
    case "poultry":
      result = await removePoultry(id);
    case "expense":
      result = await removeExpense(id);
    case "income":
      result = await removeIncome(id);
    case "alert":
      result = await removeAlert(id);
  }

  return result;
};

export const calculTotal = (table: any[] | undefined) => {
  let total = 0;
  table?.map((value) => {
    total += value.price;
  });

  return total;
};

export const calculTotalPoultries = (
  poultries: PoultryInterface[] | undefined,
) => {
  let total = 0;
  poultries?.map((poultry) => {
    total += poultry.quantity!;
  });

  return total;
};

export const formatDate = (date: Date) => {
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const numStr = (a: string, b: string) => {
  a = "" + a;
  b = b || " ";
  var c = "",
    d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length - 1; i >= 0; i--) {
    c = d != 0 && d % 3 == 0 ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
};

export const retreiveGroup = (
  incomesOrExpensesOrAlerts:
    | IncomeInterface[]
    | ExpenseInterface[]
    | AlertInterface[],
  poultries: PoultryInterface[],
) => {
  const groupName: GroupNameProps[] = [];
  poultries.map((poultry) => {
    incomesOrExpensesOrAlerts.map((incomesOrExpensesOrAlert) => {
      if (incomesOrExpensesOrAlert.idPoultry == poultry.id) {
        const props = {
          id: incomesOrExpensesOrAlert.id!,
          groupName: poultry.groupName!,
        };
        groupName.push(props);
      }
    });
  });

  return groupName;
};

export const deprecatedAlert = (alerts: AlertInterface[]) => {
  let idAlerts: string[] = [];

  alerts.map((alert) => {
    const currentDate = new Date();
    if (new Date(alert.date) < currentDate) {
      idAlerts.push(alert.id!);
    }
  });

  return idAlerts;
};

export const removeIndexAlertArray = (
  alerts: AlertInterface[],
  idAlert: string,
) => {
  alerts.splice(
    alerts.findIndex((alert) => alert.id === idAlert),
    1,
  );
};
