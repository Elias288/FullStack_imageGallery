import { Injectable } from '@nestjs/common';

const VERSION = '0.1.2';

@Injectable()
export class AppService {
  getVersion() {
    return 'version: ' + VERSION;
  }
}
