module.exports = {
  transform: {
    '^.+\\.(tsx?|jsx?)$': `<rootDir>/config/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/config/__mocks__/file-mocks.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/config/loadershim.js`],
  setupFilesAfterEnv: ['<rootDir>/config/setup-test-env.js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(jsx?|tsx?)$',
};
