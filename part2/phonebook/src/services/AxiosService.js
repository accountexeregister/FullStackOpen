import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

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

export default { get, post, remove }