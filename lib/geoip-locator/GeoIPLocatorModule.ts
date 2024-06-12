import { DynamicModule, Module } from '@nestjs/common';
import GeoIPLocator, { IGeoIPService } from './GeoIPLocator';

@Module({})
export class GeoIPLocatorModule {
  static forRootAsync(geoIpService?: IGeoIPService): DynamicModule {
    return {
      module: GeoIPLocatorModule,
      providers: [
        {
          provide: GeoIPLocator,
          useFactory: async (): Promise<GeoIPLocator> =>
            GeoIPLocator.create(geoIpService),
        },
      ],
      exports: [GeoIPLocator],
    };
  }
}

export default GeoIPLocatorModule;
