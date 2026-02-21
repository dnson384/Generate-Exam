import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterMongoose } from '@nestjs-cls/transactional-adapter-mongoose';

import { join } from 'path';

import { DocumentModule } from './importer/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [MongooseModule],
          adapter: new TransactionalAdapterMongoose({
            mongooseConnectionToken: getConnectionToken(),
          }),
        }),
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGO_CONNECTION_STRING'),
        // dbName: 'GenerateExam',
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static', 'uploads'),
      serveRoot: '/static',
    }),
    DocumentModule,
  ],
})
export class AppModule {}
