import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'PATCH') {
    const body = await readBody(event)
    const { id, status } = body

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status }
    })

    return appointment
  }
})