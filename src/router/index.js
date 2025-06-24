import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/LandingPageView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPageView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router