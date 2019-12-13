import { logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router/index'
const state = {
    name: '管理员',
    roles: ''
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ROLES: (state, role) => {
        state.roles = role
    }
}

const actions = {
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                commit('SET_NAME', name)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_ROLES', '')
                resetRouter()
                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}