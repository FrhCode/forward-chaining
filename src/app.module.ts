import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ForwardChaningModule } from './forward-chaning/forward-chaning.module';

@Module({
  imports: [PrismaModule, ForwardChaningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
