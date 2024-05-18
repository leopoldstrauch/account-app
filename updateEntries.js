const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.entry.updateMany({
    data: {
      date: new Date(),  // Set a default date
      documentNumber: 'default',  // Set a default document number
      description: 'default description',  // Set a default description
      remark: 'default remark',  // Set a default remark
    },
    where: {
      date: null,
      documentNumber: null,
      description: null,
      remark: null,
    },
  });
}

main()
  .then(() => {
    console.log('Entries updated');
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
