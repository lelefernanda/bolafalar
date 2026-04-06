import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  
  if (!form || form.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'Nenhum arquivo enviado'
    })
  }

  const file = form.find((field) => field.name === 'file')
  
  if (!file || !file.data) {
    throw createError({
      statusCode: 400,
      message: 'Arquivo inválido'
    })
  }

  const originalName = file.filename || 'file'
  const timestamp = Date.now()
  const safeName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  const filePath = join(uploadDir, safeName)
  
  await writeFile(filePath, file.data)

  return {
    success: true,
    url: `/uploads/${safeName}`,
    filename: originalName
  }
})