import { Injectable } from '@nestjs/common';

const VERSION = '0.1.1';

@Injectable()
export class AppService {
  getVersion() {
    return 'version: ' + VERSION;
  }
}
