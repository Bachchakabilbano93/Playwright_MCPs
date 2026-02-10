import { Page, expect } from '@playwright/test';
import { Logger } from './Logger';

/**
 * Custom wait conditions for robust test automation
 * @author Pramod Dutta - The Testing Academy
 */
export class WaitHelper {
    private page: Page;
    private defaultTimeout: number;

    constructor(page: Page, defaultTimeout: number = 30000) {
        this.page = page;
        this.defaultTimeout = defaultTimeout;
    }

    /**
     * Wait for element to be visible
     */
    async waitForVisible(selector: string, timeout?: number): Promise<void> {
        Logger.debug(`Waiting for element to be visible: ${selector}`, 'WaitHelper');
        await this.page.locator(selector).waitFor({
            state: 'visible',
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for element to be hidden
     */
    async waitForHidden(selector: string, timeout?: number): Promise<void> {
        Logger.debug(`Waiting for element to be hidden: ${selector}`, 'WaitHelper');
        await this.page.locator(selector).waitFor({
            state: 'hidden',
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for text to appear on page
     */
    async waitForText(text: string, timeout?: number): Promise<void> {
        Logger.debug(`Waiting for text: "${text}"`, 'WaitHelper');
        await expect(this.page.getByText(text)).toBeVisible({
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for URL to contain specific path
     */
    async waitForUrl(urlPattern: string | RegExp, timeout?: number): Promise<void> {
        Logger.debug(`Waiting for URL pattern: ${urlPattern}`, 'WaitHelper');
        await this.page.waitForURL(urlPattern, {
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for network idle state
     */
    async waitForNetworkIdle(timeout?: number): Promise<void> {
        Logger.debug('Waiting for network idle', 'WaitHelper');
        await this.page.waitForLoadState('networkidle', {
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for DOM content loaded
     */
    async waitForDomContentLoaded(timeout?: number): Promise<void> {
        Logger.debug('Waiting for DOM content loaded', 'WaitHelper');
        await this.page.waitForLoadState('domcontentloaded', {
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Wait for specific response
     */
    async waitForResponse(urlPattern: string | RegExp, timeout?: number): Promise<void> {
        Logger.debug(`Waiting for response: ${urlPattern}`, 'WaitHelper');
        await this.page.waitForResponse(urlPattern, {
            timeout: timeout || this.defaultTimeout
        });
    }

    /**
     * Custom wait with polling
     */
    async waitForCondition(
        condition: () => Promise<boolean>,
        options: { timeout?: number; interval?: number; message?: string } = {}
    ): Promise<void> {
        const { timeout = this.defaultTimeout, interval = 500, message = 'Condition not met' } = options;
        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            if (await condition()) {
                return;
            }
            await this.page.waitForTimeout(interval);
        }

        throw new Error(`Timeout: ${message}`);
    }
}
