import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'DELETE') {
    const id = parseInt(event.context.params?.id as string)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'ID inválido'
      })
    }

    await prisma.resource.delete({
      where: { id }
    })

    return { success: true }
  }
})