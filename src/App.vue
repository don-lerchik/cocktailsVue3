<template>
  <v-app>
    <v-app-bar
      color="green"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
        <v-list-item v-for="(item, index) in menuItems"
                     :key="index"
                     :title="item.title"
                     :to="item.link">
        </v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";

  const drawer = ref(false)

  const menuItems = reactive([
    {title: 'Margarita', link: '/cocktail/margarita'},
    {title: 'Mojito', link: '/cocktail/mojito'},
    {title: 'A1', link: '/cocktail/a1'},
    {title: 'Kir', link: '/cocktail/kir'}
  ])
</script>
