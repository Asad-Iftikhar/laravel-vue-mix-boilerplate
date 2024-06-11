import {authService} from '../../services/index.js';
import router from '../../routes.js';
import {authUser} from '@/helpers';

const user = authUser()
const initialState = user
    ? {status: {loggedIn: true}, user, errors: {}}
    : {status: {}, user: null, errors: {}};

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({dispatch, commit}, {email, password}) {
            commit('loginRequest', {email});

            authService.login(email, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/dashboard')
                    },
                    error => {
                        commit('loginFailure', error);
                        dispatch('alert/error', error, {root: true});
                    }
                );
        },
        logout({commit}) {
            authService.logout();
            commit('logout');
            router.push('/login')
        },
        authenticated({commit}, {user}) {
            commit('loginSuccess', user);
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = {loggingIn: true};
            state.user = user;
            state.errors = {};
        },
        loginSuccess(state, user) {
            state.status = {loggedIn: true};
            state.user = user;
            state.errors = {};
        },
        loginFailure(state, errors) {
            state.status = {};
            state.user = null;
            state.errors = errors;
        },
        logout(state) {
            state.status = {};
            state.user = null;
            state.errors = {};
        },
    },
    getters: {
        isAuthenticated: (state) => state.status.loggedIn,
        authenticatedUser: (state) => state.user,
    }
}
