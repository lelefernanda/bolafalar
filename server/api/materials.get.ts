import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const userId = parseInt(query.userId as string)

    const resources = await prisma.resource.findMany({
      where: {
        OR: [
          { studentUserId: userId },
          { studentUserId: null }
        ]
      },
      include: {
        teacher: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return resources
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { title, description, type, url, teacherId, studentUserId } = body

    const resource = await prisma.resource.create({
      data: {
        title,
        description,
        type,
        url,
        teacherId,
        studentUserId: studentUserId || null
      }
    })

    return resource
  }
})