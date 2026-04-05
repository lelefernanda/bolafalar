import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const teacherId = parseInt(query.teacherId as string)

    const resources = await prisma.resource.findMany({
      where: { teacherId },
      include: {
        studentUser: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return resources
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { title, description, type, url, filePath, teacherId, studentUserId } = body

    const resource = await prisma.resource.create({
      data: {
        title,
        description,
        type,
        url,
        filePath,
        teacherId,
        studentUserId: studentUserId || null
      }
    })

    return resource
  }
})