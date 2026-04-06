import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = parseInt(query.userId as string)

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      students: {
        include: {
          appointments: {
            where: { status: 'scheduled' },
            orderBy: { dateTime: 'asc' }
          }
        }
      }
    }
  })

  if (!user || user.students.length === 0) {
    return []
  }

  const student = user.students[0]
  return student.appointments
})