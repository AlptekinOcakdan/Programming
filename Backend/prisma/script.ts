import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
    // const user1 = await prisma.user.create({data:{name:"Alptekin"}})
    await prisma.user.deleteMany();
    const user2 = await prisma.user.create({
        data: {
            name: "Alptekin",
            email: "alptekin.ocakdan@gmail.com",
            age:24,
            userPreference:{
                create:{
                    emailNotifications:true
                }
            }
        },
    })
    console.log(user2);
}

main()
  .catch(e => {
      console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

