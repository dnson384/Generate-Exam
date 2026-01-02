import { Module } from '@nestjs/common';
import { DocumentModule } from './questions/documents.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'static', 'uploads'),
      serveRoot: '/static',
    }),
    DocumentModule,
  ],
})
export class AppModule {}
