import { config } from 'dotenv'
import { HttpServer } from '@/infrastructure/http/server'
config()

const server = new HttpServer()
server.start()
