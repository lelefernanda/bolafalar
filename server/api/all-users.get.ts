import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const students = await prisma.user.findMany({
    where: { role: 'student' },
    orderBy: { name: 'asc' }
  })
  return students
})