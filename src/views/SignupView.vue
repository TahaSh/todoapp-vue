<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold text-center">Todo App</h1>
    <form
      class="mt-5 w-full max-w-lg mx-auto flex flex-col"
      @submit.prevent="submit"
    >
      <input
        class="p-3.5 rounded-t border-b border-gray-300 text-gray-900 outline-none"
        v-model="name"
        :readonly="loading"
        type="text"
        placeholder="Name"
        required
      />
      <input
        class="p-3.5 border-b border-gray-300 text-gray-900 outline-none"
        v-model="username"
        :readonly="loading"
        type="text"
        placeholder="Username"
        required
      />
      <input
        class="p-3.5 rounded-b text-gray-900 outline-none"
        v-model="password"
        :readonly="loading"
        type="password"
        placeholder="Password"
        required
      />
      <button
        :class="[
          loading
            ? 'bg-gray-500 hover:bg-gray-500'
            : 'bg-blue-500 hover:bg-blue-600',
          'mt-2.5 py-2.5 rounded '
        ]"
        :disabled="loading"
      >
        Sign up
      </button>
    </form>
    <div class="mt-5">
      Already have an account?
      <RouterLink class="text-blue-400" :to="{ name: 'Login' }"
        >Log in here</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
import { SIGNUP_USER } from '../graphql/mutations'
import { useRouter } from 'vue-router'

const router = useRouter()

const { mutate: signup, loading, onDone } = useMutation(SIGNUP_USER)

const name = ref('')
const username = ref('')
const password = ref('')

const submit = () => {
  signup({
    input: {
      name: name.value,
      username: username.value,
      password: password.value
    }
  })
}

onDone(() => {
  router.push({ name: 'Login' })
})
</script>
