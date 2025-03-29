<script setup>
import MainLayout from "../layouts/MainLayout.vue";

import {storeToRefs} from "pinia";
import {ref} from "vue";
import {useAssignmentStore} from "../stores/assignment.js";

//----------------------------

const newAssignmentData = ref({
  friend: '',
  gift: ''
})

const assignmentStore = useAssignmentStore()
const {
  assignmentList,
  availableFriends,
  availableGifts
} = storeToRefs(assignmentStore)

function onAddItem() {
  const assignmentData = {
    friend: newAssignmentData.value.friend,
    gift: newAssignmentData.value.gift
  }
  if (assignmentData.friend != '' && newAssignmentData.gift != '') {
    assignmentStore.addAssignment(assignmentData)
    newAssignmentData.value = {
      friend: '',
      gift: ''
    }
  } else false
}

</script>

<template>
  <main-layout>
    <h1>Розподіл подарунків</h1>
    <ol>
      <li v-for="assignment in assignmentList"
          :key="assignment.id">
        <span>{{ assignment.friend }}</span> -
        <span>{{ assignment.gift }}</span>
      </li>
    </ol>
    <label for='selectedFriend'>Друг</label>
    <select id='selectedFriend'
            v-model="newAssignmentData.friend">
      <option value="">Обрати друга</option>
      <option v-for="friend in availableFriends"
              :key='friend.id'>{{ friend.name }}
      </option>
    </select>
    <label for='selectedGift'>Подарунок</label>
    <select id='selectedGift'
            v-model="newAssignmentData.gift">
      <option value="">Обрати подарунок</option>
      <option v-for="gift in availableGifts" :key='gift.id'>
        {{ gift.name }}
      </option>
    </select>
    <button @click='onAddItem'>Додати</button>
  </main-layout>
</template>

<style scoped>

</style>