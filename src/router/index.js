import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/LandingPageView.vue'
import ContactListView from '@/views/ContactListView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPageView
  },
  {
    path: '/getData',
    name: 'List',
    component: ContactListView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router