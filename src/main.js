import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'

import { createApolloClient } from './apolloClient'
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, createApolloClient())
  },
  render: () => h(App)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
