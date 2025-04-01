<script setup>
import MainLayout from "../layouts/MainLayout.vue";

import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import {useAssignmentStore} from "../stores/assignment.js";
import {useFriendsStore} from "../stores/friends.js";
import {useGiftsStore} from "../stores/gifts.js";

//----------------------------

const newAssignmentData = ref({
  friend: '',
  gift: ''
})

const assignmentStore = useAssignmentStore()
const {getItemsList: assignmentList} = storeToRefs(assignmentStore)

function loadItems() {
  assignmentStore.loadItemsList()
}

async function onAddItem() {
  const assignmentData = {
    friend: newAssignmentData.value.friend,
    gift: newAssignmentData.value.gift
  }
  if (newAssignmentData.value.friend !== '' && newAssignmentData.value.gift !== '') {
    await assignmentStore.addItem(assignmentData)
    loadItems()
    newAssignmentData.value = {
      friend: '',
      gift: ''
    }
  } else false
}

const friendsStore = useFriendsStore();
const giftsStore = useGiftsStore();


const availableFriends = computed(() => {
  const allFriends = friendsStore.getItemsList;

  return allFriends.filter(friend =>
      !assignmentList.value.some(assign => assign.friend == friend.name)
  );
});

const availableGifts = computed(() => {
  const allGifts = giftsStore.getItemsList;

  return allGifts.filter(gift =>
      !assignmentList.value.some(assign => assign.gift == gift.name)
  );
});
onMounted(() => {
  friendsStore.loadItemsList()
  giftsStore.loadItemsList()
  loadItems()
})
</script>

<template>
  <main-layout>
    <h1>Розподіл подарунків</h1>
    <v-card>
      <v-list v-for="item in assignmentList" :key="item.id">
        <v-list-item
            class="border ma-2 pa-3 rounded text-h6 text-primary font-weight-bold">
          <span>{{ item.friend }}</span> -
          <span>{{ item.gift }}</span>
        </v-list-item>
      </v-list>
    </v-card>
    <v-row class="align-center justify-center ma-2">
      <v-col cols="auto">
        <label
            class="text-h6 text-primary font-weight-bold ma-2">
          Обрати друга
        </label>
      </v-col>
      <v-col cols="auto">
        <v-select
            v-model="newAssignmentData.friend"
            label="Друг"
            :items="availableFriends"
            item-title="name"
            item-value="name"
            variant="underlined"
            width="150px"
        ></v-select>
      </v-col>

      <v-col cols="auto">
        <label
            class="text-h6 text-primary font-weight-bold ma-2">
          Обрати подарунок
        </label>
      </v-col>

      <v-col cols="auto">
        <v-select
            v-model="newAssignmentData.gift"
            label="Подарунок"
            :items="availableGifts"
            item-title="name"
            item-value="name"
            variant="underlined"
            width="150px"
        ></v-select>

      </v-col>

      <v-col cols="auto">
        <v-btn color="secondary" rounded="xl"
               @click="onAddItem">Додати
        </v-btn>
      </v-col>
    </v-row>
    <!--    <label for='selectedFriend'>Друг</label>-->
    <!--    <select id='selectedFriend'-->
    <!--            v-model="newAssignmentData.friend">-->
    <!--      <option value="">Обрати друга</option>-->
    <!--      <option v-for="friend in availableFriends"-->
    <!--              :key='friend.id'>{{ friend.name }}-->
    <!--      </option>-->
    <!--    </select>-->
    <!--    <label for='selectedGift'>Подарунок</label>-->
    <!--    <select id='selectedGift'-->
    <!--            v-model="newAssignmentData.gift">-->
    <!--      <option value="">Обрати подарунок</option>-->
    <!--      <option v-for="gift in availableGifts" :key='gift.id'>-->
    <!--        {{ gift.name }}-->
    <!--      </option>-->
    <!--    </select>-->
    <!--    <button @click='onAddItem'>Додати</button>-->
  </main-layout>
</template>

<style scoped>

</style>