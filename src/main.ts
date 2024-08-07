import { config } from 'dotenv'
import { HttpServer } from '@/infrastructure/server'
config()

const server = new HttpServer()
server.start()
