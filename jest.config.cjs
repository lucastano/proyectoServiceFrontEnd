module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: [
      "<rootDir>/setupTests.js"
    ],
    transformIgnorePatterns: [
      "<rootDir>/node_modules/(?!keep-react)"
    ],
    testMatch: [
      '**/?(*.)+(test).[jt]s?(x)'
    ],
  };