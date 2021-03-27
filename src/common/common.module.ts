import { Module } from '@nestjs/common';
import { LoggingPlugin } from './plugins/logging.plugin';
import { DateScalar } from './scalars/date.scalar';

@Module({
  providers: [DateScalar, LoggingPlugin],
})
export class CommonModule {}
