import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

/**
 * Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 * @author Pramod Dutta - The Testing Academy
 */
export default defineConfig({
    // Test directory
    testDir: './src/tests',

    // Run tests in parallel
    fullyParallel: true,

    // Fail build on test.only in CI
    forbidOnly: !!process.env.CI,

    // Retry failed tests
    retries: process.env.CI ? 2 : 0,

    // Number of workers
    workers: process.env.CI ? 1 : undefined,

    // Reporter configuration
    reporter: [
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }]
    ],

    // Shared settings for all projects
    use: {
        // Base URL
        baseURL: process.env.BASE_URL || 'https://app.vwo.com',

        // Collect trace on failure
        trace: 'on-first-retry',

        // Take screenshot on failure
        screenshot: 'only-on-failure',

        // Record video on failure
        video: 'retain-on-failure',

        // Viewport size
        viewport: { width: 1280, height: 720 },

        // Timeout for actions
        actionTimeout: 10000,

        // Ignore HTTPS errors
        ignoreHTTPSErrors: true,
    },

    // Global timeout for each test
    timeout: 60000,

    // Expect timeout
    expect: {
        timeout: 10000
    },

    // Output directory for test artifacts
    outputDir: 'test-results/',

    // Projects for different browsers
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        // Mobile viewports
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
    ],
});
