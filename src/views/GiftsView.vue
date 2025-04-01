<script setup>
import MainLayout from "../layouts/MainLayout.vue";

import {useGiftsStore} from "../stores/gifts.js";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import {useAssignmentStore} from "../stores/assignment.js";

//----------------------------

const newGiftData = ref('')

const giftsStore = useGiftsStore()
const {getItemsList} = storeToRefs(giftsStore)

const assignmentStore = useAssignmentStore()
const {getItemsList: assignmentList} = storeToRefs(assignmentStore)

function loadItems() {
  giftsStore.loadItemsList()
}

function onDelete(itemId, itemName) {
  giftsStore.deleteItem(itemId)

  const assignmentIdToDelete = assignmentList.value.find(a => a.gift === itemName)?.id;
  if (assignmentIdToDelete) {
    assignmentStore.deleteItem(assignmentIdToDelete)
  }
}

async function onAddItem() {
  const newGift = {
    name: newGiftData.value
  }
  await giftsStore.addItem(newGift)
  loadItems()
  newGiftData.value = ''
}

const showGifts = computed(() => getItemsList.value.length > 0)

onMounted(() => {
  loadItems()
})

</script>

<template>
  <main-layout>
    <div v-if="showGifts">
      <h1>Список подарунків</h1>
      <v-card>
        <v-list v-for="item in getItemsList" :key="item.id">
          <v-list-item :title="item.name"
                       class="border ma-2 pa-3 rounded text-h6 text-primary font-weight-bold">
            <template v-slot:append>
              <v-btn @click='onDelete(item.id, item.name)'
                     rounded="xl" color='error'>
                Видалити
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card>

    </div>
    <div v-else>
      <h1>Список подарунків порожній ...</h1>
    </div>
    <v-row class="align-center justify-center ma-2">
      <v-col cols="auto">
        <label
            class="text-h6 text-primary font-weight-bold ma-2">
          Новий подарунок
        </label>
      </v-col>

      <v-col cols="auto">
        <v-text-field
            label="Назва подарунку"
            type="input"
            variant="underlined"
            style="width: 350px"
            v-model="newGiftData"
        ></v-text-field>
      </v-col>

      <v-col cols="auto">
        <v-btn color="secondary" rounded="xl"
               @click="onAddItem">Додати
        </v-btn>
      </v-col>
    </v-row>
  </main-layout>
</template>

<style scoped>

</style>