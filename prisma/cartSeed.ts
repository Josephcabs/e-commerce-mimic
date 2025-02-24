import prisma from "@/lib/db";
import { faker } from "@faker-js/faker";
import readlineSync from "readline-sync";
const fakePassword = "TestPass1!";

async function main() {
  const userInput: string = readlineSync.question(
    "Warning: This will overwrite your database. Do you want to continue? (yes/no): ",
  );

  if (userInput.toLowerCase() !== "yes") {
    console.log("Seeding aborted");
    process.exit(0);
  }

  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: fakePassword,
      },
    });

    const cart = await prisma.cart.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });

    for (let j = 0; j < 5; j++) {
      const randomNumber = faker.number.int({ min: 250, max: 450 });
      const randomNumber2 = faker.number.int({ min: 350, max: 600 });
      const product = await prisma.product.create({
        data: {
          title: faker.commerce.productName(),
          price: parseInt(faker.commerce.price()),
          description: faker.commerce.productDescription(),
          category: faker.commerce.department(),
          image: faker.image.urlPicsumPhotos({
            width: randomNumber,
            height: randomNumber2,
          }),
          rate: faker.number.int({ min: 1, max: 5 }),
          count: faker.number.int({ min: 1, max: 100000 }),
          quantity: faker.number.int({ min: 1, max: 50 }),
        },
      });

      await prisma.cartItem.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: product.id } },
          quantity: faker.number.int({ min: 1, max: 10 }),
        },
      });
    }
  }

  console.log("Database has been seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
