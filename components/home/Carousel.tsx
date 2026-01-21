import {
  retrieveExpense,
  retrieveIncome,
  retrievePoultry,
} from "@/constants/controller";
import {
  ExpenseInterface,
  IncomeInterface,
  PoultryInterface,
} from "@/constants/interface";
import { appSettings } from "@/constants/settings";
import { useChangedStore } from "@/constants/store";
import { calculTotal, calculTotalPoultries, numStr } from "@/constants/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Carousel() {
  const animation = useRef(new Animated.Value(0));
  const [currentAnimation, setCurrentAnimation] = useState<number>(0);
  const [totalAmountExpenses, setTotalAmountExpenses] = useState<number>(0);
  const [totalAmountIncome, setTotalAmountIncome] = useState<number>(0);
  const [datas, setDatas] = useState<PoultryInterface[] | null>();
  const [totalPoultry, setTotalPoultry] = useState<Number | undefined>();

  const changed = useChangedStore((state) => state.changed);

  const handleCarouselforward = () => {
    let newCurrentAnimation =
      currentAnimation + 1 > 1 ? 1 : currentAnimation + 1;

    Animated.spring(animation.current, {
      toValue: -((Dimensions.get("screen").width - 10) / 2),
      useNativeDriver: true,
    }).start();

    setCurrentAnimation(newCurrentAnimation);
  };

  const handleCarouselBack = () => {
    let newCurrentAnimation =
      currentAnimation - 1 < 0 ? 0 : currentAnimation - 1;

    Animated.spring(animation.current, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    setCurrentAnimation(newCurrentAnimation);
  };

  useEffect(() => {
    (async () => {
      const poultry = await retrievePoultry();
      setDatas(poultry);

      const dataExpenses: ExpenseInterface[] | undefined =
        await retrieveExpense();
      let totalAmountExpenses = calculTotal(dataExpenses);
      setTotalAmountExpenses(totalAmountExpenses);

      const dataIncome: IncomeInterface[] | undefined = await retrieveIncome();
      let totalAmountIncome = calculTotal(dataExpenses);
      setTotalAmountExpenses(totalAmountIncome);

      const totalPoultryTmp = calculTotalPoultries(poultry!);
      setTotalPoultry(totalPoultryTmp);
    })();
  }, [changed]);

  return (
    <View>
      <View style={styles.farmSurveyContainer}>
        <Text style={styles.farmSurvey}>Farm survey</Text>
      </View>
      <View style={styles.carouselArrowContainer}>
        <TouchableOpacity
          style={[
            styles.arrow,
            currentAnimation > 0 ? styles.arrowBack : styles.arrowBackHidden,
          ]}
          onPress={handleCarouselBack}
        >
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.carouselContainer,
            {
              transform: [{ translateX: animation.current }],
            },
          ]}
        >
          <TouchableOpacity>
            <View style={styles.carouselItem}>
              <Image
                source={require("@/assets/images/poor.png")}
                style={styles.icon}
              ></Image>
              <Text
                style={[styles.textAbove, { color: appSettings.color.red }]}
              >
                {numStr(totalAmountExpenses.toString(), ".")}&nbsp;Ariary
              </Text>
              <Text style={styles.textBelow}>Total expenses</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.carouselItem}>
              <Image
                source={require("@/assets/images/cash.png")}
                style={styles.icon}
              ></Image>
              <Text
                style={[styles.textAbove, { color: appSettings.color.blue }]}
              >
                {numStr(totalAmountIncome.toString(), ".")}&nbsp;Ariary
              </Text>
              <Text style={styles.textBelow}>Total Income</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.carouselItem}>
              <Image
                source={require("@/assets/images/chicken.png")}
                style={styles.icon}
              ></Image>
              <Text style={styles.textAbove}>{String(totalPoultry)}</Text>
              <Text style={styles.textBelow}>Total Poultry</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={[styles.arrow, styles.arrowForward]}
          onPress={handleCarouselforward}
        >
          <Ionicons name="chevron-forward-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  farmSurveyContainer: {
    paddingTop: appSettings.sectionContainer.paddingTop,
  },
  farmSurvey: {
    fontSize: appSettings.title.meddium,
    color: appSettings.color.mediumGrey,
    fontWeight: 600,
  },
  carouselArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  carouselItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    width: (Dimensions.get("screen").width - 30) / 2,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10,
  },
  textAbove: {
    fontWeight: 600,
  },
  textBelow: {
    color: appSettings.color.mediumGrey,
  },
  arrow: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  arrowBack: {
    left: 0,
  },
  arrowBackHidden: {
    display: "none",
  },
  arrowForward: {
    right: 0,
  },
});
