import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  GeoIPLocator,
  InvalidIPException,
  IPLocationNotFoundException,
  LookupResult,
} from '../lib/geoip-locator/GeoIPLocator';

@Injectable()
export class AppService {
  constructor(private locator: GeoIPLocator) {}

  async getLocationByIP(ip: string): Promise<LookupResult> {
    try {
      return await this.locator.lookup(ip);
    } catch (error) {
      if (error instanceof InvalidIPException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof IPLocationNotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }
}
