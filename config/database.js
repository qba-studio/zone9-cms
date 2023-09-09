module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env('DATABASE_PORT', '5432'),
      database: env('DATABASE_NAME', 'zone9-cms'),
      user: env('DATABASE_USER'),
      password: env('DATABASE_PASSWORD'),
    },
    debug: false,
  },
});
