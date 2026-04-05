import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { email, password } = body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || user.password !== password) {
      throw createError({
        statusCode: 401,
        message: 'Email ou senha incorretos'
      })
    }

    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, photo: user.photo } }
  }
})