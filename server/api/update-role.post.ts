import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { email } = body

    const user = await prisma.user.update({
      where: { email },
      data: { role: 'teacher' }
    })

    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } }
  }
})