import { asyncRoutes, constantRoutes } from '@/router'


/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children)
        }
        res.push(tmp)
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = routes
    }
}

const actions = {
    generateRoutes({ commit }) {
        return new Promise(resolve => {
            let accessedRoutes = constantRoutes.concat(asyncRoutes)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
