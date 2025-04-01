import {defineStore} from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import {useGeneralStore} from './general'

export const useGiftsStore = defineStore('gifts', () => {
    const generalStore = useGeneralStore()
    const {generalApiOperation} = generalStore

    return getStoreTemplate('gifts', generalApiOperation)
})
