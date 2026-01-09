import { deletePoultry, getPoultry, insertPoultry, updatePoultry } from "./db";
import { PoultryInterface } from "./interface";

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