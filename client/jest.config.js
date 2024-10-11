module.exports = {
    testEnvironment: 'jsdom', // for React testing
    transform: {
      "^.+\\.jsx?$": "babel-jest", // transpile JS files
    },
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy" // if you use CSS modules
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)", // Include axios to be transformed
    ],
  };
  