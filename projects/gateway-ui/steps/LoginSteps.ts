import { Page } from '@playwright/test';
import { AuthSteps } from './AuthSteps';

/**
 * LoginSteps - Legacy wrapper for backward compatibility
 * This class wraps AuthSteps to maintain compatibility with existing tests
 * that were written before the OAuth migration
 * 
 * @deprecated Use AuthSteps directly for new tests
 */
export class LoginSteps {
  private authSteps: AuthSteps;

  constructor(private page: Page) {
    this.authSteps = new AuthSteps(page);
  }

  /**
   * Legacy login method - now uses OAuth authentication
   * @param username - Not used in OAuth flow, kept for compatibility
   * @param password - Not used in OAuth flow, kept for compatibility
   */
  public async loginSuccessfully(username: string, password: string): Promise<void> {
    console.log('Legacy login method called - redirecting to OAuth authentication');
    console.log(`Note: Username (${username}) and password are ignored in OAuth flow`);
    
    // Use OAuth authentication instead of traditional login
    await this.authSteps.authenticateUser();
  }

  /**
   * Navigate to login page (now auth page)
   */
  public async navigateToLogin(): Promise<void> {
    await this.authSteps.navigateToAuth();
  }

  /**
   * Fill login form - OAuth doesn't use traditional forms
   * @param username - Not used in OAuth flow
   * @param password - Not used in OAuth flow
   */
  public async fillLoginForm(username: string, password: string): Promise<void> {
    console.log('Legacy fillLoginForm called - OAuth handles authentication automatically');
    console.log(`Note: Username (${username}) and password are ignored in OAuth flow`);
    
    // Navigate to auth page as preparation
    await this.authSteps.navigateToAuth();
  }

  /**
   * Submit login form - now triggers OAuth flow
   */
  public async submitLogin(): Promise<void> {
    console.log('Legacy submitLogin called - triggering OAuth authentication');
    await this.authSteps.performOAuthLogin();
  }

  /**
   * Verify login success - checks dashboard access
   */
  public async verifyLoginSuccess(): Promise<void> {
    await this.authSteps.verifyDashboardAccess();
  }

  /**
   * Check if user is logged in
   */
  public async isLoggedIn(): Promise<boolean> {
    return await this.authSteps.isUserAuthenticated();
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    await this.authSteps.logout();
  }

  /**
   * Get current authentication state
   */
  public async getAuthenticationState(): Promise<{
    isAuthenticated: boolean;
    currentUrl: string;
    onDashboard: boolean;
  }> {
    return await this.authSteps.getAuthenticationState();
  }

  /**
   * Authenticate user (direct OAuth method)
   */
  public async authenticateUser(): Promise<void> {
    await this.authSteps.authenticateUser();
  }

  /**
   * Verify dashboard elements
   */
  public async verifyDashboardElements(): Promise<void> {
    await this.authSteps.verifyDashboardElements();
  }

  /**
   * Navigate to different sections
   */
  public async navigateToSection(sectionName: string): Promise<void> {
    await this.authSteps.navigateToSection(sectionName);
  }

  /**
   * Perform search from dashboard
   */
  public async searchFromDashboard(searchTerm: string): Promise<void> {
    await this.authSteps.searchFromDashboard(searchTerm);
  }

  /**
   * Get dashboard metrics
   */
  public async getDashboardMetrics(): Promise<{
    totalLiveUsers: string;
    liveAdvisers: string;
    policies: string;
    documents: string;
  }> {
    return await this.authSteps.getDashboardMetrics();
  }

  /**
   * Ensure user is authenticated
   */
  public async ensureAuthenticated(): Promise<void> {
    await this.authSteps.ensureAuthenticated();
  }

  // Legacy methods for backward compatibility
  
  /**
   * @deprecated Use authenticateUser() instead
   */
  public async performLogin(username: string, password: string): Promise<void> {
    console.log('Legacy performLogin called - use authenticateUser() instead');
    await this.loginSuccessfully(username, password);
  }

  /**
   * @deprecated Use verifyDashboardAccess() instead
   */
  public async verifySuccessfulLogin(): Promise<void> {
    console.log('Legacy verifySuccessfulLogin called - use verifyDashboardAccess() instead');
    await this.verifyLoginSuccess();
  }

  /**
   * @deprecated Use getAuthenticationState() instead
   */
  public async getLoginState(): Promise<boolean> {
    console.log('Legacy getLoginState called - use getAuthenticationState() instead');
    return await this.isLoggedIn();
  }

  /**
   * Handle login errors (OAuth handles errors automatically)
   */
  public async handleLoginError(): Promise<void> {
    console.log('Legacy handleLoginError called - OAuth handles errors automatically');
    
    // Check current state and provide helpful information
    const authState = await this.getAuthenticationState();
    console.log('Current authentication state:', authState);
    
    if (!authState.isAuthenticated) {
      console.log('User is not authenticated - try calling authenticateUser()');
    }
  }

  /**
   * Verify login form elements (not applicable to OAuth)
   */
  public async verifyLoginFormElements(): Promise<void> {
    console.log('Legacy verifyLoginFormElements called - OAuth does not use traditional forms');
    console.log('OAuth authentication is handled by Microsoft Azure AD');
    
    // Navigate to auth page to show OAuth login button
    await this.authSteps.navigateToAuth();
  }

  /**
   * Clear login form (not applicable to OAuth)
   */
  public async clearLoginForm(): Promise<void> {
    console.log('Legacy clearLoginForm called - OAuth does not use traditional forms');
    console.log('OAuth authentication state is managed by the browser and Azure AD');
  }

  /**
   * Test invalid credentials (not applicable to OAuth)
   */
  public async testInvalidCredentials(username: string, password: string): Promise<void> {
    console.log('Legacy testInvalidCredentials called - OAuth handles authentication validation');
    console.log(`Note: Username (${username}) and password are ignored in OAuth flow`);
    console.log('Invalid credentials are handled by Microsoft Azure AD during OAuth flow');
  }
}