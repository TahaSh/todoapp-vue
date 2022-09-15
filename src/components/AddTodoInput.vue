<template>
  <div
    class="px-5 w-full bg-gray-100 rounded-lg outline-none text-gray-900 flex items-center justify-between"
  >
    <input
      class="rounded-lg py-3.5 flex-1 bg-gray-100 outline-none pr-2.5"
      type="text"
      placeholder="What needs to be done?"
      :readonly="loading"
      v-model="title"
      @keypress.enter="onAdd"
    />
    <Spinner v-if="loading" class="text-blue-900 w-8" />
  </div>
</template>

<script setup>
import Spinner from './Spinner.vue'
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_TODO } from '../graphql/mutations'

const emit = defineEmits(['added'])

const title = ref('')

const {
  mutate: addTodo,
  onError: onAddError,
  onDone: onAddDone,
  loading
} = useMutation(ADD_TODO)

const onAdd = () => {
  addTodo({
    input: {
      title: title.value
    }
  })
}

onAddDone((result) => {
  title.value = ''
  emit('added', result.data.addTodo)
})

onAddError(() => {
  console.error('An error occurred while adding a todo')
})
</script>
