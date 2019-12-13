const state = {
    name: '管理员'
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    },
}

const actions = {
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { user, info, roles, permissions } = response.data

                if (!user) {
                    reject('验证失败,请重新登录.')
                }

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    roles.push(user.code)
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', user.name)
                commit('SET_AVATAR', '')
                commit('SET_INTRODUCTION', info.name)
                commit('SET_PERMISSIONS', permissions)
                resolve(user)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
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