import Vue from "vue";
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getName, setName, removeName } from '@/utils/auth'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}
const actions = {
    // 登录
    Login({ commit }, userInfo) {
        const username = userInfo.username.trim();
        return new Promise((resolve, reject) => {
            login(username, userInfo.password).then(response => {
                const data = response.data
                setToken(data.token)
                setName(data.name)
                commit('SET_TOKEN', data.token)
                commit('SET_NAME', data.name)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const data = response.data
                commit('SET_ROLES', data.roles)
                commit('SET_NAME', data.name)
                commit('SET_AVATAR', data.avatar)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 登出
    LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                removeName()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}
const getters = {
    // navForVideoClass: state => {
    //     return state.NavBar.filter(item => {
    //         return item.nav_text != '首页';
    //     })
    // }
}

export default {
    state,
    mutations,
    actions,
    getters
}