import { APIRequestContext } from '@playwright/test';
import { ApiHelper } from '@utils/ApiHelper';
import { Logger } from '@utils/Logger';

/**
 * Authentication API methods
 * @author Pramod Dutta - The Testing Academy
 */
export class AuthApi {
    private api: ApiHelper;

    constructor(request: APIRequestContext, baseUrl: string = '') {
        this.api = new ApiHelper(request, baseUrl);
    }

    /**
     * Login via API
     */
    async login(email: string, password: string): Promise<{ token: string; user: unknown }> {
        Logger.info(`API Login: ${email}`, 'AuthApi');
        const response = await this.api.post('/auth/login', {
            data: { email, password }
        });

        const data = await response.json();

        if (response.ok()) {
            this.api.setAuthToken(data.token);
        }

        return data;
    }

    /**
     * Logout via API
     */
    async logout(): Promise<void> {
        Logger.info('API Logout', 'AuthApi');
        await this.api.post('/auth/logout');
        this.api.clearAuthToken();
    }

    /**
     * Get current user
     */
    async getCurrentUser(): Promise<unknown> {
        Logger.info('Get current user', 'AuthApi');
        const response = await this.api.get('/auth/me');
        return await response.json();
    }

    /**
     * Refresh token
     */
    async refreshToken(refreshToken: string): Promise<{ token: string }> {
        Logger.info('Refresh token', 'AuthApi');
        const response = await this.api.post('/auth/refresh', {
            data: { refreshToken }
        });
        return await response.json();
    }

    /**
     * Register new user
     */
    async register(userData: { email: string; password: string; name: string }): Promise<unknown> {
        Logger.info(`API Register: ${userData.email}`, 'AuthApi');
        const response = await this.api.post('/auth/register', {
            data: userData
        });
        return await response.json();
    }
}
