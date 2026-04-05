import { prisma } from '#server/utils/prisma'

export default defineEventHandler(async (event) => {
  if (event.method === 'PATCH') {
    const body = await readBody(event)
    const { id, name, email, password, birthDate, nationality } = body

    const updateData = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (password) updateData.password = password
    if (birthDate) updateData.birthDate = new Date(birthDate)
    if (nationality) updateData.nationality = nationality

    const user = await prisma.user.update({
      where: { id },
      data: updateData
    })

    return { success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, photo: user.photo, birthDate: user.birthDate, nationality: user.nationality } }
  }
})