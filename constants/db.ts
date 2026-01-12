import * as SQlite from "expo-sqlite";
import uuid from "uuid-random";
import { EggInterface, ExpenseInterface, IncomeInterface, PoultryInterface } from "./interface";

const db = SQlite.openDatabaseAsync("poultryManager", {
  useNewConnection: true,
});

const createTable = async () => {
  try {
    await (
      await db
    ).execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS Poultry (
            id TEXT PRIMARY KEY,
            quantity INTEGER NOT NULL,
            groupName TEXT NOT NULL,
            createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            age TEXT NOT NULL);

            CREATE TABLE IF NOT EXISTS Egg (
            id TEXT PRIMARY KEY,
            quantity INTEGER NOT NULL,
            hatchingDate  DATETIME DEFAULT CURRENT_TIMESTAMP,
            idPoultry TEXT,
            FOREIGN KEY(idPoultry) REFERENCES Poultry(id));

            CREATE TABLE IF NOT EXISTS Expense (
            id TEXT PRIMARY KEY,
            label TEXT NOT NULL,
            price REAL,
            idPoultry TEXT,
            createdDate  DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(idPoultry) REFERENCES Poultry(id));

            CREATE TABLE IF NOT EXISTS Income (
            id TEXT PRIMARY KEY,
            label TEXT NOT NULL,
            quantity REAL NOT NULL,
            price REAL,
            idPoultry TEXT,
            createdDate  DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(idPoultry) REFERENCES Poultry(id));

            CREATE TABLE IF NOT EXISTS Alert (
            id TEXT PRIMARY KEY,
            label TEXT NOT NULL,
            Date DATETIME DEFAULT CURRENT_TIMESTAMP);
            `);

    console.log("Database initialized");
  } catch (error) {
    console.log("Error while initializing the database", error);
  }
};

export const initDatabase = async () => {
  await createTable();
  // await deleteTable();
};

export const deleteTable = async () => {
  try {
    await (
      await db
    ).execAsync(`
      DROP TABLE IF EXISTS Poultry;
      DROP TABLE IF EXISTS Egg;
      DROP TABLE IF EXISTS Expense;
      DROP TABLE IF EXISTS Income;
      DROP TABLE IF EXISTS Alert;
    `);

    console.log("Table deleted!");

    return true;
  } catch (error) {
    console.log("Error while drop the database", error);
  }
};

export const closeAsync = async () => {
  await (await db).closeAsync();
};

export const insertEgg = async (
  data: EggInterface
): Promise<boolean> => {
  const id = uuid();
  let result = false;

  try {
    const createEgg = await (
      await db
    ).runAsync(
      "INSERT INTO Egg (id, quantity, idPoultry) VALUES (?, ?, ?, ?)",
      id,
      data.quantity,
      data.idPoultry
    );

    if (createEgg.changes) {
      result = true;
    }
  } catch (error) {
    console.log("Create egg error:", error);
    result = false;
  }

  return result;
};

export const insertPoultry = async (
  data: PoultryInterface
): Promise<boolean> => {
  const id = uuid();
  let result = false;

  try {
    const createPoultry = await (
      await db
    ).runAsync(
      "INSERT INTO Poultry (id, quantity, groupName, age) VALUES (?, ?, ?, ?)",
      id,
      data.quantity,
      data.groupName,
      data.age
    );

    if (createPoultry.changes) {
      result = true;
    }
  } catch (error) {
    console.log("Create poultry error:", error);
    result = false;
  }

  return result;
};

export const getPoultry = async () => {
  try {
    const result = await (
      await db
    ).getAllAsync(
      `
      SELECT * FROM Poultry
      `
    );

    return result as PoultryInterface[];
  } catch (error) {
    console.log("GetPoultry error:", error);
    
    return null;
  }
};


export const deletePoultry = async (id: string): Promise<boolean> => {
  try {
    const result = await (
      await db
    ).runAsync(`
      DELETE FROM Poultry WHERE id='${id}'
    `);

    return true;
    

  } catch (error) {
    return false;
  }
};

export const updatePoultry = async (data: PoultryInterface): Promise<boolean> => {
  let response = false; 
  try {
    const result = await (await db).runAsync(
      "UPDATE Poultry SET quantity= ? , groupName= ? , age= ? WHERE id= ? ",
      data.quantity,
      data.groupName,
      data.age,
      data.id
    );

    if (result.changes) {
      response =  true;
    }
    
    return response;
    
  } catch (error) {
    console.log("Update Poultry error: ", error);
    return false
  }
}

export const insertExpense = async (data: ExpenseInterface) => {
  const id = uuid();
  let response = false;
  try {
    const result = await (await db).runAsync(
      "INSERT INTO Expense (id, idPoultry, label, price) VALUES (?, ?, ?, ?)",
      id,
      data.idPoultry,
      data.label,
      data.price
    );

    if (result.changes) {
      response = true;
    }

    return response;

  } catch (error) {
    console.log("Expense insertion error: ", error);
    return false;    
  }
}


export const getExpense = async (): Promise<ExpenseInterface[] | undefined> => {
  try {
    const result = await (
      await db
    ).getAllAsync(
      `
      SELECT * FROM Expense
      `
    );

    return result as ExpenseInterface[];
  } catch (error) {
    console.log("GetPoultry error:", error);
    return undefined;
  }
};

export const deleteExpense = async(id: string): Promise<boolean> => {
  try {
    const result = await (
      await db
    ).runAsync(`
      DELETE FROM Expense WHERE id='${id}'
    `);

    return true;
  } catch (error) {
    return false;
  }
}

export const updateExpenses = async (data: ExpenseInterface): Promise<boolean> => {
  let response = false; 
  try {
    const result = await (await db).runAsync(
      "UPDATE Expense SET label= ? , price= ? , idPoultry= ? WHERE id= ? ",
      data.label,
      data.price,
      data.idPoultry,
      data.id
    );

    if (result.changes) {
      response =  true;
    }
    
    return response;
    
  } catch (error) {
    console.log("Update Poultry error: ", error);
    return false
  }
}

export const insertIncome = async (data: IncomeInterface) => {
  const id = uuid();
  let response = false;
  try {
    const result = await (await db).runAsync(
      "INSERT INTO Income (id, idPoultry, label, price, quantity) VALUES (?, ?, ?, ?, ?)",
      id,
      data.idPoultry,
      data.label,
      data.price,
      data.quantity
    );

    if (result.changes) {
      response = true;
    }

    return response;

  } catch (error) {
    console.log("Expense insertion error: ", error);
    return false;    
  }
}


export const getIncome = async (): Promise<IncomeInterface[] | undefined> => {
  try {
    const result = await (
      await db
    ).getAllAsync(
      `
      SELECT * FROM Income
      `
    );

    return result as IncomeInterface[];
  } catch (error) {
    console.log("GetPoultry error:", error);
    return undefined;
  }
};


export const updateIncome = async (data: IncomeInterface): Promise<boolean> => {
  let response = false; 
  try {
    const result = await (await db).runAsync(
      "UPDATE Income SET label= ? , price= ? , idPoultry= ?, quantity= ? WHERE id= ? ",
      data.label,
      data.price,
      data.idPoultry,
      data.quantity,
      data.id
    );

    if (result.changes) {
      response =  true;
    }
    
    return response;
    
  } catch (error) {
    console.log("Update Poultry error: ", error);
    return false
  }
}


export const deleteIncome = async(id: string): Promise<boolean> => {
  try {
    const result = await (
      await db
    ).runAsync(`
      DELETE FROM Income WHERE id='${id}'
    `);

    return true;
  } catch (error) {
    return false;
  }
}
