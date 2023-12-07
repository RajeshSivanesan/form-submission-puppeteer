import { Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('form')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/submit')
  handleFormSubmission(): Promise<string> {
    return this.appService.postForm();
  }
}