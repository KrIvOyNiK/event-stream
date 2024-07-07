import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    setTimeout(() => {
      this.appService.getHello();
    }, 2000);
  }

  @Get()
  getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
