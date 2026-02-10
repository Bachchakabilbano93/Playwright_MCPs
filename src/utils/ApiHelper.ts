import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from './Logger';

interface ApiRequestOptions {
    headers?: Record<string, string>;
    data?: unknown;
    params?: Record<string, string>;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
}

/**
 * HTTP request helper with retry logic
 * @author Pramod Dutta - The Testing Academy
 */
export class ApiHelper {
    private request: APIRequestContext;
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(request: APIRequestContext, baseUrl: string = '', defaultHeaders: Record<string, string> = {}) {
        this.request = request;
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
    }

    private async executeWithRetry<T>(
        operation: () => Promise<T>,
        retries: number = 3,
        retryDelay: number = 1000
    ): Promise<T> {
        let lastError: Error | null = null;

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error as Error;
                Logger.warn(`Attempt ${attempt}/${retries} failed: ${lastError.message}`, 'ApiHelper');

                if (attempt < retries) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                }
            }
        }

        throw lastError;
    }

    /**
     * Make GET request
     */
    async get(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        Logger.debug(`GET ${url}`, 'ApiHelper');

        return this.executeWithRetry(
            () => this.request.get(url, {
                headers: { ...this.defaultHeaders, ...options.headers },
                params: options.params,
                timeout: options.timeout
            }),
            options.retries,
            options.retryDelay
        );
    }

    /**
     * Make POST request
     */
    async post(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        Logger.debug(`POST ${url}`, 'ApiHelper');

        return this.executeWithRetry(
            () => this.request.post(url, {
                headers: { ...this.defaultHeaders, ...options.headers },
                data: options.data,
                timeout: options.timeout
            }),
            options.retries,
            options.retryDelay
        );
    }

    /**
     * Make PUT request
     */
    async put(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        Logger.debug(`PUT ${url}`, 'ApiHelper');

        return this.executeWithRetry(
            () => this.request.put(url, {
                headers: { ...this.defaultHeaders, ...options.headers },
                data: options.data,
                timeout: options.timeout
            }),
            options.retries,
            options.retryDelay
        );
    }

    /**
     * Make PATCH request
     */
    async patch(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        Logger.debug(`PATCH ${url}`, 'ApiHelper');

        return this.executeWithRetry(
            () => this.request.patch(url, {
                headers: { ...this.defaultHeaders, ...options.headers },
                data: options.data,
                timeout: options.timeout
            }),
            options.retries,
            options.retryDelay
        );
    }

    /**
     * Make DELETE request
     */
    async delete(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        Logger.debug(`DELETE ${url}`, 'ApiHelper');

        return this.executeWithRetry(
            () => this.request.delete(url, {
                headers: { ...this.defaultHeaders, ...options.headers },
                timeout: options.timeout
            }),
            options.retries,
            options.retryDelay
        );
    }

    /**
     * Set authorization header
     */
    setAuthToken(token: string): void {
        this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    /**
     * Clear authorization header
     */
    clearAuthToken(): void {
        delete this.defaultHeaders['Authorization'];
    }
}
