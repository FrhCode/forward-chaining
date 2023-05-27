import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import checkElementsExist from 'src/utils/checkElementsExist';

@Injectable()
export class ForwardChaningService {
  constructor(private prisma: PrismaService) {}

  async generateRuleBase() {
    const data = await this.prisma.rule.findMany({
      include: { RuleBase: { select: { Diese: true, Symptom: true } } },
    });

    type Obj = {
      [key: string]: {
        disease: string;
        symptom: string[];
        isTrue: boolean;
      };
    };

    let obj: Obj = {};

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      type DataForRule = {
        disease: string;
        symptom: string[];
        isTrue: boolean;
      };

      const dataForRule: DataForRule = {
        disease: element.RuleBase[0].Diese.code,
        symptom: element.RuleBase.map(({ Symptom }) => Symptom.code),
        isTrue: false,
      };

      const rule = element.code;
      obj[rule] = dataForRule;
    }

    return obj;
  }

  async calculateFwChaning(fact: string[], target: string) {
    let obj = await this.generateRuleBase();

    let result: [key: string, iterator: number] | [] = [];

    let iterator = 1;
    for (let index = 0; index < Object.keys(obj).length; index++) {
      for (let key in obj) {
        let { disease, symptom, isTrue } = obj[key];
        if (isTrue) continue;

        const isSymtomValid = checkElementsExist(fact, symptom);
        if (isSymtomValid) {
          fact.push(...symptom, disease);
          obj[key].isTrue = true;
          // console.log('ADDED', symptom, disease);
        }
      }

      iterator++;

      const isResultInFact = fact.includes(target);

      if (isResultInFact) {
        // console.log(`FOUND [${target}] in iterator number ${iterator}`);
        result = [target, iterator];
        break;
      }
    }

    return result;
  }

  async testing() {
    return await this.prisma.rule.findMany();
  }
}
