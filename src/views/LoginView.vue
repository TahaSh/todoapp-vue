<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <div
      v-if="showErrorMessage"
      class="mb-3.5 px-3.5 py-2 rounded-lg bg-red-700 text-red-50 text-sm font-medium"
    >
      Your username or password is incorrect
    </div>
    <h1 class="text-4xl font-bold text-center">Todo App</h1>
    <form
      class="mt-5 w-full max-w-lg mx-auto flex flex-col"
      @submit.prevent="submit"
    >
      <input
        class="p-3.5 rounded-t border-b border-gray-300 text-gray-900 outline-none"
        v-model="username"
        :readonly="loggingIn"
        type="text"
        placeholder="Username"
        required
      />
      <input
        class="p-3.5 rounded-b text-gray-900 outline-none"
        v-model="password"
        :readonly="loggingIn"
        type="password"
        placeholder="Password"
        required
      />
      <button
        :class="[
          loggingIn
            ? 'bg-gray-500 hover:bg-gray-500'
            : 'bg-blue-500 hover:bg-blue-600',
          'mt-2.5 py-2.5 rounded '
        ]"
        :disabled="loggingIn"
      >
        Log in
      </button>
    </form>
    <div class="mt-5">
      Don't have an account?
      <RouterLink class="text-blue-400" :to="{ name: 'Signup' }"
        >Sign up here</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const { login } = useAuth()

const username = ref('')
const password = ref('')

const showErrorMessage = ref(false)
const loggingIn = ref(false)

const submit = async () => {
  loggingIn.value = true
  try {
    await login({
      username: username.value,
      password: password.value
    })
    router.push({ name: 'Home' })
  } catch (err) {
    showErrorMessage.value = true
  }
  loggingIn.value = false
}
</script>
