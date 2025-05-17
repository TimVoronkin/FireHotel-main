export class TrackNumberGenerator {
  generate(): string {
    return `TFB-${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')}`;
  }
}
