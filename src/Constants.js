const prod = {
  API_URL: 'https://prode-mundial-backend.herokuapp.com',
  // if prod testing env:
  // API_URL: 'http://localhost:8080',
};

const dev = {
  API_URL: 'http://localhost:8080',
};

// eslint-disable-next-line no-undef
const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
