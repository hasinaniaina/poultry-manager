import * as SQlite from "expo-sqlite";
import uuid from "uuid-random";
import { PoultryInterface } from "./interface";

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
    console.log("Poultry error:", error);
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
