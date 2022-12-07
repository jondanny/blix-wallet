import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
export declare class AppBootstrapManager {
    static getTestingModule(): Promise<TestingModule>;
    static setAppDefaults(app: INestApplication): INestApplication;
}
