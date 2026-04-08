import { prisma } from '#server/utils/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  
  if (!form || form.length === 0) {
    return { success: false, error: 'Nenhum arquivo enviado' }
  }

  const file = form.find((field) => field.name === 'file')
  
  if (!file || !file.data) {
    return { success: false, error: 'Arquivo inválido' }
  }

  const originalName = file.filename || 'file'
  const timestamp = Date.now()
  const safeName = `${timestamp}-${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  
  try {
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }
    
    const filePath = join(uploadDir, safeName)
    
    await writeFile(filePath, file.data)

    return {
      success: true,
      url: `/uploads/${safeName}`,
      filename: originalName
    }
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return { success: false, error: error.message }
  }
})
