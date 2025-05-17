"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackNumberGenerator = void 0;
class TrackNumberGenerator {
    generate() {
        return `TFB-${Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0')}`;
    }
}
exports.TrackNumberGenerator = TrackNumberGenerator;
//# sourceMappingURL=trackNumberGenerator.js.map