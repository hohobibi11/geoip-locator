import { isIP } from 'net';

export type LookupResult = {
  country?: string;
  city?: string;
  lat?: number;
  lng?: number;
};
export type IP = string;
export interface IGeoIPService {
  lookup: (ip: IP) => Promise<LookupResult | null>;
}

export class IPLocationNotFoundException extends Error {
  public readonly errorCode: number;

  constructor(message?: string, errorCode?: number) {
    super(message ?? 'IP Location not found');
    this.errorCode = errorCode ?? 404;
    Object.setPrototypeOf(this, IPLocationNotFoundException.prototype);
  }
}
export class InvalidIPException extends Error {
  public readonly errorCode: number;

  constructor(message?: string, errorCode?: number) {
    super(message ?? 'Invalid IP format');
    this.errorCode = errorCode ?? 404;
    Object.setPrototypeOf(this, InvalidIPException.prototype);
  }
}

export class GeoIPLocator {
  private constructor(private geoIpService: IGeoIPService) {}

  /**
   * Factory method to create a GeoIPLocator, providing your own strategy for GeoIP lookup
   * with `geoip-lite` being the default strategy.
   * @param geoIpService GeoIP lookup strategy
   */
  static async create(geoIpService?: IGeoIPService): Promise<GeoIPLocator> {
    let service = geoIpService;
    if (!service) {
      const GeoIPLiteService = (await import('./GeoIPLiteService')).default;
      service = new GeoIPLiteService();
    }
    return new GeoIPLocator(service);
  }

  /**
   * Lookup the ip geo location
   * @param ip the ip to lookup
   * @throws {InvalidIPException} if the input ip is an invalid ip address
   * @throws {IPLocationNotFoundException} if the ip geo location could not be found
   */
  async lookup(ip: IP): Promise<LookupResult> {
    if (!isIP(ip)) throw new InvalidIPException();
    const lookupResult = await this.geoIpService.lookup(ip);
    if (!lookupResult) throw new IPLocationNotFoundException();
    return lookupResult;
  }
}

export default GeoIPLocator;
