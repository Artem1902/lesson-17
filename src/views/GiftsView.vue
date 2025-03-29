<script setup>
import MainLayout from "../layouts/MainLayout.vue";

import {useGiftsStore} from "../stores/gifts.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useAssignmentStore} from "../stores/assignment.js";

//----------------------------

const newGiftData = ref('')

const giftsStore = useGiftsStore()
const {getItems} = storeToRefs(giftsStore)

const assignmentStore = useAssignmentStore()
const {assignmentList} = storeToRefs(assignmentStore)

function onDelete(itemId, itemName) {
  giftsStore.deleteItem(itemId)

  const assignmentIdToDelete = assignmentList.value.find(a => a.gift === itemName)?.id;
  if (assignmentIdToDelete) {
    assignmentStore.deleteAssignment(assignmentIdToDelete)
  }
}

function onAddItem() {
  const giftData = {
    name: newGiftData.value
  }
  giftsStore.addItem(giftData)
  newGiftData.value = ''
}

const showGifts = computed(() => getItems.value.length > 0)


</script>

<template>
  <main-layout>
    <div v-if="showGifts">
    <h1>Список подарунків</h1>
    <ol>
      <li v-for="item in getItems" :key="item.id">
        <span>{{ item.name }}</span>
        <button @click='onDelete(item.id, item.name)'>
          Видалити
        </button>
      </li>
    </ol>
    </div>
    <div v-else>
      <h1>Список подарунків порожній ...</h1>
    </div>
    <label>
      Новий подарунок
      <input type="text" v-model=newGiftData>
    </label>
    <button @click='onAddItem'>Додати</button>
  </main-layout>
</template>

<style scoped>

</style>