import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { HousesModule } from './houses/houses.module';

@Module({
  imports: [
    NinjasModule, 
    UsersModule, 
    HousesModule,
    // TypeOrmModule.forRoot() 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
