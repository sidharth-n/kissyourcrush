import dotenv from 'dotenv'

// Load .env file
dotenv.config()

export const env = {
  falKey: process.env.FAL_KEY || ''
}