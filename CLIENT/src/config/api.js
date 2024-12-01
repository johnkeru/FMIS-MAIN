import axios from 'axios'
import env from '../utils/env'

const api = axios.create({
    baseURL: env('SERVER_URL'),
    withCredentials: true
})

export default api
