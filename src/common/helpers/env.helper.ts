export class EnvHelper {
  static verifyNodeEnv(): void {
    if (process.env.NODE_ENV === undefined) {
      process.env.NODE_ENV = 'production';
    }
  }

  static getEnvFilePath(): string {
    return `.env.${process.env.NODE_ENV?.toLowerCase()}`;
  }
}
