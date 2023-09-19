// Utilities
import { defineStore } from 'pinia'
import {ICocktail, ICocktailReq} from "@/interfaces";

export enum COCKTAL_MAP {
  margarita = "11007",
  mojito = "11000",
  a1 = "17222",
  kir = "17203",
}

const toDomain = (req: ICocktailReq): ICocktail => {
  const { idDrink, strDrink, strDrinkThumb, strCategory, strAlcoholic, strGlass, strInstructions, ...rest } = req
  const ingredients: string[] = []
  Object.entries(rest).forEach(([key, value]) => {
    if (key.includes("strIngredient") && value) return ingredients.push(value)
  });

  return {
    id: idDrink,
    name: strDrink,
    imageURL: strDrinkThumb,
    category: strCategory,
    alcoholic: strAlcoholic,
    glass: strGlass,
    instructions: strInstructions,
    ingredients,
  }
}

export const useCocktailStore = defineStore('cocktail', {
  state: () => ({
    cocktails: [] as ICocktail[],
    count: 0
  }),

  getters: {
    getCocktailByID(state) {
      return (cocktailID: string) => state.cocktails.find((el) => el.id === COCKTAL_MAP[cocktailID as keyof typeof COCKTAL_MAP])
    },
  },

  actions: {
    async fetchCocktailByID(id: string) {
      const isHash = this.getCocktailByID(id)
      if (isHash) return false
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${id}`);
        const { drinks } = await response.json()
        if (!drinks.length) throw new Error("not found")
        const cocktail = toDomain(drinks[0])
        this.cocktails.push(cocktail);
        console.log(this.cocktails)
        this.count++;
      } catch (error) {
        console.log(error);
      }
    }
  }
})
