"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationHelper = void 0;
const ActionHelper_1 = require("./ActionHelper");
const WaitHelper_1 = require("./WaitHelper");
const LocatorHelper_1 = require("./LocatorHelper");
/**
 * Professional Authentication Helper
 * Handles various authentication flows including OAuth, SAML, and basic auth
 */
class AuthenticationHelper {
    constructor(page, config = {}) {
        this.page = page;
        this.actionHelper = new ActionHelper_1.ActionHelper(page, config);
        this.waitHelper = new WaitHelper_1.WaitHelper(page, config);
        this.locatorHelper = new LocatorHelper_1.LocatorHelper(page);
    }
    /**
     * Perform OAuth authentication flow
     */
    async authenticateWithOAuth(username, password) {
        // Wait for OAuth login form
        await this.waitHelper.waitForVisible('input[type="email"], input[name="username"], #username');
        // Fill username
        const usernameField = this.locatorHelper.getLocator('input[type="email"], input[name="username"], #username');
        await this.actionHelper.fillInputByLabel('Username', username);
        // Fill password
        await this.actionHelper.fillInputByLabel('Password', password);
        // Click login button
        await this.actionHelper.clickButtonByText('Sign in');
        // Wait for authentication to complete
        await this.waitForAuthenticationComplete();
    }
    /**
     * Perform basic authentication
     */
    async authenticateBasic(username, password) {
        // Fill username
        await this.actionHelper.fillInputByLabel('Username', username);
        // Fill password
        await this.actionHelper.fillInputByLabel('Password', password);
        // Click login button
        await this.actionHelper.clickButtonByText('Login');
        // Wait for authentication to complete
        await this.waitForAuthenticationComplete();
    }
    /**
     * Handle Microsoft OAuth flow
     */
    async authenticateWithMicrosoft(username, password) {
        // Wait for Microsoft login page
        await this.waitHelper.waitForVisible('input[type="email"]');
        // Enter email
        await this.actionHelper.fill('input[type="email"]', username);
        await this.actionHelper.clickButtonByText('Next');
        // Wait for password field
        await this.waitHelper.waitForVisible('input[type="password"]');
        // Enter password
        await this.actionHelper.fill('input[type="password"]', password);
        await this.actionHelper.clickButtonByText('Sign in');
        // Handle "Stay signed in?" prompt
        try {
            await this.waitHelper.waitForVisible('input[type="submit"][value="Yes"]', 5000);
            await this.actionHelper.click('input[type="submit"][value="Yes"]');
        }
        catch {
            // Prompt might not appear, continue
        }
        await this.waitForAuthenticationComplete();
    }
    /**
     * Handle Google OAuth flow
     */
    async authenticateWithGoogle(username, password) {
        // Wait for Google login page
        await this.waitHelper.waitForVisible('input[type="email"]');
        // Enter email
        await this.actionHelper.fill('input[type="email"]', username);
        await this.actionHelper.clickButtonByText('Next');
        // Wait for password field
        await this.waitHelper.waitForVisible('input[type="password"]');
        // Enter password
        await this.actionHelper.fill('input[type="password"]', password);
        await this.actionHelper.clickButtonByText('Next');
        await this.waitForAuthenticationComplete();
    }
    /**
     * Handle two-factor authentication
     */
    async handleTwoFactorAuth(code) {
        // Wait for 2FA code input
        await this.waitHelper.waitForVisible('input[name="code"], input[type="text"][placeholder*="code"]');
        // Enter 2FA code
        const codeField = this.locatorHelper.getLocator('input[name="code"], input[type="text"][placeholder*="code"]');
        await this.actionHelper.fillInputByLabel('Code', code);
        // Submit 2FA
        await this.actionHelper.clickButtonByText('Verify');
        await this.waitForAuthenticationComplete();
    }
    /**
     * Save authentication session
     */
    async saveAuthSession(sessionName = 'auth-session') {
        const storageState = await this.page.context().storageState();
        // Save to file or environment variable
        process.env[`AUTH_SESSION_${sessionName.toUpperCase()}`] = JSON.stringify(storageState);
    }
    /**
     * Load authentication session
     */
    async loadAuthSession(sessionName = 'auth-session') {
        try {
            const sessionData = process.env[`AUTH_SESSION_${sessionName.toUpperCase()}`];
            if (sessionData) {
                const storageState = JSON.parse(sessionData);
                await this.page.context().addCookies(storageState.cookies);
                // Set localStorage and sessionStorage
                await this.page.evaluate((storage) => {
                    storage.origins.forEach((origin) => {
                        origin.localStorage.forEach((item) => {
                            localStorage.setItem(item.name, item.value);
                        });
                        origin.sessionStorage.forEach((item) => {
                            sessionStorage.setItem(item.name, item.value);
                        });
                    });
                }, storageState);
                return true;
            }
        }
        catch (error) {
            console.warn('Failed to load auth session:', error);
        }
        return false;
    }
    /**
     * Check if user is authenticated
     */
    async isAuthenticated() {
        try {
            // Check for common authentication indicators
            const authIndicators = [
                '[data-testid="user-menu"]',
                '.user-profile',
                '.logout-button',
                '[aria-label*="user"]',
                '.dashboard',
                '.authenticated'
            ];
            for (const indicator of authIndicators) {
                if (await this.locatorHelper.getLocator(indicator).isVisible()) {
                    return true;
                }
            }
            // Check URL for authenticated paths
            const currentUrl = this.page.url();
            const authenticatedPaths = ['/dashboard', '/home', '/app', '/portal'];
            return authenticatedPaths.some(path => currentUrl.includes(path));
        }
        catch {
            return false;
        }
    }
    /**
     * Logout user
     */
    async logout() {
        try {
            // Try common logout methods
            const logoutSelectors = [
                '[data-testid="logout"]',
                '.logout',
                'button:has-text("Logout")',
                'button:has-text("Sign out")',
                'a:has-text("Logout")',
                'a:has-text("Sign out")'
            ];
            for (const selector of logoutSelectors) {
                const element = this.locatorHelper.getLocator(selector);
                if (await element.isVisible()) {
                    await this.actionHelper.clickLocator(element);
                    break;
                }
            }
            // Wait for logout to complete
            await this.waitForLogoutComplete();
        }
        catch (error) {
            console.warn('Logout failed, clearing session manually:', error);
            await this.clearAuthSession();
        }
    }
    /**
     * Clear authentication session
     */
    async clearAuthSession() {
        await this.page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await this.page.context().clearCookies();
    }
    /**
     * Wait for authentication to complete
     */
    async waitForAuthenticationComplete() {
        try {
            // Wait for redirect or dashboard elements
            await Promise.race([
                this.waitHelper.waitForUrlToMatch(/dashboard|home|app|portal/),
                this.waitHelper.waitForVisible('[data-testid="dashboard"], .dashboard, .main-content'),
                this.page.waitForTimeout(10000) // Fallback timeout
            ]);
        }
        catch (error) {
            console.warn('Authentication completion detection failed:', error);
        }
    }
    /**
     * Wait for logout to complete
     */
    async waitForLogoutComplete() {
        try {
            // Wait for redirect to login page or login elements
            await Promise.race([
                this.waitHelper.waitForUrlToMatch(/login|auth|signin/),
                this.waitHelper.waitForVisible('input[type="password"], .login-form'),
                this.page.waitForTimeout(5000) // Fallback timeout
            ]);
        }
        catch (error) {
            console.warn('Logout completion detection failed:', error);
        }
    }
    /**
     * Handle authentication errors
     */
    async handleAuthError() {
        const errorSelectors = [
            '.error-message',
            '.alert-error',
            '[data-testid="error"]',
            '.login-error',
            '.auth-error'
        ];
        for (const selector of errorSelectors) {
            const errorElement = this.locatorHelper.getLocator(selector);
            if (await errorElement.isVisible()) {
                return await errorElement.textContent();
            }
        }
        return null;
    }
    /**
     * Retry authentication with different credentials
     */
    async retryAuthentication(username, password, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.authenticateBasic(username, password);
                if (await this.isAuthenticated()) {
                    return true;
                }
                const error = await this.handleAuthError();
                if (error) {
                    console.warn(`Authentication attempt ${attempt} failed: ${error}`);
                }
                if (attempt < maxRetries) {
                    await this.page.waitForTimeout(1000 * attempt); // Exponential backoff
                }
            }
            catch (error) {
                console.warn(`Authentication attempt ${attempt} failed:`, error);
            }
        }
        return false;
    }
}
exports.AuthenticationHelper = AuthenticationHelper;
//# sourceMappingURL=AuthenticationHelper.js.map