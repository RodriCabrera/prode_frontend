const prod = {
  API_URL: 'https://prode-mundial-backend.herokuapp.com',
};

const dev = {
  API_URL: 'http://localhost:8080',
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
