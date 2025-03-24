import {JestConfigWithTsJest} from "ts-jest";
import tsconfig from "./tsconfig.json"

const cfg: JestConfigWithTsJest  = {
  testEnvironment: "node",
  roots: ['<rootDir>'],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverage: false,
};

export default cfg;