import { PlaywrightTestConfig } from '@playwright/test';
import { baseUrls } from './test-data/baseurls';

export const env = process.env.ENV || 'prod';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: baseUrls[env],
        screenshot: 'only-on-failure'
    },
};

export default config;
