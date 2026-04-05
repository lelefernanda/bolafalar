import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id } = body

  await prisma.message.delete({
    where: { id }
  })

  return { success: true }
})