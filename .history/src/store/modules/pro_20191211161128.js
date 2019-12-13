import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
    data.forEach(item => {
        // alert(JSON.stringify(item))
        const menu = {
            path: item.path,
            component: item.component === '#' ? Layout : () => import(`@/views${item.component}`),
            children: [],
            name: item.name,
            meta: { title: item.name, icon: item.icon || '', roles: item.role || ['admin'] }
        }
        item.hidden ? menu['hidden'] = item.hidden : null
        item.redirect ? menu['redirect'] = item.redirect : null;
        (item.meta && item.meta.noCache) ? menu.meta['noCache'] = item.meta.noCache : null
        if (item.children) {
            generaMenu(menu.children, item.children)
        }
        routes.push(menu)
    })
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }

        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, roles)
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
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }) {
        return new Promise(resolve => {
            generaMenu(asyncRoutes, [])
            // 先查询后台并返回左侧菜单数据并把数据添加到路由
            let accessedRoutes = asyncRoutes || []
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
