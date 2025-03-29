<script setup>
import MainLayout from "../layouts/MainLayout.vue";

import {useFriendsStore} from "../stores/friends.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useAssignmentStore} from "../stores/assignment.js";

//----------------------------

const newFriendData = ref('')

const friendsStore = useFriendsStore()
const {getItems} = storeToRefs(friendsStore)

const assignmentStore = useAssignmentStore()
const {assignmentList} = storeToRefs(assignmentStore)

function onDelete(itemId, itemName) {
  friendsStore.deleteItem(itemId)

  const assignmentIdToDelete = assignmentList.value.find(a => a.friend === itemName)?.id;
  if (assignmentIdToDelete) {
    assignmentStore.deleteAssignment(assignmentIdToDelete)
  }
}

function onAddItem() {
  const friendData = {
    name: newFriendData.value
  }
  friendsStore.addItem(friendData)
  newFriendData.value = ''
}

const showFriends = computed(() => getItems.value.length > 0)

</script>

<template>
  <main-layout>
    <div v-if="showFriends">
      <h1>Список друзів</h1>
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
      <h1>Список друзів порожній ...</h1>
    </div>
    <label>
      Новий друг
      <input type="text" v-model=newFriendData>
    </label>
    <button @click='onAddItem'>Додати</button>
  </main-layout>
</template>

<style scoped>

</style>