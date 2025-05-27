import { prisma } from "../src/lib/prisma";

async function main() {
  // 1. Criação de usuários
  await prisma.user.createMany({
    data: [
      {
        name: "amole",
        cpf: "11240280483",
        password:
          "$2a$12$UJxx481ar3cHPieCdTI8AOjTZLv9tIrpcrumbxbySLrpL5coKyuDq", // 11111111
        email: "thulio@gmail.com",
        type: "ADMIN",
      },
      {
        name: "Maria Silva",
        cpf: "12345678901",
        password:
          "$2a$12$h.JVsdQupaV9XbLIrnla.ONXeHWnDKFA4WXSvV0aHxwyLsLO3Du8.", // senhaMaria123
        email: "maria.silva@example.com",
        type: "DONATOR",
      },
      {
        name: "João Souza",
        cpf: "98765432100",
        password:
          "$2a$12$btUXci2S5ZE8567n1zxvtel3g7qrE9osIu0rZKRsaedWaapq7mWpa", // joaoSenha456
        email: "joao.souza@example.com",
        type: "ADMIN_ONG",
      },
      {
        name: "Ana Oliveira",
        cpf: "45678912322",
        password:
          "$2a$12$ZIqcTuC9yMe.VVa6Q30xV.Y4LT8tNpaSfcL/oqrvt6g0fxUhiA6f2", // anaOliveira789
        email: "ana.oliveira@example.com",
        type: "DONATOR",
      },
      {
        name: "Carlos Pereira",
        cpf: "32165498777",
        password:
          "$2a$12$QlWPp8ms7XIzKidj2b.fheTdmFFFdOROnnlVkHTKmQnxE4xdN9Nta", // carlosPereira321
        email: "carlos.pereira@example.com",
        type: "ADMIN",
      },
      {
        name: "ONG Esperança",
        cpf: "15975348620",
        password:
          "$2a$12$ief8Fpt67mFYJNTNTV36L.KPp7aBDxN5J3lVIZdOyiP5BVKOYZXzm", // ongEsperanca2024
        email: "contato@ongesperanca.org",
        type: "ADMIN_ONG",
      },
    ],
    skipDuplicates: true,
  });

  // 2. Criação das ONGs
  await prisma.ong.createMany({
    data: [
      {
        name: "ONG Esperança",
        cnpj: "15975348620001",
        address: "Rua da Solidariedade, 123",
        phone: "(83)981507860",
        context: "ALIMENTOS",
        description: "ONG focada em distribuição de alimentos.",
        email: "contato@ongesperanca.org",
        expiresIn: 1,
        accessToken: "token1",
        publicKey: "publicKey1",
        refreshToken: "refreshToken1",
        profileImage: "https://imgur.com/u82U9TP",
      },
      {
        name: "ONG Vida Nova",
        cnpj: "22222222222222",
        address: "Avenida das Flores, 456",
        phone: "(83)988887777",
        context: "EDUCACAO",
        description: "Apoio à educação de crianças carentes.",
        email: "contato@vidanova.org",
        expiresIn: 1,
        accessToken: "token2",
        publicKey: "publicKey2",
        refreshToken: "refreshToken2",
        profileImage: "https://imgur.com/u82U9TP",
      },
      {
        name: "ONG Saúde para Todos",
        cnpj: "33333333333333",
        address: "Rua da Saúde, 789",
        phone: "(83)977776666",
        context: "SAUDE",
        description: "Atendimento médico gratuito.",
        email: "contato@saudeparatodos.org",
        expiresIn: 1,
        accessToken: "token3",
        publicKey: "publicKey3",
        refreshToken: "refreshToken3",
        profileImage: "https://imgur.com/u82U9TP",
      },
      {
        name: "ONG Verde Esperança",
        cnpj: "44444444444444",
        address: "Rua das Árvores, 321",
        phone: "(83)966665555",
        context: "MEIO_AMBIENTE",
        description: "Projetos de reflorestamento.",
        email: "contato@verdeesperanca.org",
        expiresIn: 1,
        accessToken: "token4",
        publicKey: "publicKey4",
        refreshToken: "refreshToken4",
        profileImage: "https://imgur.com/u82U9TP",
      },
    ],
    skipDuplicates: true,
  });

  // 3. Recupera os usuários e ongs que serão relacionados
  const userJoao = await prisma.user.findUnique({
    where: { email: "joao.souza@example.com" },
  });
  const userOngEsperanca = await prisma.user.findUnique({
    where: { email: "contato@ongesperanca.org" },
  });

  const ongEsperanca = await prisma.ong.findUnique({
    where: { email: "contato@ongesperanca.org" },
  });
  const ongVidaNova = await prisma.ong.findUnique({
    where: { email: "contato@vidanova.org" },
  });

  // 4. Criação das relações em userOng
  await prisma.userOng.createMany({
    data: [
      {
        userId: userJoao?.id_user ?? "",
        ongId: ongEsperanca?.id_ong ?? "",
      },
      {
        userId: userOngEsperanca?.id_user ?? "",
        ongId: ongEsperanca?.id_ong ?? "",
      },
      {
        userId: userJoao?.id_user ?? "",
        ongId: ongVidaNova?.id_ong ?? "",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("Seed completed!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
