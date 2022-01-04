import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as y from 'yup'

const prisma = new PrismaClient()

export const usersRoutes = trpc
  .router()
  .query('getUser', {
    input: y.string().required(),
    async resolve({ input }) {
      const user = await prisma.user.findUnique({
        where: {
          id: input,
        },
      })

      return user
    },
  })
  .query('getUsers', {
    async resolve() {
      const users = await prisma.user.findMany()

      return users
    },
  })
  .mutation('createUser', {
    input: y.object({
      name: y.string().required(),
    }),
    async resolve({ input }) {
      const user = await prisma.user.create({
        data: input,
      })

      return user
    },
  })
  .mutation('updateUser', {
    input: y.object({
      id: y.string().required(),
      patch: y.object({
        name: y.string(),
      }),
    }),
    async resolve({ input }) {
      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: input.patch,
      })

      return user
    },
  })
  .mutation('deleteUser', {
    input: y.string().required(),
    async resolve({ input }) {
      try {
        await prisma.user.delete({
          where: {
            id: input,
          },
        })
        return true
      } catch {
        return false
      }
    },
  })
