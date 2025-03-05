import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: string,
    ...optionalParams: any[]
  ) {
    let optionalParamsString = '';
    if (optionalParams) {
      optionalParamsString = optionalParams
        .map((param, index) => `param${index + 1}=${JSON.stringify(param)}`)
        .join('\t');
    }

    return optionalParams.length > 0
      ? `${level}=${message}\t${optionalParamsString}`
      : `${level}=${message}`;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }
}
