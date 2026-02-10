/**
 * TypeScript type definitions for test data
 * @author Pramod Dutta - The Testing Academy
 */

export interface User {
    email: string;
    password: string;
}

export interface InvalidEmailTestCase {
    email: string;
    password: string;
    description: string;
}

export interface UsersTestData {
    validUser: User;
    invalidUser: User;
    emptyCredentials: User;
    invalidEmailFormats: InvalidEmailTestCase[];
    specialCharacterPasswords: InvalidEmailTestCase[];
    sqlInjection: User;
    xssAttempt: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    statusCode: number;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
}

export interface Order {
    id: string;
    products: Product[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}
