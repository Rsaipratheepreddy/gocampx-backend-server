import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }




  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }


  public getGoogleClientId(): string {
    return this.getValue('GOOGLE_CLIENT_ID', true);
  }

  public getGoogleClientSecret(): string {
    return this.getValue('GOOGLE_CLIENT_SECRET', true);
  }

  public getGoogleCallbackURL(): string {
    return this.getValue('GOOGLE_CALLBACK_URL', true);
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      entities: [`${__dirname}/../**/entities/*.entity{.ts,.js}`],

      migrationsTableName: 'migration',

      migrations: [`${__dirname}/../migrations/*{.ts,.js}`],

      ssl: this.isProduction(),
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_CALLBACK_URL',
    'PORT',
    'MODE',
  ]);

export { configService };
export default new DataSource(configService.getTypeOrmConfig() as DataSourceOptions) 