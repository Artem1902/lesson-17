<script setup>
import MainLayout from "../layouts/MainLayout.vue";

import {useFriendsStore} from "../stores/friends.js";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import {useAssignmentStore} from "../stores/assignment.js";

//----------------------------

const newFriendData = ref('')

const friendsStore = useFriendsStore()
const {getItemsList} = storeToRefs(friendsStore)

const assignmentStore = useAssignmentStore()
const {getItemsList: assignmentList} = storeToRefs(assignmentStore)

function loadItems() {
  friendsStore.loadItemsList()
}

function onDelete(itemId, itemName) {
  friendsStore.deleteItem(itemId)

  const assignmentIdToDelete = assignmentList.value.find(a => a.friend === itemName)?.id;
  if (assignmentIdToDelete) {
    assignmentStore.deleteItem(assignmentIdToDelete)
  }
}

async function onAddItem() {
  const newFriend = {
    name: newFriendData.value
  }
  await friendsStore.addItem(newFriend)
  loadItems()
  newFriendData.value = ''
}

const showFriends = computed(() => getItemsList.value.length > 0)

onMounted(() => {
  loadItems()
})

</script>

<template>
  <main-layout>
    <div v-if="showFriends">
      <h1>Список друзів</h1>

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
      <h1>Список друзів порожній ...</h1>
    </div>
    <v-row class="align-center justify-center ma-2">
      <v-col cols="auto">
        <label class="text-h6 text-primary font-weight-bold ma-2">
          Новий друг
        </label>
      </v-col>

      <v-col cols="auto">
        <v-text-field
            label="Баба Галя"
            type="input"
            variant="underlined"
            style="width: 350px"
            v-model="newFriendData"
        ></v-text-field>
      </v-col>

      <v-col cols="auto">
        <v-btn color="secondary" rounded="xl" @click="onAddItem">Додати</v-btn>
      </v-col>
    </v-row>

  </main-layout>
</template>

<style scoped>

</style>