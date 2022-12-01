import { Logger as WinstonLogger } from 'winston'
import { Controller, Get, Inject} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
@Controller()
export class AppController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    ) {}
    @Get()
    get(){
        this.logger.info('info')
        this.logger.error('error')
        this.logger.warn('warn')
        this.logger.http('http')
        this.logger.verbose('verbose')
        this.logger.debug('debug')
        this.logger.silly('silly')
        return 'roadgram'
    }
}
