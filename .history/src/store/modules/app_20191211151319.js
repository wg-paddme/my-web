const state = {
    name: '管理员'
}

const mutations = {
    SET_NAME: (state, name) => {
        state.name = name
    },
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}