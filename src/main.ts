import { config } from 'dotenv'
import { HttpServer } from '@/infrastructure/http/server'
config()

export const server = new HttpServer()
server.start()
