module.exports = {
  apps: [
    {
      name: 'server',
      script: 'src/index.js',
      vizion: false,
      watch: true,
      ignore_watch: ['node_modules', 'README.md'],
      watch_options: {
        followSymlinks: false,
        usePolling: true,
      },
      env_development: {
        NODE_ENV: 'development',
        API_URL: 'http://localhost:4000/api/v1',
        DATABASE_URI: 'process.env.DATABASE_URI',
      },
      env_production: {
        NODE_ENV: 'production',
        API_URL: 'https://api.production.example.com',
        DATABASE_URI: 'process.env.DATABASE_URI',
      },
    },
  ],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
