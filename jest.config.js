module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironmentOptions: {
        'jest-playwright': {
            browsers: ['chromium', 'firefox', 'webkit'],
            launchOptions: {
                headless: true,
            },
        },
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testMatch: ['**/*.test.ts', '**/*.spec.ts'],
    testTimeout: 20000,
};
