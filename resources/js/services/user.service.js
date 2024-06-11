import axios from 'axios'

export const userService = {
    fetchUsers,
}

function fetchUsers(requestParams) {
    const { page = 1, perPage = 10, sort, filter } = requestParams; // Default parameters
    return axios({
        method: 'get',
        url: `/api/users`,
        timeout: 8000, // 8 seconds timeout
        params: {
            page,
            perPage,
            sort: sort && `${sort.field},${sort.order}`, // Format sorting params
            filter, // Handle filter parameters as needed
        },
    }).then((userResponse) => {
        if (userResponse.data) {
            return userResponse.data
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


