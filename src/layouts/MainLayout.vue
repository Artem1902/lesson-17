<script setup>
import {reactive} from "vue";
import LoadingPage from "../components/LoadingPage.vue";
import ErrorPage from "../components/ErrorPage.vue";
import {useGeneralStore} from "../stores/general.js";
import {storeToRefs} from "pinia";

const generalStore = useGeneralStore()
const {isLoading, hasError} = storeToRefs(generalStore)

const links = reactive([
  {name: "home", title: "Головна"},
  {name: "friends", title: "Друзі"},
  {name: "gifts", title: "Подарунки"},
  {name: "assignment", title: "Призначення подарунків"}
]);
</script>

<template>
  <v-layout class="rounded rounded-md border"
            style="flex-direction: column; width: 100%;">
    <v-app-bar color="primary" app>
      <v-app-bar-title
          class="headline text-yellow-darken-1">
        Резиденція Миколая
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn v-for="link in links" :key="link.name"
             :to="{ name: link.name }" variant="text"
             class="mx-2">
        {{ link.title }}
      </v-btn>


      <template v-slot:append>
        <v-btn>
          <font-awesome-icon
              :icon="['fas', 'right-from-bracket']"/>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-sheet height="100%" rounded="lg" width="100%">
          <loading-page v-if="isLoading" />
          <error-page v-else-if="hasError" />
          <template v-else>
            <slot></slot>
          </template>
        </v-sheet>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
