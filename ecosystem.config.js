module.exports = {
  apps: [
    {
      name: 'ama-bittonik',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3050',
      instances: 'max',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3050,
      },
      max_memory_restart: '800M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      autorestart: true,
    },
  ],
};
