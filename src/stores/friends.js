import {defineStore} from "pinia";
import {useBaseItems} from "./baseItems.js";

export const useFriendsStore = defineStore('friends', () => {
    return {
        ...useBaseItems()
    }
})