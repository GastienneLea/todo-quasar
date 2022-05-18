import { ActionTree, MutationTree, Module, GetterTree } from 'vuex'
import axios from 'axios'

export interface User {
  id: number,
  username: string
  token: string
}

const state: User = {
  id: 0,
  username: '',
  token: ''
}

const mutations: MutationTree<User> = {
  setUser(state, payload: User) {
    state.id = payload.id
    state.username = payload.username
    state.token = payload.token
  }
}

const getters: GetterTree<User, any> = {
  getUser(state) {
    return state
  }
}

const actions = <ActionTree<User, any>> {
  async login(store, username: string) {
    return await axios.post('http://localhost:3000/api/v1/auth/login', { username }).then(({ data }: { data: User }) => {
      store.commit('setUser', data)
      window.localStorage.setItem('jwt', data.token)
    })
  }
}

const userModule: Module<User, any> = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

export default userModule
