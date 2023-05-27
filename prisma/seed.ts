import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.symptom.deleteMany();
  await prisma.rule.deleteMany();

  await prisma.symptom.createMany({
    data: [
      {
        code: 'N',
      },
      {
        code: 'M',
      },
      {
        code: 'L',
      },
      {
        code: 'C',
      },
      {
        code: 'A',
      },
      {
        code: 'E',
      },
      {
        code: 'B',
      },
      {
        code: 'X',
      },
      {
        code: 'Z',
      },
      {
        code: 'D',
      },
      {
        code: 'Y',
      },
    ],
  });

  await prisma.rule.createMany({
    data: [
      {
        code: 'R1',
      },
      {
        code: 'R2',
      },
      {
        code: 'R3',
      },
      {
        code: 'R4',
      },
      {
        code: 'R5',
      },
    ],
  });

  await prisma.ruleBase.createMany({
    data: [
      {
        ruleCode: 'R1',
        dieseCode: 'Z',
        symptomCode: 'Y',
      },
      {
        ruleCode: 'R1',
        dieseCode: 'Z',
        symptomCode: 'D',
      },
      {
        ruleCode: 'R2',
        dieseCode: 'Y',
        symptomCode: 'X',
      },
      {
        ruleCode: 'R2',
        dieseCode: 'Y',
        symptomCode: 'B',
      },
      {
        ruleCode: 'R2',
        dieseCode: 'Y',
        symptomCode: 'E',
      },
      {
        ruleCode: 'R3',
        dieseCode: 'X',
        symptomCode: 'A',
      },
      {
        ruleCode: 'R4',
        dieseCode: 'L',
        symptomCode: 'C',
      },
      {
        ruleCode: 'R5',
        dieseCode: 'N',
        symptomCode: 'L',
      },
      {
        ruleCode: 'R5',
        dieseCode: 'N',
        symptomCode: 'M',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
