import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from './config.service';
import { eventNames } from 'cluster';

describe('ConfigService', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();
  });

  describe('APP_PORT', () => {
    it('should return APP_PORT' +process.env.APP_PORT, () => {
      const appService = app.get<ConfigService>(ConfigService);
      expect(appService.getAppPort()).toBe('3000');
    });
  });

});