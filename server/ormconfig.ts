import "dotenv/config";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,

  // "entities": [
  //    //"../**/*.entity.{ts,js}"
  //    //"src/entity/**/*.ts",
  //    //"dist/src/entity/**/*{.js,.ts}"
  //    [__dirname + '/**/*.entity.{ts,js}',
  // ],
  entities:
    process.env.NODE_ENV === "dev" ? ["src/entity/**/*.ts"] : ["dist/src/entity/**/*{.js,.ts}"],
  migrations: [
    "src/migration/**/*.ts",
    // __dirname + '/migrations/**/*{.ts,.js}',
  ],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default config;
