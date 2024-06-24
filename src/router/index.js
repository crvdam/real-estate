import { createRouter, createWebHistory } from 'vue-router'
import HousesView from "../views/HousesView.vue"
import AboutView from "../views/AboutView.vue"
import EditCreateView from "../views/EditCreateView.vue"
import DetailsView from "../views/DetailsView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'houses',
      component: HousesView,
    },
    { 
      path: '/about',
      name: 'about',
      component: AboutView
    },
    { 
      path: '/form',
      name: 'form',
      component: EditCreateView,
    },
    { 
      path: '/details',
      name: 'details',
      component: DetailsView
    },

  ]
})

export default router
