import { Controller, Get } from '@nestjs/common';

@Controller('config')
export class ConfigController {
  @Get()
    getConfig() {
    // console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY);
    return { googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY };
    }
}
