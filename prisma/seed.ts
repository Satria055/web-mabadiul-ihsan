import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: { 
      password: passwordHash,
      role: 'admin'
    },
    create: {
      username: 'admin',
      name: 'Super Admin',
      password: passwordHash,
      role: 'admin',
    },
  })
  console.log('Reset Password Berhasil:', admin)
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })