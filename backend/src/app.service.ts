import { Injectable } from '@nestjs/common';

const VERSION = '0.1.0';

@Injectable()
export class AppService {
  getVersion() {
    return 'version: ' + VERSION;
  }
}
