import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const userId = parseInt(query.userId as string)

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        sender: { select: { id: true, name: true, email: true } },
        receiver: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return messages
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { content, senderId, receiverId } = body

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId
      }
    })

    return message
  }
})