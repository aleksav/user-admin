import axios from 'axios'
import { apiUrl } from './config'

export const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})