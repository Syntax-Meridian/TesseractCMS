import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const connectDb = async () => { 
  console.log('DB connection is successful') 
  console.log('all', await prisma.page.findMany())
}

connectDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })