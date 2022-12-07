import { Controller, Get, Inject} from '@nestjs/common';
@Controller()
export class AppController {
    @Get()
    get(){
        return 'roadgram'
    }
}
