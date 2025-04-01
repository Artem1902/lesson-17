import {defineStore} from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import {useGeneralStore} from './general'

export const useFriendsStore = defineStore('friends', () => {
    const generalStore = useGeneralStore()
    const {generalApiOperation} = generalStore

    return getStoreTemplate('friends', generalApiOperation)
})
