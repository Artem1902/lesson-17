<script setup>
import {reactive} from "vue";

const links = reactive([
  {
    name: 'home',
    title: 'Головна'
  },
  {
    name: 'friends',
    title: 'Друзі'
  },
  {
    name: 'gifts',
    title: 'Подарунки'
  },
  {
    name: 'assignment',
    title: 'Призначення подарунків'
  }
])
</script>

<template>
  <div>
    <nav>
      <router-link v-for="link in links"
                   :key='link.name'
                   :to="{ name: link.name }">
        {{ link.title }} |
      </router-link>
    </nav>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>