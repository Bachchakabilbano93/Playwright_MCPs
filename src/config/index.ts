/**
 * Configuration & Environment Variables
 * @author Pramod Dutta - The Testing Academy
 */

export const config = {
    // Base URLs
    baseUrl: process.env.BASE_URL || 'https://app.vwo.com',

    // Timeouts
    defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    apiTimeout: parseInt(process.env.API_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '60000'),

    // Credentials (for development only - use env vars in CI)
    testUser: {
        email: process.env.TEST_USERNAME || 'testuser@example.com',
        password: process.env.TEST_PASSWORD || 'testpass123'
    },

    // API Configuration
    api: {
        baseUrl: process.env.API_BASE_URL || 'https://api.vwo.com',
        version: 'v1'
    },

    // Browser Configuration
    browser: {
        headless: process.env.HEADLESS !== 'false',
        slowMo: parseInt(process.env.SLOW_MO || '0'),
        viewport: {
            width: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
            height: parseInt(process.env.VIEWPORT_HEIGHT || '720')
        }
    },

    // Logging
    logLevel: process.env.LOG_LEVEL || 'INFO',

    // Retry Configuration
    retries: parseInt(process.env.RETRIES || '0'),

    // Screenshot & Video
    screenshot: process.env.SCREENSHOT || 'only-on-failure',
    video: process.env.VIDEO || 'retain-on-failure',
    trace: process.env.TRACE || 'on-first-retry'
};

// Test Data Constants
export const testData = {
    invalidCredentials: {
        email: 'dummyuser@test.com',
        password: 'dummypassword123'
    },
    invalidEmailFormats: [
        'no-at-sign.com',
        '@no-local-part.com',
        'multiple@@at.com',
        'no.domain@',
        'spaces in@email.com'
    ]
};

// Error Messages
export const errorMessages = {
    invalidLogin: 'Your email, password, IP address or location did not match',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address'
};
