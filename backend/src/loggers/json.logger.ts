import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(level: string, message: string) {
    return JSON.stringify({ level, message });
  }

  log(message: string) {
    console.log(this.formatMessage('log', message));
  }

  error(message: string) {
    console.error(this.formatMessage('error', message));
  }

  warn(message: string) {
    console.warn(this.formatMessage('warn', message));
  }

  debug(message: string) {
    console.debug(this.formatMessage('debug', message));
  }

  fatal(message: string) {
    console.error(this.formatMessage('fatal', message));
  }
}
