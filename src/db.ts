import { DataSource } from "typeorm";
import {User} from './database/User'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "login_node",
  synchronize: true,
  logging: true,
  entities: [User],
});