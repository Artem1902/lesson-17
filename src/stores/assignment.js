import {defineStore} from 'pinia'
import getStoreTemplate from './helpers/storeTemplate'
import {useGeneralStore} from './general'

export const useAssignmentStore = defineStore('assignment', () => {
    const generalStore = useGeneralStore()
    const {generalApiOperation} = generalStore

    return getStoreTemplate('assignment', generalApiOperation)
})
