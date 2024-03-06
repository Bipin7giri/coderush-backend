import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserCredential } from "../users/UserCredential.entities";
import { User } from "../users/user.entity";
import { Role } from "../users/roles.entity";
import { Questions } from "../questions/question.entity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // Your local database host
  port: 5432, // Your local database port
  username: "postgres", // Your local database username
  password: "12345", // Your local database password
  database: "codeRush", // Your local database name
  synchronize: true,
  logging: false,
  entities: [UserCredential, User, Role,Questions],
  migrations: [],
  subscribers: [],
});
