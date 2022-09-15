<template>
  <div
    class="group flex items-center justify-between bg-gray-200 rounded-lg px-5 py-3.5 text-gray-900"
  >
    <div class="flex items-center">
      <button
        :class="[
          completed ? 'bg-blue-500 border-blue-500' : 'border-gray-500',
          'hover:border-blue-500 border-2 w-5 h-5 rounded-full flex items-center justify-center text-white cursor-pointer'
        ]"
        @click="toggle"
      >
        <svg
          v-if="completed"
          style="width: 15px; height: 15px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
          />
        </svg>
      </button>
      <span :class="[completed && 'line-through text-gray-500', 'ml-2.5']">
        {{ todo.title }}
      </span>
    </div>

    <button
      class="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-900"
      @click="onDelete"
    >
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { UPDATE_TODO, DELETE_TODO } from '../graphql/mutations'

const props = defineProps({
  todo: Object
})

const emit = defineEmits(['delete', 'deleted'])

const completed = ref(props.todo.completed)

const { mutate: save, onError: onUpdateError } = useMutation(UPDATE_TODO)
const {
  mutate: deleteTodo,
  onError: onDeleteError,
  onDone: onDeleteDone
} = useMutation(DELETE_TODO)

const toggle = () => {
  completed.value = !completed.value
  save({
    input: {
      todoId: props.todo.id,
      completed: completed.value
    }
  })
}

const onDelete = async () => {
  emit('delete')
  deleteTodo({
    todoId: props.todo.id
  })
}

onDeleteDone(() => {
  emit('deleted')
})

onUpdateError(() => {
  completed.value = props.todo.completed
  console.error('An error occurred while updating todos')
})

onDeleteError(() => {
  console.error('An error occurred while deleting todo')
})
</script>
