import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  useLazyQuery,
  useMutation,
  useApolloClient
} from '@vue/apollo-composable'
import { CURRENT_USER } from '../graphql/queries'
import { LOGIN_USER } from '../graphql/mutations'
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const { client } = useApolloClient()

  const currentUser = ref(null)
  const {
    onResult: onCurrentUserResult,
    load: loadCurrentUser,
    networkStatus: currentUserNetworkStatus,
    refetch: refetchCurrentUser,
    onError: onCurrentUserError
  } = useLazyQuery(CURRENT_USER, null, {
    fetchPolicy: 'no-cache'
  })

  const {
    mutate: loginUser,
    onDone: onLoginDone,
    onError: onLoginError
  } = useMutation(LOGIN_USER)

  const getUser = () => {
    return new Promise((resolve) => {
      if (!localStorage.getItem('todoapp-token')) {
        currentUser.value = null
        return resolve(null)
      }
      if (currentUser.value !== null) {
        return resolve(currentUser)
      }
      if (currentUserNetworkStatus.value) {
        refetchCurrentUser()
      } else {
        loadCurrentUser()
      }
      onCurrentUserResult((result) => {
        if (result.data?.currentUser) {
          currentUser.value = result.data.currentUser
          resolve(currentUser)
        }
      })
      onCurrentUserError(() => {
        resolve(null)
      })
    })
  }

  const login = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      loginUser({
        username,
        password
      })

      onLoginDone((result) => {
        const token = result.data?.loginUser?.token
        if (!token) {
          reject('Error login')
        }
        localStorage.setItem('todoapp-token', token)
        resolve(true)
      })

      onLoginError(() => {
        reject('Error login')
      })
    })
  }

  const logout = () => {
    localStorage.removeItem('todoapp-token')
    client.cache.reset()
    router.push({ name: 'Login' })
  }

  return { currentUser, getUser, login, logout }
})
