import axios from 'axios'

const baseUrl = '/api/persons'

const get = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const post = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = id => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url)
}

const put = (id, updatedPerson) => {
    const url = `${baseUrl}/${id}`
    return axios.put(url, updatedPerson).then(response => response.data)
}

export default { get, post, remove, put }