const prod = {
  API_URL: '/api',
};

const dev = {
  API_URL: 'http://localhost:8080',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
