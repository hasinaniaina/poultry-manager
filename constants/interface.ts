export interface PoultryInterface {
    id: string,
    groupName: string,
    quantity: number | null,
    age: number | null,
    createdDate: Date | null
} 
export interface EggInterface {
  id: string,
  quantity: number,
  idPoultry: string | null
}

export interface ExpenseInterface {
  id: string,
  label: string,
  price: number | null,
  idPoultry: string,
  createdDate?: string
}

export interface IncomeInterface {
  id: string,
  label: string,
  price: number | null,
  quantity: number | null,
  idPoultry: string,
  createdDate?: string
}

export interface AlertInterface {
  id: string,
  label: string,
  idPoultry: string,
  date: string
}

export interface BottomSheetContextType {
  bottomSheetStatus: boolean;
  setBottomSheetStatus: React.Dispatch<React.SetStateAction<boolean>>;
  routeName: string;
}

export interface ChangedViewContextType {
    changed: boolean;
    setChanged: React.Dispatch<React.SetStateAction<boolean>>;
}