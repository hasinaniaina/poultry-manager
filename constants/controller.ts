import { deleteExpense, deletePoultry, getExpense, getPoultry, insertExpense, insertPoultry, updateExpenses, updatePoultry } from "./db";
import { ExpenseInterface, PoultryInterface } from "./interface";

export const createPoultry = async (data: PoultryInterface): Promise<boolean> => {
    const result = await insertPoultry(data);
    return result;
}

export const retrievePoultry = async() => {
    const result: PoultryInterface[] | null = await getPoultry();    
    return  result;
}

export const removePoultry = async(id: string): Promise<boolean> => {
    const result: boolean = await deletePoultry(id);
    return result;
}

export const editPoultry = async(data: PoultryInterface): Promise<boolean> => {
    const result: boolean = await updatePoultry(data);

    return result;
}

export const createExpense = async(data: ExpenseInterface): Promise<boolean> => {
    const result: boolean = await insertExpense(data);
    return result;
}

export const retrieveExpense = async(): Promise<ExpenseInterface[] | undefined> => {
    const result =  await getExpense();
    return result;
} 

export const removeExpense = async(id: string): Promise<boolean> => {
    const result: boolean = await deleteExpense(id);
    return result;
}

export const editExpense = async(data: ExpenseInterface): Promise<boolean> => {
    const result: boolean = await updateExpenses(data);
    return result;
}