import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { ProductModule } from './modules/product.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
    }), 
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

