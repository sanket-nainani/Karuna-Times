process.env.NEXT_PUBLIC_SECURE_EC2_URL = 'https://karunatimes.org/api/v1';
module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/jest.browser.js'],
  modulePathIgnorePatterns: ['<rootDir>/cypress/']
};
