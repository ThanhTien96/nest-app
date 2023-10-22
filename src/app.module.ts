import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [TasksModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
