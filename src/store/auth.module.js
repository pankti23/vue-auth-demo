import { userService } from '../services';
import { router } from '../helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, loginObj ) {
        const username = loginObj.username;
        commit('loginRequest', { username });
    
        return new Promise((resolve, reject) => {
            userService.login(loginObj)
            .then(
                userRes => {
                    console.log(userRes);
                    if (userRes.success) {
                        localStorage.setItem('user', JSON.stringify(userRes.data.user));
                        localStorage.setItem('token', JSON.stringify(userRes.data.api_token));
                        commit('loginSuccess', userRes);
                        resolve(userRes.data);
                    } else {
                        commit('loginFailure', userRes);
                        dispatch('alert/error', userRes.message, { root: true });
                    }
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                    reject(error);
                }
            );
        });
    },
    logout({ dispatch, commit }) {
        userService.logout()
        .then(
            userRes => {
                if (userRes.success) {
                    localStorage.clear();
                    commit('logout');
                    router.push('/');
                } else {
                    commit('loginFailure', userRes);
                    dispatch('alert/error', userRes.message, { root: true });
                }
            },
            error => {
                commit('loginFailure', error);
                dispatch('alert/error', error, { root: true });
            }
        )
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
    
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user.data;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
        state.user = user;
    },
    registerSuccess(state, user) {
        state.status = {};
        state.user = user;
    },
    registerFailure(state) {
        state.status = {};
    }
};

export const auth = {
    namespaced: true,
    state,
    actions,
    mutations
};