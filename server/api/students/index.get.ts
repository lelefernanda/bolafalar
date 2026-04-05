import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const teacherId = parseInt(query.teacherId as string)

    const students = await prisma.student.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' }
    })

    return students
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { name, email, phone, birthDate, notes, teacherId } = body

    const student = await prisma.student.create({
      data: {
        name,
        email,
        phone,
        birthDate: birthDate ? new Date(birthDate) : null,
        notes,
        teacherId
      }
    })

    return student
  }
})