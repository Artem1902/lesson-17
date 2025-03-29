import {defineStore} from "pinia";
import {useBaseItems} from "./baseItems.js";

export const useGiftsStore = defineStore('gifts', () => {
    return {
        ...useBaseItems()
    }
})