import { create } from "zustand";

type ChangeProp = {
    changed: boolean;
    setChangedTrue: () => void;
    setChangedFalse: () => void;
} 

type BottomSheetProp = {
    bottomSheetStatus: boolean;
    setBottomSheetStatus: (bottomSheetStatus: boolean) => void;
    routeName: string;
    setRouteName: (routeName: string) => void;
    addOrUpdate: string;
    setEditOrUpdate: (editOrUpdate: string) => void;
    dataToUpdate: any,
    setDataToUpdate: (dataToUpdate: any ) => void; 
}


export const useChangedStore = create<ChangeProp>((set) =>({
    changed: false,
    setChangedTrue:() => set(() => ({changed: true})),
    setChangedFalse:() => set(() => ({changed: false}))
}));

export const useBottomSheetStore = create<BottomSheetProp>((set) => ({
    bottomSheetStatus: false,
    setBottomSheetStatus: (bottomSheetStatus) => set(() => ({bottomSheetStatus: bottomSheetStatus})),
    routeName: "",
    setRouteName: (routeName) => set(() => ({routeName: routeName})),
    addOrUpdate: "add",
    setEditOrUpdate: (addOrUpdate) => set(() => ({addOrUpdate: addOrUpdate})),
    dataToUpdate: undefined,
    setDataToUpdate: (dataToUpdate) => set(() => ({dataToUpdate: dataToUpdate}))
}));


