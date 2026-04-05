import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const teacher = await prisma.user.create({
    data: {
      name: 'Leticia Fernandes',
      birthDate: new Date('1990-01-01'),
      nationality: 'Brasileira',
      email: 'lelefernanda200@gmail.com',
      password: '123456',
      role: 'teacher'
    }
  })
  console.log('Professor criado:', teacher)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())