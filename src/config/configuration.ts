export default () => ({
  node_env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 8880,
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 8890,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

export interface EnvironmentVariables {
  node_env: string;
  port: number;
  'db.host': string;
  'db.port': number;
  'db.user': string;
  'db.password': string;
  'db.database': string;
}
