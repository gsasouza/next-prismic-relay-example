require('dotenv').config();

export const PORT = process.env.PORT || 3000
export const isDev = process.env.NODE_ENV === 'development'
export const PRISMIC_ENDPOINT = process.env.PRISMIC_ENDPOINT
export const PRISMIC_ENDPOINT_API = process.env.PRISMIC_ENDPOINT_API
export const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN
