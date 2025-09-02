import { Page } from '@playwright/test';
import { FrameworkConfig } from '../types';
/**
 * Professional Authentication Helper
 * Handles various authentication flows including OAuth, SAML, and basic auth
 */
export declare class AuthenticationHelper {
    private page;
    private actionHelper;
    private waitHelper;
    private locatorHelper;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Perform OAuth authentication flow
     */
    authenticateWithOAuth(username: string, password: string): Promise<void>;
    /**
     * Perform basic authentication
     */
    authenticateBasic(username: string, password: string): Promise<void>;
    /**
     * Handle Microsoft OAuth flow
     */
    authenticateWithMicrosoft(username: string, password: string): Promise<void>;
    /**
     * Handle Google OAuth flow
     */
    authenticateWithGoogle(username: string, password: string): Promise<void>;
    /**
     * Handle two-factor authentication
     */
    handleTwoFactorAuth(code: string): Promise<void>;
    /**
     * Save authentication session
     */
    saveAuthSession(sessionName?: string): Promise<void>;
    /**
     * Load authentication session
     */
    loadAuthSession(sessionName?: string): Promise<boolean>;
    /**
     * Check if user is authenticated
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * Logout user
     */
    logout(): Promise<void>;
    /**
     * Clear authentication session
     */
    clearAuthSession(): Promise<void>;
    /**
     * Wait for authentication to complete
     */
    private waitForAuthenticationComplete;
    /**
     * Wait for logout to complete
     */
    private waitForLogoutComplete;
    /**
     * Handle authentication errors
     */
    handleAuthError(): Promise<string | null>;
    /**
     * Retry authentication with different credentials
     */
    retryAuthentication(username: string, password: string, maxRetries?: number): Promise<boolean>;
}
//# sourceMappingURL=AuthenticationHelper.d.ts.map