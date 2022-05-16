import { ActionTree, MutationTree, Module, GetterTree } from "vuex"
import axios from 'axios'

export interface User {
  username: string
  token: string
}

const state: User = {
  username: '',
  token: ''
}

const mutations: MutationTree<User> = {
  setUser(state, payload: User) {
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
    return await axios.post('http://localhost:3000/api/v1/auth/login', { username }).then(({ data }) => {
      store.commit('setUser', data)
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
