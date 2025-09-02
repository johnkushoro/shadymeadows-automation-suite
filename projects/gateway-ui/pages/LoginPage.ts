import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * LoginPage - Page Object Model for login functionality
 * Contains all locators and basic interactions for the login page
 */
export class LoginPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Form elements
      usernameInput: this.locatorHelper.getByTestId('username-input') || 
                     this.locatorHelper.getInputByLabel('Username') ||
                     this.locatorHelper.getLocator('#username'),
      
      passwordInput: this.locatorHelper.getByTestId('password-input') || 
                     this.locatorHelper.getInputByLabel('Password') ||
                     this.locatorHelper.getLocator('#password'),
      
      loginButton: this.locatorHelper.getByTestId('login-button') || 
                    this.locatorHelper.getButtonByText('Login') ||
                    this.locatorHelper.getLocator('button[type="submit"]'),
      
      // Links
      forgotPasswordLink: this.locatorHelper.getLinkByText('Forgot Password') ||
                          this.locatorHelper.getByTestId('forgot-password-link'),
      
      signUpLink: this.locatorHelper.getLinkByText('Sign Up') ||
                  this.locatorHelper.getByTestId('signup-link'),
      
      // Messages
      errorMessage: this.locatorHelper.getByTestId('error-message') ||
                    this.locatorHelper.getLocator('.error-message, .alert-error'),
      
      successMessage: this.locatorHelper.getByTestId('success-message') ||
                      this.locatorHelper.getLocator('.success-message, .alert-success'),
      
      // Form validation
      usernameError: this.locatorHelper.getByTestId('username-error') ||
                     this.locatorHelper.getLocator('#username-error'),
      
      passwordError: this.locatorHelper.getByTestId('password-error') ||
                     this.locatorHelper.getLocator('#password-error'),
      
      // Loading states
      loadingSpinner: this.locatorHelper.getByTestId('loading-spinner') ||
                      this.locatorHelper.getLocator('.loading, .spinner'),
      
      // Remember me
      rememberMeCheckbox: this.locatorHelper.getByTestId('remember-me') ||
                          this.locatorHelper.getInputByLabel('Remember me'),
      
      // Social login (if applicable)
      googleLoginButton: this.locatorHelper.getByTestId('google-login') ||
                         this.locatorHelper.getButtonByText('Sign in with Google'),
      
      facebookLoginButton: this.locatorHelper.getByTestId('facebook-login') ||
                           this.locatorHelper.getButtonByText('Sign in with Facebook'),
    };
  }

  /**
   * Navigate to login page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/login');
  }

  /**
   * Wait for login page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.usernameInput);
    await this.waitHelper.waitForElement(this.locators.passwordInput);
    await this.waitHelper.waitForElement(this.locators.loginButton);
  }

  /**
   * Check if we're on the login page
   */
  public async isPageLoaded(): Promise<boolean> {
    try {
      await this.waitForPageLoad();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fill username field
   */
  public async fillUsername(username: string): Promise<void> {
    await this.actionHelper.fillInputByLabel('Username', username);
  }

  /**
   * Fill password field
   */
  public async fillPassword(password: string): Promise<void> {
    await this.actionHelper.fillInputByLabel('Password', password);
  }

  /**
   * Click login button
   */
  public async clickLogin(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.loginButton);
  }

  /**
   * Click forgot password link
   */
  public async clickForgotPassword(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.forgotPasswordLink);
  }

  /**
   * Click sign up link
   */
  public async clickSignUp(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.signUpLink);
  }

  /**
   * Toggle remember me checkbox
   */
  public async toggleRememberMe(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.rememberMeCheckbox);
  }

  /**
   * Get error message text
   */
  public async getErrorMessage(): Promise<string> {
    await this.waitHelper.waitForElement(this.locators.errorMessage);
    return await this.actionHelper.getTrimmedText(this.locators.errorMessage);
  }

  /**
   * Get success message text
   */
  public async getSuccessMessage(): Promise<string> {
    await this.waitHelper.waitForElement(this.locators.successMessage);
    return await this.actionHelper.getTrimmedText(this.locators.successMessage);
  }

  /**
   * Check if error message is displayed
   */
  public async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.actionHelper.isVisible(this.locators.errorMessage.toString());
  }

  /**
   * Check if success message is displayed
   */
  public async isSuccessMessageDisplayed(): Promise<boolean> {
    return await this.actionHelper.isVisible(this.locators.successMessage.toString());
  }

  /**
   * Check if loading spinner is displayed
   */
  public async isLoadingSpinnerDisplayed(): Promise<boolean> {
    return await this.actionHelper.isVisible(this.locators.loadingSpinner.toString());
  }

  /**
   * Wait for loading to complete
   */
  public async waitForLoadingToComplete(): Promise<void> {
    await this.waitHelper.waitForElementToBeHidden(this.locators.loadingSpinner);
  }

  /**
   * Check if login button is enabled
   */
  public async isLoginButtonEnabled(): Promise<boolean> {
    return await this.actionHelper.isEnabled(this.locators.loginButton.toString());
  }

  /**
   * Get username field value
   */
  public async getUsernameValue(): Promise<string> {
    return await this.actionHelper.getInputValue(this.locators.usernameInput.toString());
  }

  /**
   * Get password field value
   */
  public async getPasswordValue(): Promise<string> {
    return await this.actionHelper.getInputValue(this.locators.passwordInput.toString());
  }

  /**
   * Clear username field
   */
  public async clearUsername(): Promise<void> {
    await this.actionHelper.clear(this.locators.usernameInput.toString());
  }

  /**
   * Clear password field
   */
  public async clearPassword(): Promise<void> {
    await this.actionHelper.clear(this.locators.passwordInput.toString());
  }

  /**
   * Clear all form fields
   */
  public async clearForm(): Promise<void> {
    await this.clearUsername();
    await this.clearPassword();
  }

  /**
   * Check if remember me is checked
   */
  public async isRememberMeChecked(): Promise<boolean> {
    return await this.actionHelper.isChecked(this.locators.rememberMeCheckbox.toString());
  }

  /**
   * Get username validation error
   */
  public async getUsernameError(): Promise<string> {
    await this.waitHelper.waitForElement(this.locators.usernameError);
    return await this.actionHelper.getTrimmedText(this.locators.usernameError);
  }

  /**
   * Get password validation error
   */
  public async getPasswordError(): Promise<string> {
    await this.waitHelper.waitForElement(this.locators.passwordError);
    return await this.actionHelper.getTrimmedText(this.locators.passwordError);
  }

  /**
   * Check if form has validation errors
   */
  public async hasValidationErrors(): Promise<boolean> {
    const usernameErrorVisible = await this.actionHelper.isVisible(this.locators.usernameError.toString());
    const passwordErrorVisible = await this.actionHelper.isVisible(this.locators.passwordError.toString());
    return usernameErrorVisible || passwordErrorVisible;
  }
}