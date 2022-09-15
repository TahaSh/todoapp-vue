import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
      meta: {
        requiresGuest: true
      }
    }
  ]
})

export default router
