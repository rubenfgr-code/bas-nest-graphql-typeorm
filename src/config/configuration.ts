export default () => ({
  node_env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 8880,
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 8890,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: parseInt(process.env.DB_SYNCHRONIZE, 10) || 0,
  },
  graphql: {
    schemafile: process.env.GRAPHQL_SCHEMAFILE,
    sort_schema: parseInt(process.env.DB_SYNCHRONIZE, 10) || 1,
  },
});

export interface EnvironmentVariables {
  node_env: string;
  port: number;
  'db.type': string;
  'db.host': string;
  'db.port': number;
  'db.user': string;
  'db.password': string;
  'db.database': string;
  'db.synchronize': boolean;
  'graphql.schemafile': string;
  'graphql.sort_schema': string;
}
