export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  transform: {}, // needed because you're not using Babel or TS
};
