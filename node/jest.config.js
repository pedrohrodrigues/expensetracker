module.exports = {
  preset: 'ts-jest', // Use ts-jest to transpile TypeScript files
  testEnvironment: 'node', // Set the test environment to Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Supported extensions
}
