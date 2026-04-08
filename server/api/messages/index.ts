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
    let { content, audioUrl, mediaUrl, mediaType, senderId, receiverId } = body

    if (typeof audioUrl === 'object' && audioUrl !== null) {
      audioUrl = null
    }
    
    if (typeof audioUrl === 'string') {
      audioUrl = audioUrl
    } else {
      audioUrl = null
    }

    if (typeof mediaUrl === 'object' && mediaUrl !== null) {
      mediaUrl = null
    }
    
    if (typeof mediaUrl === 'string') {
      mediaUrl = mediaUrl
    } else {
      mediaUrl = null
    }

    mediaType = (mediaType && typeof mediaType === 'string') ? mediaType : null

    console.log('Creating message with:', { content, audioUrl, mediaUrl, mediaType, senderId, receiverId })

    const message = await prisma.message.create({
      data: {
        content,
        audioUrl,
        mediaUrl,
        mediaType,
        senderId,
        receiverId
      }
    })

    console.log('Created message:', message)

    return message
  }
})
