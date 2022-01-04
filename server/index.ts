import * as trpcExpress from '@trpc/server/adapters/express'
import * as trpc from '@trpc/server'
import express from 'express'
import cors from 'cors'
import { usersRoutes } from './routes/user'

const appRouter = trpc.router().merge(usersRoutes)

export type AppRouter = typeof appRouter

const app = express()

app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)

app.listen(4000)
