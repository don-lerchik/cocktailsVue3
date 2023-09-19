<template>
  <div>
    <v-container fluid>
      <v-responsive class="align-center text-center">
        <v-row v-if="state.loading"  class="d-flex align-center justify-center" >
          <v-col cols="auto">
            <v-skeleton-loader
              class="mx-auto border"
              width="368"
              type="card-avatar"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else class="d-flex align-center justify-center">
          <v-col cols="auto">
            <cocktail-card :cocktail="state.cocktail"/>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
  import CocktailCard from '@/components/CocktailCard.vue'
  import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
  import router from "@/router";
  import {onMounted, onUpdated, reactive} from "vue";
  import {ICocktail} from "@/interfaces";
  import {useCocktailStore} from "@/store/cocktail";


  const state = reactive({
    cocktail: {} as ICocktail | undefined,
    loading: false
  });

  const cocktailStore = useCocktailStore()
  const getCocktailByID = async () => {
    const id = router.currentRoute.value.params.id as string;
    state.loading = true;
    try {
      await cocktailStore.fetchCocktailByID(id)
      state.cocktail = cocktailStore.getCocktailByID(id)
      state.loading = false;
    } catch (error) {
      console.log(error);
      state.loading = false;
    }
  };

  onMounted(async () => {
    await getCocktailByID();
  });
  onUpdated(async () => {
    await getCocktailByID();
  });
</script>
