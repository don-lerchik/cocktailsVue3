<template>
  <v-card
    class="mx-auto"
    max-width="344"
    variant="outlined"
  >
    <v-img
      :src="cocktail.imageURL"
      height="200px"
      cover
    ></v-img>
    <v-card-text>
      <v-card-subtitle>
        {{ cocktail.category }} | Served In
        {{ cocktail.glass }}
      </v-card-subtitle>
      <v-card-title>{{ cocktail.name }}</v-card-title>
    </v-card-text>
    <v-card-item>
      <div>
        <p>{{ cocktail.instructions }}</p>

        <v-list density="compact">
          <v-list-subheader>Ingredients</v-list-subheader>

          <v-list-item
            v-for="(item, key) in cocktail.ingredients" :key="key"
            :title="item"
            color="primary"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {ICocktail} from "@/interfaces";

defineProps({
  cocktail: {
    type: Object as PropType<ICocktail>,
    required: true
  }
});
</script>
