import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FirebaseModule } from 'nestjs-firebase';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { UpperCaseDirective } from './common/directives/upperCase.directive';
import { LoggingPlugin } from './common/plugins/logging.plugin';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule.forRoot({
      googleApplicationCredential: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      schemaDirectives: {
        upper: UpperCaseDirective,
      },
      plugins: [],
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
