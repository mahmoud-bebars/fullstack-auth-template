import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return HttpException.createBody({ message: 'Hello World!' });
  }
}
