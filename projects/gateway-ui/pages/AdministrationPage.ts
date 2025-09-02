import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * AdministrationPage - Page Object Model for Administration functionality
 * Contains all locators and interactions for system administration
 */
export class AdministrationPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Page header
      pageTitle: this.locatorHelper.getByText('Administration'),
      breadcrumb: this.locatorHelper.getByTestId('breadcrumb') || 
                  this.locatorHelper.getLocator('.breadcrumb'),
      
      // Main sections
      userManagementSection: this.locatorHelper.getByText('User Management'),
      systemSettingsSection: this.locatorHelper.getByText('System Settings'),
      securitySection: this.locatorHelper.getByText('Security'),
      auditLogsSection: this.locatorHelper.getByText('Audit Logs'),
      backupSection: this.locatorHelper.getByText('Backup & Restore'),
      
      // User Management
      usersTab: this.locatorHelper.getByText('Users'),
      rolesTab: this.locatorHelper.getByText('Roles'),
      permissionsTab: this.locatorHelper.getByText('Permissions'),
      
      // Search and filters
      searchInput: this.locatorHelper.getInputByPlaceholder('Search users...') ||
                   this.locatorHelper.getByTestId('search-input'),
      roleFilter: this.locatorHelper.getByTestId('role-filter'),
      statusFilter: this.locatorHelper.getByTestId('status-filter'),
      departmentFilter: this.locatorHelper.getByTestId('department-filter'),
      
      // Action buttons
      createUserButton: this.locatorHelper.getButtonByText('Create User') ||
                        this.locatorHelper.getByTestId('create-user-btn'),
      createRoleButton: this.locatorHelper.getButtonByText('Create Role') ||
                        this.locatorHelper.getByTestId('create-role-btn'),
      exportButton: this.locatorHelper.getButtonByText('Export') ||
                    this.locatorHelper.getByTestId('export-btn'),
      refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                     this.locatorHelper.getByTestId('refresh-btn'),
      
      // Users table
      usersTable: this.locatorHelper.getByTestId('users-table') ||
                  this.locatorHelper.getLocator('table'),
      userTableHeaders: this.locatorHelper.getLocator('thead th'),
      userTableRows: this.locatorHelper.getLocator('tbody tr'),
      
      // User table columns
      userIdColumn: this.locatorHelper.getByText('User ID'),
      usernameColumn: this.locatorHelper.getByText('Username'),
      emailColumn: this.locatorHelper.getByText('Email'),
      fullNameColumn: this.locatorHelper.getByText('Full Name'),
      roleColumn: this.locatorHelper.getByText('Role'),
      departmentColumn: this.locatorHelper.getByText('Department'),
      statusColumn: this.locatorHelper.getByText('Status'),
      lastLoginColumn: this.locatorHelper.getByText('Last Login'),
      actionsColumn: this.locatorHelper.getByText('Actions'),
      
      // User actions
      viewUserButton: this.locatorHelper.getButtonByText('View'),
      editUserButton: this.locatorHelper.getButtonByText('Edit'),
      deactivateUserButton: this.locatorHelper.getButtonByText('Deactivate'),
      resetPasswordButton: this.locatorHelper.getButtonByText('Reset Password'),
      deleteUserButton: this.locatorHelper.getButtonByText('Delete'),
      
      // User status indicators
      activeStatus: this.locatorHelper.getByText('Active'),
      inactiveStatus: this.locatorHelper.getByText('Inactive'),
      suspendedStatus: this.locatorHelper.getByText('Suspended'),
      
      // User form modal
      userModal: this.locatorHelper.getByTestId('user-modal') ||
                 this.locatorHelper.getLocator('.modal'),
      modalTitle: this.locatorHelper.getByTestId('modal-title'),
      usernameInput: this.locatorHelper.getInputByLabel('Username'),
      emailInput: this.locatorHelper.getInputByLabel('Email'),
      firstNameInput: this.locatorHelper.getInputByLabel('First Name'),
      lastNameInput: this.locatorHelper.getInputByLabel('Last Name'),
      passwordInput: this.locatorHelper.getInputByLabel('Password'),
      confirmPasswordInput: this.locatorHelper.getInputByLabel('Confirm Password'),
      roleSelect: this.locatorHelper.getInputByLabel('Role'),
      departmentSelect: this.locatorHelper.getInputByLabel('Department'),
      statusSelect: this.locatorHelper.getInputByLabel('Status'),
      
      // System Settings
      generalSettingsTab: this.locatorHelper.getByText('General'),
      emailSettingsTab: this.locatorHelper.getByText('Email'),
      notificationSettingsTab: this.locatorHelper.getByText('Notifications'),
      integrationSettingsTab: this.locatorHelper.getByText('Integrations'),
      
      // General settings
      systemNameInput: this.locatorHelper.getInputByLabel('System Name'),
      timezoneSelect: this.locatorHelper.getInputByLabel('Timezone'),
      languageSelect: this.locatorHelper.getInputByLabel('Language'),
      sessionTimeoutInput: this.locatorHelper.getInputByLabel('Session Timeout'),
      
      // Email settings
      smtpServerInput: this.locatorHelper.getInputByLabel('SMTP Server'),
      smtpPortInput: this.locatorHelper.getInputByLabel('SMTP Port'),
      smtpUsernameInput: this.locatorHelper.getInputByLabel('SMTP Username'),
      smtpPasswordInput: this.locatorHelper.getInputByLabel('SMTP Password'),
      fromEmailInput: this.locatorHelper.getInputByLabel('From Email'),
      
      // Security settings
      passwordPolicySection: this.locatorHelper.getByText('Password Policy'),
      twoFactorAuthSection: this.locatorHelper.getByText('Two-Factor Authentication'),
      ipWhitelistSection: this.locatorHelper.getByText('IP Whitelist'),
      
      // Audit logs
      auditLogsTable: this.locatorHelper.getByTestId('audit-logs-table'),
      logDateFilter: this.locatorHelper.getByTestId('log-date-filter'),
      logUserFilter: this.locatorHelper.getByTestId('log-user-filter'),
      logActionFilter: this.locatorHelper.getByTestId('log-action-filter'),
      
      // Common form buttons
      saveButton: this.locatorHelper.getButtonByText('Save'),
      cancelButton: this.locatorHelper.getButtonByText('Cancel'),
      closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                        this.locatorHelper.getLocator('.close, .btn-close'),
      
      // Pagination
      pagination: this.locatorHelper.getByTestId('pagination') ||
                  this.locatorHelper.getLocator('.pagination'),
      previousPageButton: this.locatorHelper.getButtonByText('Previous'),
      nextPageButton: this.locatorHelper.getButtonByText('Next'),
      pageInfo: this.locatorHelper.getByTestId('page-info'),
    };
  }

  /**
   * Navigate to Administration page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/administration');
  }

  /**
   * Wait for page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.pageTitle);
    await this.waitHelper.waitForElement(this.locators.userManagementSection);
  }

  /**
   * Check if we're on the correct page
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
   * Navigate to Users tab
   */
  public async goToUsersTab(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.usersTab);
    await this.waitHelper.waitForElement(this.locators.usersTable);
  }

  /**
   * Navigate to Roles tab
   */
  public async goToRolesTab(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.rolesTab);
  }

  /**
   * Navigate to Permissions tab
   */
  public async goToPermissionsTab(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.permissionsTab);
  }

  /**
   * Search for users
   */
  public async searchUsers(searchTerm: string): Promise<void> {
    await this.actionHelper.fillInputByPlaceholder('Search users...', searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Filter users by role
   */
  public async filterByRole(role: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.roleFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.roleFilter.toString(), role);
  }

  /**
   * Filter users by status
   */
  public async filterByStatus(status: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.statusFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
  }

  /**
   * Create new user
   */
  public async clickCreateUser(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.createUserButton);
    await this.waitHelper.waitForElement(this.locators.userModal);
  }

  /**
   * Fill user form
   */
  public async fillUserForm(userData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    role: string;
    department: string;
    status: string;
  }): Promise<void> {
    await this.actionHelper.fillInputByLabel('Username', userData.username);
    await this.actionHelper.fillInputByLabel('Email', userData.email);
    await this.actionHelper.fillInputByLabel('First Name', userData.firstName);
    await this.actionHelper.fillInputByLabel('Last Name', userData.lastName);
    
    if (userData.password) {
      await this.actionHelper.fillInputByLabel('Password', userData.password);
      await this.actionHelper.fillInputByLabel('Confirm Password', userData.password);
    }
    
    await this.actionHelper.selectCustomDropdown(this.locators.roleSelect.toString(), userData.role);
    await this.actionHelper.selectCustomDropdown(this.locators.departmentSelect.toString(), userData.department);
    await this.actionHelper.selectCustomDropdown(this.locators.statusSelect.toString(), userData.status);
  }

  /**
   * Save user
   */
  public async saveUser(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.saveButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.userModal);
  }

  /**
   * Cancel user creation/editing
   */
  public async cancelUser(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.cancelButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.userModal);
  }

  /**
   * Edit user
   */
  public async editUser(username: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', username);
    const editButton = row.locator('button:has-text("Edit")');
    await this.actionHelper.clickLocator(editButton);
    await this.waitHelper.waitForElement(this.locators.userModal);
  }

  /**
   * Deactivate user
   */
  public async deactivateUser(username: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', username);
    const deactivateButton = row.locator('button:has-text("Deactivate")');
    await this.actionHelper.clickLocator(deactivateButton);
  }

  /**
   * Reset user password
   */
  public async resetUserPassword(username: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', username);
    const resetButton = row.locator('button:has-text("Reset Password")');
    await this.actionHelper.clickLocator(resetButton);
  }

  /**
   * Delete user
   */
  public async deleteUser(username: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', username);
    const deleteButton = row.locator('button:has-text("Delete")');
    await this.actionHelper.clickLocator(deleteButton);
  }

  /**
   * Navigate to System Settings
   */
  public async goToSystemSettings(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.systemSettingsSection);
  }

  /**
   * Navigate to General Settings tab
   */
  public async goToGeneralSettings(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.generalSettingsTab);
  }

  /**
   * Navigate to Email Settings tab
   */
  public async goToEmailSettings(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.emailSettingsTab);
  }

  /**
   * Navigate to Audit Logs
   */
  public async goToAuditLogs(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.auditLogsSection);
    await this.waitHelper.waitForElement(this.locators.auditLogsTable);
  }

  /**
   * Get user count
   */
  public async getUserCount(): Promise<number> {
    return await this.actionHelper.getElementCount('tbody tr');
  }

  /**
   * Get user status
   */
  public async getUserStatus(username: string): Promise<string> {
    const row = this.locatorHelper.getContainingText('tr', username);
    const statusCell = row.locator('td').nth(6); // Assuming status is 7th column
    return await this.actionHelper.getTrimmedText(statusCell);
  }

  /**
   * Export users
   */
  public async exportUsers(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.exportButton);
  }

  /**
   * Refresh users list
   */
  public async refreshUsers(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.refreshButton);
    await this.waitForLoadingToComplete();
  }
}