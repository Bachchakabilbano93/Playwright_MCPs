import { Page, Locator } from '@playwright/test';
import { Logger } from '@utils/Logger';

/**
 * VWO Login Page - Page Object Model
 * Layer 1: Locators (arrow functions) & simple UI actions only
 * @author Pramod Dutta - The Testing Academy
 */
export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // ========== LOCATORS (Arrow Functions) ==========

    emailInput = (): Locator => this.page.getByRole('textbox', { name: 'Email address' });

    passwordInput = (): Locator => this.page.getByRole('textbox', { name: 'Password' });

    signInButton = (): Locator => this.page.getByRole('button', { name: 'Sign in', exact: true });

    forgotPasswordLink = (): Locator => this.page.getByRole('button', { name: 'Forgot Password?' });

    rememberMeCheckbox = (): Locator => this.page.locator('[class*="remember"]');

    googleSignInButton = (): Locator => this.page.getByRole('button', { name: 'Sign in with Google' });

    ssoSignInButton = (): Locator => this.page.getByRole('button', { name: 'Sign in using SSO' });

    passkeySignInButton = (): Locator => this.page.getByRole('button', { name: 'Sign in with Passkey' });

    errorMessage = (): Locator => this.page.getByText('Your email, password, IP address or location did not match');

    startFreeTrialLink = (): Locator => this.page.getByRole('link', { name: 'Start a free trial' });

    togglePasswordVisibility = (): Locator => this.page.getByRole('button', { name: 'Toggle password visibility' });

    // ========== SIMPLE UI ACTIONS ==========

    async navigate(): Promise<void> {
        Logger.pageAction('Navigate', 'Login Page', 'LoginPage');
        await this.page.goto('https://app.vwo.com');
    }

    async enterEmail(email: string): Promise<void> {
        Logger.pageAction('Fill', `Email: ${email}`, 'LoginPage');
        await this.emailInput().fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        Logger.pageAction('Fill', 'Password: ****', 'LoginPage');
        await this.passwordInput().fill(password);
    }

    async clickSignIn(): Promise<void> {
        Logger.pageAction('Click', 'Sign In Button', 'LoginPage');
        await this.signInButton().click();
    }

    async clickForgotPassword(): Promise<void> {
        Logger.pageAction('Click', 'Forgot Password Link', 'LoginPage');
        await this.forgotPasswordLink().click();
    }

    async clickGoogleSignIn(): Promise<void> {
        Logger.pageAction('Click', 'Google Sign In Button', 'LoginPage');
        await this.googleSignInButton().click();
    }

    async togglePasswordVisibilityButton(): Promise<void> {
        Logger.pageAction('Click', 'Toggle Password Visibility', 'LoginPage');
        await this.togglePasswordVisibility().click();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage().isVisible();
    }

    async getErrorMessageText(): Promise<string> {
        return await this.errorMessage().textContent() || '';
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `test-results/${name}.png` });
    }
}
