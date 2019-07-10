import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  constructor() {
    dotenv.config();
  }

  getAppPort() {
    return process.env.APP_PORT;
  }
}