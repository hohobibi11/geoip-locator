import * as geoip from 'geoip-lite';
import { IGeoIPService, IP, LookupResult } from './GeoIPLocator';

export class GeoIPLiteService implements IGeoIPService {
  async lookup(ip: IP): Promise<LookupResult> {
    const lookupResult = await geoip.lookup(ip);
    if (!lookupResult) return null;
    return {
      country: lookupResult.country,
      city: lookupResult.city,
      lat: lookupResult.ll?.[0],
      lng: lookupResult.ll?.[1],
    };
  }
}

export default GeoIPLiteService;
