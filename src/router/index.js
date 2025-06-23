import { createRouter, createWebHistory } from 'vue-router'
import ContactFormView from '../views/ContactFormView.vue'
import ContactListView from '../views/ContactListView.vue'

const routes = [
  { path: '/', redirect: '/form' },
  { path: '/form', name: 'Form', component: ContactFormView },
  { path: '/contacts', name: 'Contacts', component: ContactListView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
