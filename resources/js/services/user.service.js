import axios from 'axios'
import {setAuthCommunity, setAuthUser, removeAuthUser} from '../helpers/index.js'

export const userService = {
    login,
    CheckLoggedIn,
    logout,
}

const isDev = import.meta.env.DEV

function login(email, password) {
    return axios({
        method: 'post',
        url: `/api/auth/login`,
        timeout: 8000, // 8 seconds timeout
        params: {
            email: email,
            password: password
        }
    }).then((userResponse) => {
        const user = userResponse.data.user
        if (user) {
            setAuthUser(user)
            return user
        }
        return Promise.reject(
            'There was an error serving your login request. Please check your credentials'
        )
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return Promise.reject(error.response.data.errors)
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return Promise.reject('There was an error serving your login request.')
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject(error.message)
        }
    })
}

function CheckLoggedIn() {
    return axios({
        method: 'post',
        url: `/api/auth/checkLoggedIn`,
        timeout: 8000, // 8 seconds timeout
    }).then((userResponse) => {
        const user = userResponse.data
        if (user) {
            setAuthUser(user)
            return user
        }
        return Promise.reject(
            'There was an error serving your login request. Please check your credentials'
        )
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return Promise.reject('There was an error serving your login request.')
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return Promise.reject('There was an error serving your login request.')
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject(error.message)
        }
    })
}

function logout() {
    // remove user from local storage to log user out
    removeAuthUser()

    axios.post("/api/auth/logout").then(({ data }) => {
        return data;
    }).catch(({ data }) => {
        return Promise.reject('Something went wrong')
    });
}
