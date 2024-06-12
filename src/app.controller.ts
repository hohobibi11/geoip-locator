import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LookupResult } from '../lib/geoip-locator/GeoIPLocator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getLocationByIP(@Query('ip') ip: string): Promise<LookupResult> {
    return this.appService.getLocationByIP(ip);
  }
}
