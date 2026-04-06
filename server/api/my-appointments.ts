import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const userId = parseInt(query.userId as string)

    const appointments = await prisma.appointment.findMany({
      where: {
        OR: [
          { studentUserId: userId },
          { teacherId: userId }
        ]
      },
      include: {
        teacher: { select: { id: true, name: true, email: true } },
        studentUser: { select: { id: true, name: true, email: true } }
      },
      orderBy: { dateTime: 'asc' }
    })

    return appointments
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { title, description, dateTime, duration, userId, teacherId } = body

    const appointment = await prisma.appointment.create({
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        duration: duration || 60,
        studentUserId: userId,
        teacherId,
        status: 'pending'
      }
    })

    return appointment
  }
})