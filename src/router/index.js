import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/components/LandingPage.vue'
import Questionario from '@/components/Questionario.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/questionario',
    name: 'Questionario',
    component: Questionario
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router