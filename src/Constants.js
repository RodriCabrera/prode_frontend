const prod = {
  // fly
  // API_URL: "https://prode-backend.fly.dev",
  // heroku:
  API_URL: "https://prode-mundial-backend.herokuapp.com",
  FS_ENVIRONMENT_ID: "MSYvuxKL5fzL3ezdQUjic4",
  // if prod testing env:
  // API_URL: 'http://localhost:8080',
};

const dev = {
  API_URL: "http://localhost:8080",
  FS_ENVIRONMENT_ID: "oMxSbmyCNm65oRQYZBUWq2",
};

// eslint-disable-next-line no-undef
const config = process.env.NODE_ENV === "production" ? prod : dev;

export default config;
