import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { userId, photo } = body

    const user = await prisma.user.update({
      where: { id: userId },
      data: { photo }
    })

    return { success: true, photo: user.photo }
  }
})