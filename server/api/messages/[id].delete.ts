import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = parseInt(query.id as string)

  await prisma.message.delete({
    where: { id }
  })

  return { success: true }
})