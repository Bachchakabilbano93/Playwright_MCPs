import { test, expect } from '@fixtures/index';
import { testData, errorMessages } from '@config/index';
import usersData from '@testdata/users.json';

/**
 * VWO Login - Negative Test Cases
 * Tests invalid login scenarios and error handling
 * @author Pramod Dutta - The Testing Academy
 * @tags @P0 @Login @Negative
 */
test.describe('VWO Login - Negative Test Cases @P0 @Login @Negative', () => {

    test.beforeEach(async ({ page }) => {
        // Clear cookies and storage before each test
        await page.context().clearCookies();
    });

    test('TC001: Should display error message for invalid credentials @P0', async ({ loginModule }) => {
        await test.step('Attempt login with invalid credentials', async () => {
            await loginModule.loginWithInvalidCredentials(
                usersData.invalidUser.email,
                usersData.invalidUser.password
            );
        });

        await test.step('Verify error message is displayed', async () => {
            await loginModule.verifyInvalidLoginError();
        });

        await test.step('Capture screenshot for evidence', async () => {
            await loginModule.captureEvidence('TC001-invalid-credentials-error');
        });
    });

    test('TC002: Should not submit with empty email field @P1', async ({ loginModule }) => {
        await test.step('Submit form with empty email', async () => {
            await loginModule.submitWithEmptyEmail('somepassword123');
        });

        await test.step('Verify user stays on login page', async () => {
            await loginModule.verifyStillOnLoginPage();
        });
    });

    test('TC003: Should not submit with empty password field @P1', async ({ loginModule }) => {
        await test.step('Submit form with empty password', async () => {
            await loginModule.submitWithEmptyPassword('dummyuser@test.com');
        });

        await test.step('Verify user stays on login page', async () => {
            await loginModule.verifyStillOnLoginPage();
        });
    });

    test('TC004: Should display error for invalid email format @P1', async ({ loginModule }) => {
        const invalidEmail = usersData.invalidEmailFormats[0];

        await test.step(`Submit form with invalid email: ${invalidEmail.description}`, async () => {
            await loginModule.loginWithInvalidCredentials(
                invalidEmail.email,
                invalidEmail.password
            );
        });

        await test.step('Verify error message is displayed', async () => {
            await loginModule.verifyInvalidLoginError();
        });
    });

    // Data-driven test for multiple invalid email formats
    for (const testCase of usersData.invalidEmailFormats.slice(1)) {
        test(`TC005: Invalid email format - ${testCase.description} @P2`, async ({ loginModule }) => {
            await test.step(`Submit form with: ${testCase.description}`, async () => {
                await loginModule.loginWithInvalidCredentials(
                    testCase.email,
                    testCase.password
                );
            });

            await test.step('Verify error or validation message', async () => {
                await loginModule.verifyInvalidLoginError();
            });
        });
    }

    test('TC006: SQL Injection attempt should fail @P0 @Security', async ({ loginModule }) => {
        await test.step('Attempt SQL injection login', async () => {
            await loginModule.loginWithInvalidCredentials(
                usersData.sqlInjection.email,
                usersData.sqlInjection.password
            );
        });

        await test.step('Verify login is rejected', async () => {
            await loginModule.verifyInvalidLoginError();
        });

        await test.step('Capture evidence', async () => {
            await loginModule.captureEvidence('TC006-sql-injection-blocked');
        });
    });

    test('TC007: XSS attempt should be handled safely @P0 @Security', async ({ loginModule }) => {
        await test.step('Attempt XSS injection in login', async () => {
            await loginModule.loginWithInvalidCredentials(
                usersData.xssAttempt.email,
                usersData.xssAttempt.password
            );
        });

        await test.step('Verify login is rejected', async () => {
            await loginModule.verifyInvalidLoginError();
        });

        await test.step('Capture evidence', async () => {
            await loginModule.captureEvidence('TC007-xss-blocked');
        });
    });

});
