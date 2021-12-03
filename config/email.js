
require('dotenv').config();

module.exports = {
  development: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_API_DOMAIN,
    from_name: process.env.MAILGUN_FROM_NAME,
    to_test_email: process.env.MAILGUN_TO_TEST_EMAIL,
  },
  production: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_API_DOMAIN,
    from_name: process.env.MAILGUN_FROM_NAME,
    to_test_email: null,
  },
};
