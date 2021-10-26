import { defineStore } from "pinia";
import { store } from "@/store";

interface Children {
    name: string,
    priority: Number,
    children?: Array<BackInter>
}
interface BackInter {
    type: Number,
    index: String,
    level: Number,
    children?: Array<Children>;
}
interface State {
    list: any[],
    arrJson: any[],
    liobjst: any
}
export const useProcessStore = defineStore({
    id: 'useProcessStore',
    state: (): State => ({
        list: [1,2,3],
        liobjst: {
            a: 12
        },
        arrJson: [{
            type: 1,
            index: '0',
            level: 0,
        }]
    }),
    getters: {
        
        
    },
    actions: {
        setList(arr: Array<any>){
            this.list = arr;
        },
        setArrJson(arr: Array<any>){
            this.arrJson = arr;
        }
    }
})

export function useProcessStoreHook() {
    return useProcessStore(store);
  }