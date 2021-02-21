import * as dotenv from 'dotenv';
import * as fs from 'fs';

const environment: string = process.env.NODE_ENV || 'development';
const envPath = `.env.${environment}`
let data = process.env;

export default () => {
  try {
    if(fs.existsSync(envPath)) {
      data = dotenv.parse(fs.readFileSync(envPath));
    }
    return {
      environment: environment,
      port: parseInt(data.APP_PORT, 10) || 4000,
      database: {
        host: data.DATABASE_HOST,
        port: parseInt(data.DATABASE_PORT, 10),
        user: data.DATABASE_USER,
        password: data.DATABASE_PASSWORD,
        db: data.DATABASE_DB,
        poolSize: parseInt(data.DATABASE_POOL_SIZE, 10) || 10,
        synchronous: JSON.parse(data.DATABASE_SYNCHRONOUS) || false,
        logging: JSON.parse(data.DATABASE_LOGGING),
      },
      secret: data.SECRET,
      jwt: {
        accessTokenTime: data.ACCESS_TOKEN_TIME,
        refreshTokenTime: data.REFRESH_TOKEN_TIME
      }
    }   
  } catch (error) {
    console.error(error)
  }
}
