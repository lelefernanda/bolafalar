import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
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
})