import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const teacherId = parseInt(query.teacherId as string)

    const appointments = await prisma.appointment.findMany({
      where: { teacherId },
      include: {
        studentUser: { select: { id: true, name: true, email: true } }
      },
      orderBy: { dateTime: 'asc' }
    })

    return appointments
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { title, description, dateTime, duration, teacherId, studentUserId } = body

    const appointment = await prisma.appointment.create({
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        duration: duration || 60,
        teacherId,
        studentUserId,
        status: 'pending'
      }
    })

    return appointment
  }
})