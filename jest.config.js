module.exports = {
  bail: 1,

  clearMocks: true,

  collectCoverage: true,

  //collectCoverageFrom: ["src/app/**/*.js"],
  collectCoverageFrom: ["src/app/controllers/*.js", "src/app/models/*.js"],

  coverageDirectory: "__tests__/covarage",

  coverageReporters: ["text", "lcov"],

  preset: "ts-jest",

  testEnvironment: "node",

  testMatch: ["**/__tests__/**/*.test.js"],

  transform: {
    ".(js|jsx|ts|tsx)": "@sucrase/jest-plugin",
  },
};
