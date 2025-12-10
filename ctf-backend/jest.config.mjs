export default {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  transform: {},
  extensionsToTreatAsEsm: [".js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1.js"
  }
};
