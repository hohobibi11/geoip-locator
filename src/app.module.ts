import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeoIPLocatorModule } from '../lib/geoip-locator/GeoIPLocatorModule';

@Module({
  imports: [GeoIPLocatorModule.forRootAsync()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
