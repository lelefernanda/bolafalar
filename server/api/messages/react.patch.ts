import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, reaction } = body

  const message = await prisma.message.update({
    where: { id },
    data: { reaction }
  })

  return message
})