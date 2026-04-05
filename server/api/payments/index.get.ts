import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const teacherId = parseInt(query.teacherId as string)

    const payments = await prisma.payment.findMany({
      where: { teacherId },
      include: {
        student: true,
        studentUser: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return payments
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { amount, description, status, studentId, teacherId, studentUserId } = body

    const payment = await prisma.payment.create({
      data: {
        amount,
        description,
        status: status || 'pending',
        studentId: studentId || null,
        teacherId,
        studentUserId
      }
    })

    return payment
  }
})