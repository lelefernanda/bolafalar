import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const teacher = await prisma.user.upsert({
    where: { email: 'lelefernanda200@gmail.com' },
    update: { password: 'lunalinares' },
    create: {
      name: 'Leticia Fernandes',
      birthDate: new Date('1990-01-01'),
      nationality: 'Brasileira',
      email: 'lelefernanda200@gmail.com',
      password: 'lunalinares',
      role: 'teacher'
    }
  })
  console.log('Professor criado/atualizado:', teacher)

  const student = await prisma.user.upsert({
    where: { email: 'elnaufrago2009@gmail.com' },
    update: { password: 'moises' },
    create: {
      name: 'Aluno Moises',
      birthDate: new Date('2009-01-01'),
      nationality: 'Brasileiro',
      email: 'elnaufrago2009@gmail.com',
      password: 'moises',
      role: 'student'
    }
  })
  console.log('Aluno criado/atualizado:', student)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())