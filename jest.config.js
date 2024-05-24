const path = require('path');

function makeModuleNameMapper(tsconfigPath) {
    const { paths } = require(tsconfigPath).compilerOptions;
    const aliases = {};
    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '/(.*)');
        const path = paths[item][0].replace('/*', '/$1');
        aliases[key] = `<rootDir>/${path}`;
    });
    return aliases;
}

module.exports = {
    rootDir: path.resolve(__dirname, './'),
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: makeModuleNameMapper('./tsconfig.json'),
    modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    resetMocks: true,
    restoreMocks: true,
    clearMocks: true,
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: './reports',
            },
        ],
        [
            'jest-sonar',
            {
                outputDirectory: './reports',
            },
        ],
    ],
    collectCoverage: true,
    coverageThreshold: {
        global: {
            statements: 70,
            branches: 70,
            functions: 70,
            lines: 70,
        },
    },
    coverageDirectory: './reports',
    coverageReporters: ['text', 'clover', 'lcov', 'json-summary'],
    testPathIgnorePatterns: ['<rootDir>/src/*/*.spec.ts'],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!src/**/*.{module,model,dto}.{js,ts}',
        '!src/app/configs/app.config.ts',
        '!src/app/configs/db.config.ts',
        '!src/main.ts',
    ],
    testMatch: ['<rootDir>/tests/**/*.unit.ts'],
};