"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvHelper = void 0;
class EnvHelper {
    static verifyNodeEnv() {
        if (process.env.NODE_ENV === undefined) {
            process.env.NODE_ENV = 'development';
        }
    }
    static getEnvFilePath() {
        var _a;
        return `.env.${(_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.toLowerCase()}`;
    }
}
exports.EnvHelper = EnvHelper;
//# sourceMappingURL=env.helper.js.map