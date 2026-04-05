import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const teacher = await prisma.user.findFirst({
    where: { role: 'teacher' }
  })
  return teacher
})