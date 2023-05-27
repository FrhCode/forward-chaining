import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ForwardChaningService } from './forward-chaning/forward-chaning.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private forwardChaningService: ForwardChaningService,
  ) {}

  async getHello() {
    const fact = ['A', 'B', 'C', 'D', 'E'];
    const target = ['Z', 'Y', 'N'];

    let result: { [key: string]: number } = {};

    for (let index = 0; index < 200; index++) {
      console.log(index);

      const element = target[index];
      const value = await this.forwardChaningService.calculateFwChaning(
        [...fact],
        element,
      );

      if (value.length === 0) break;

      const [key, iterator] = value;

      result[key] = iterator;
    }

    return result;
  }
}
