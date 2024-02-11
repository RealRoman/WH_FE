import axios from 'axios'
import { AppConfig } from 'src/config'

export const api = axios.create({
    baseURL: `${AppConfig.protocol}://${AppConfig.host}:${AppConfig.port}`
})

