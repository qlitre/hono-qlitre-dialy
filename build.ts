// build.ts
import app from './src/index'
import { toSSG } from 'hono/ssg'
import fs from 'fs/promises'

toSSG(app, fs)