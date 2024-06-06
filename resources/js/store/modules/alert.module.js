export const alert = {
    namespaced: true,
    state: {
        type: "blue",
        message: null
    },
    actions: {
        success({ commit }, message) {
            commit('success', message);
        },
        info({ commit }, message) {
            commit('info', message);
        },
        error({ commit }, message) {
            commit('error', message);
        },
        clear({ commit }) {
            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.type = "green";
            state.message = message;
        },
        info(state, message) {
            state.type = "blue";
            state.message = message;
        },
        error(state, message) {
            state.type = "red";
            state.message = message;
        },
        clear(state) {
            state.type = "blue";
            state.message = null;
        }
    }
}
