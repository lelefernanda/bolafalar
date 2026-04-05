import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { name, birthDate, nationality, email, password } = body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email já cadastrado'
      })
    }

    const teacher = await prisma.user.findFirst({
      where: { role: 'teacher' }
    })

    if (!teacher) {
      throw createError({
        statusCode: 500,
        message: 'Professor não encontrado no sistema'
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        birthDate: new Date(birthDate),
        nationality,
        email,
        password,
        role: 'student'
      }
    })

    await prisma.student.create({
      data: {
        name,
        email,
        teacherId: teacher.id
      }
    })

    return { success: true, user: { id: user.id, email: user.email, role: user.role } }
  }
})