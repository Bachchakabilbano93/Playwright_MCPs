import { Page, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { Logger } from '@utils/Logger';
import { errorMessages } from '@config/index';

/**
 * Login Module - Business Logic Layer
 * Layer 2: Orchestrates Page actions, contains business logic
 * @author Pramod Dutta - The Testing Academy
 */
export class LoginModule {
    private page: Page;
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    /**
     * Navigate to login page and verify it loaded
     */
    async navigateToLogin(): Promise<void> {
        Logger.step(1, 'Navigate to VWO login page', 'LoginModule');
        await this.loginPage.navigate();
        await expect(this.page).toHaveTitle(/Login - VWO/);
    }

    /**
     * Perform login with provided credentials
     */
    async login(email: string, password: string): Promise<void> {
        Logger.step(2, 'Enter credentials', 'LoginModule');
        await this.loginPage.enterEmail(email);
        await this.loginPage.enterPassword(password);

        Logger.step(3, 'Click Sign In button', 'LoginModule');
        await this.loginPage.clickSignIn();
    }

    /**
     * Attempt login with invalid credentials and verify error
     */
    async loginWithInvalidCredentials(email: string, password: string): Promise<void> {
        await this.navigateToLogin();
        await this.login(email, password);

        Logger.step(4, 'Wait for error response', 'LoginModule');
        await this.page.waitForTimeout(3000);
    }

    /**
     * Verify invalid login error message is displayed
     */
    async verifyInvalidLoginError(): Promise<void> {
        Logger.step(5, 'Verify error message is displayed', 'LoginModule');
        await expect(this.loginPage.errorMessage()).toBeVisible();

        const errorText = await this.loginPage.getErrorMessageText();
        expect(errorText).toContain(errorMessages.invalidLogin);
        Logger.info(`Error message verified: "${errorText}"`, 'LoginModule');
    }

    /**
     * Attempt to submit empty email field
     */
    async submitWithEmptyEmail(password: string): Promise<void> {
        await this.navigateToLogin();

        Logger.step(2, 'Enter password only (empty email)', 'LoginModule');
        await this.loginPage.enterPassword(password);

        Logger.step(3, 'Click Sign In button', 'LoginModule');
        await this.loginPage.clickSignIn();

        await this.page.waitForTimeout(2000);
    }

    /**
     * Attempt to submit empty password field
     */
    async submitWithEmptyPassword(email: string): Promise<void> {
        await this.navigateToLogin();

        Logger.step(2, 'Enter email only (empty password)', 'LoginModule');
        await this.loginPage.enterEmail(email);

        Logger.step(3, 'Click Sign In button', 'LoginModule');
        await this.loginPage.clickSignIn();

        await this.page.waitForTimeout(2000);
    }

    /**
     * Verify user stays on login page
     */
    async verifyStillOnLoginPage(): Promise<void> {
        Logger.step(4, 'Verify user stays on login page', 'LoginModule');
        await expect(this.page).toHaveURL(/login/);
    }

    /**
     * Take screenshot for evidence
     */
    async captureEvidence(name: string): Promise<void> {
        Logger.info(`Capturing screenshot: ${name}`, 'LoginModule');
        await this.loginPage.takeScreenshot(name);
    }

    /**
     * Complete negative login test flow
     */
    async performNegativeLoginTest(email: string, password: string): Promise<void> {
        await this.loginWithInvalidCredentials(email, password);
        await this.verifyInvalidLoginError();
        await this.captureEvidence('vwo-negative-login-error');
    }
}
