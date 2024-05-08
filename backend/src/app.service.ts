import { Injectable } from '@nestjs/common';

const VERSION = '0.0.6';

@Injectable()
export class AppService {
  getVersion() {
    return 'version: ' + VERSION;
  }
}
