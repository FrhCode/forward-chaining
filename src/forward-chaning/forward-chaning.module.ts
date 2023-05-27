import { Module } from '@nestjs/common';
import { ForwardChaningService } from './forward-chaning.service';

@Module({
  providers: [ForwardChaningService],
  exports: [ForwardChaningService],
})
export class ForwardChaningModule {}
