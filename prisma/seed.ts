import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});

  const user = await prisma.user.create({
    data: {
      email: "gui@gui.com",
      name: "gui",
      age: 20,
    },
  });

  const post = await prisma.post.create({
    data: {
      title: "Teste de post criado via seed",
      body: "Este é um post de teste...",
      authorId: user.id,
    },
  });
};

main();
