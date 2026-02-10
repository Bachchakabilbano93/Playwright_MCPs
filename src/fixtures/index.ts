import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { LoginModule } from '@modules/LoginModule';
import { WaitHelper } from '@utils/WaitHelper';

/**
 * Custom Playwright Fixtures
 * Provides page objects and modules to all tests
 * @author Pramod Dutta - The Testing Academy
 */

// Define custom fixture types
type CustomFixtures = {
    // Page Objects
    loginPage: LoginPage;

    // Modules
    loginModule: LoginModule;

    // Utilities
    waitHelper: WaitHelper;
};

// Export extended test with custom fixtures
export const test = base.extend<CustomFixtures>({
    // Login Page fixture
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // Login Module fixture
    loginModule: async ({ page }, use) => {
        const loginModule = new LoginModule(page);
        await use(loginModule);
    },

    // Wait Helper fixture
    waitHelper: async ({ page }, use) => {
        const waitHelper = new WaitHelper(page);
        await use(waitHelper);
    }
});

// Export expect from base
export { expect } from '@playwright/test';
