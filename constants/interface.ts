export interface PoultryInterface {
    id: string,
    groupName: string,
    quantity: number | null,
    age: number | null,
    createdDate: Date | null
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