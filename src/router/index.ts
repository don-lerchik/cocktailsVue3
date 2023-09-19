// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/cocktail/margarita'
  },
  {
    path: "/cocktail/:id",
    name: "Drink",
    component: () => import("@/views/Cocktail.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: () => import("@/views/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
