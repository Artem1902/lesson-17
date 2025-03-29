import {computed, ref} from "vue";

export const useBaseItems = () => {
    //-----------STATE
    const items = ref([])

    //-----------GETTERS
    const getItems = computed(() => items.value);
    const getItemById = itemId => items.value.find(i => i.id == itemId)

    //------------ACTIONS
    function addItem(newItemData) {
        return items.value.push({
            id: new Date().getTime(),
            ...newItemData
        })
    }

    function deleteItem(itemId) {
        return items.value = items.value.filter(i => i.id !== itemId)
    }

    return {
        items,
        getItems,
        getItemById,
        addItem,
        deleteItem
    }
}