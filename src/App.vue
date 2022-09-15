<template>
  <RouterView />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from './stores/auth'

const { getUser } = useAuth()

useRouter().beforeEach(async (to, from, next) => {
  try {
    const user = await getUser()
    if (!user && !to.meta?.requiresAuth) {
      return next()
    }
    if (user && to.meta?.requiresGuest) {
      return next({ name: 'Home' })
    }
    if (!user && to.meta?.requiresAuth) {
      return next({ name: 'Login' })
    }
    next()
  } catch (err) {
    next({ name: 'Login' })
  }
})
</script>
