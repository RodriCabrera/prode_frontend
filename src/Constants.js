const prod = {
  API_URL: 'http://localhost:8080',
  // Since we want to always aim to local BE, this one wont be used in test branch: https://prode-mundial-backend.herokuapp.com
};

const dev = {
  API_URL: 'http://localhost:8080',
};

// eslint-disable-next-line no-undef
const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
