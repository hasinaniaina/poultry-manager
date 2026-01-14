import {
  deleteAlert,
  deleteExpense,
  deleteIncome,
  deletePoultry,
  getAlert,
  getExpense,
  getIncome,
  getPoultry,
  insertAlert,
  insertExpense,
  insertIncome,
  insertPoultry,
  updateExpenses,
  updateIncome,
  updatePoultry,
} from "./db";
import {
  AlertInterface,
  ExpenseInterface,
  IncomeInterface,
  PoultryInterface,
} from "./interface";

export const createPoultry = async (
  data: PoultryInterface
): Promise<boolean> => {
  const result = await insertPoultry(data);
  return result;
};

export const retrievePoultry = async () => {
  const result: PoultryInterface[] | null = await getPoultry();
  return result;
};

export const removePoultry = async (id: string): Promise<boolean> => {
  const result: boolean = await deletePoultry(id);
  return result;
};

export const editPoultry = async (data: PoultryInterface): Promise<boolean> => {
  const result: boolean = await updatePoultry(data);

  return result;
};

export const createExpense = async (
  data: ExpenseInterface
): Promise<boolean> => {
  const result: boolean = await insertExpense(data);
  return result;
};

export const retrieveExpense = async (): Promise<
  ExpenseInterface[] | undefined
> => {
  const result = await getExpense();
  return result;
};

export const removeExpense = async (id: string): Promise<boolean> => {
  const result: boolean = await deleteExpense(id);
  return result;
};

export const editExpense = async (data: ExpenseInterface): Promise<boolean> => {
  const result: boolean = await updateExpenses(data);
  return result;
};

export const createIncome = async (data: IncomeInterface): Promise<boolean> => {
  const quantityResult = await editQuantity(data);

  if (!quantityResult) {
    return false;
  }

  const result: boolean = await insertIncome(data);
  return result;
};

const editQuantity = async (data: IncomeInterface) => {
  const poultryId = data.idPoultry;
  const quantity = data.quantity;

  const poultries: PoultryInterface[] | null = await retrievePoultry();
  let poultryFind: PoultryInterface | undefined = undefined;

  poultries?.map((poultry) => {
    if (poultryId == poultry.id) {
      const poultryFindTmp = { ...poultry };
      poultryFind = poultryFindTmp;
      return;
    }
  });

  if (quantity! < poultryFind!.quantity!) {
    const newQuantity = poultryFind!.quantity! - quantity!;
    const data: PoultryInterface = { ...poultryFind! };
    data.quantity = newQuantity;
    const result = await updatePoultry(data);
    if (result) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const retrieveIncome = async (): Promise<
  IncomeInterface[] | undefined
> => {
  const result = await getIncome();
  return result;
};

export const editIncome = async (data: IncomeInterface): Promise<boolean> => {
  // const quantityResult = await editQuantity(data);

  // if (!quantityResult) {
  //   return false;
  // }
  
  const result: boolean = await updateIncome(data);
  return result;
};

export const removeIncome = async (id: string): Promise<boolean> => {
  const result: boolean = await deleteIncome(id);
  return result;
};

export const createAlert = async (
  data: AlertInterface
): Promise<boolean> => {  
  const result: boolean = await insertAlert(data);
  return result;
};

export const retrieveAlert = async (): Promise<
  AlertInterface[] | undefined
> => {
  const result = await getAlert();
  
  return result;
};

export const removeAlert = async (id: string): Promise<boolean> => {
  const result: boolean = await deleteAlert(id);
  return result;
};
