import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { FrameworkConfig } from '../types';

/**
 * Base UI Page Template
 * Provides common patterns for UI pages to reduce duplication
 */
export abstract class BaseUIPage extends BasePage {
  protected abstract pageIdentifier: string;
  protected abstract pageTitle: string;
  protected abstract pageUrl: string;

  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  /**
   * Navigate to this page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath(this.pageUrl);
    await this.waitForPageLoad();
  }

  /**
   * Standard page load implementation
   * Can be overridden by specific pages if needed
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitForDOMContentLoaded();
    await this.waitForLoadingToComplete();
    
    // Wait for page-specific identifier if provided
    if (this.pageIdentifier) {
      const identifier = this.locatorHelper.getLocator(this.pageIdentifier);
      await this.waitHelper.waitForElement(identifier);
    }
  }

  /**
   * Standard page loaded check
   * Can be overridden by specific pages if needed
   */
  public async isPageLoaded(): Promise<boolean> {
    try {
      // Check URL contains expected path
      if (this.pageUrl && !this.urlContains(this.pageUrl)) {
        return false;
      }

      // Check page title if provided
      if (this.pageTitle) {
        const currentTitle = await this.getPageTitle();
        if (!currentTitle.includes(this.pageTitle)) {
          return false;
        }
      }

      // Check page identifier if provided
      if (this.pageIdentifier) {
        const identifier = this.locatorHelper.getLocator(this.pageIdentifier);
        return await identifier.isVisible();
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Standard search functionality
   * Common pattern across many pages
   */
  protected async performSearch(searchTerm: string, searchSelector: string = '[data-testid="search-input"], .search-input, input[type="search"]'): Promise<void> {
    const searchInput = this.locatorHelper.getLocator(searchSelector);
    await this.actionHelper.fill(searchSelector, searchTerm);
    await this.actionHelper.pressKey('Enter');
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard filter functionality
   * Common pattern across many pages
   */
  protected async performFilter(filterType: string, filterValue: string): Promise<void> {
    const filterSelector = `[data-testid="${filterType}-filter"], .${filterType}-filter, select[name="${filterType}"]`;
    await this.actionHelper.selectOptionFromDropdown(filterSelector, filterValue);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard refresh functionality
   * Common pattern across many pages
   */
  protected async performRefresh(refreshSelector: string = '[data-testid="refresh-button"], .refresh-button, button[aria-label*="refresh"]'): Promise<void> {
    const refreshButton = this.locatorHelper.getLocator(refreshSelector);
    await this.actionHelper.clickLocator(refreshButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard create/add functionality
   * Common pattern across many pages
   */
  protected async performCreate(createSelector: string = '[data-testid="create-button"], .create-button, .add-button, button[aria-label*="create"], button[aria-label*="add"]'): Promise<void> {
    const createButton = this.locatorHelper.getLocator(createSelector);
    await this.actionHelper.clickLocator(createButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard save functionality
   * Common pattern across many pages
   */
  protected async performSave(saveSelector: string = '[data-testid="save-button"], .save-button, button[type="submit"], button[aria-label*="save"]'): Promise<void> {
    const saveButton = this.locatorHelper.getLocator(saveSelector);
    await this.actionHelper.clickLocator(saveButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard cancel functionality
   * Common pattern across many pages
   */
  protected async performCancel(cancelSelector: string = '[data-testid="cancel-button"], .cancel-button, button[aria-label*="cancel"]'): Promise<void> {
    const cancelButton = this.locatorHelper.getLocator(cancelSelector);
    await this.actionHelper.clickLocator(cancelButton);
  }

  /**
   * Standard view switching functionality
   * Common pattern across many pages
   */
  protected async switchView(viewType: 'list' | 'card' | 'grid' | 'kanban' | 'calendar'): Promise<void> {
    const viewSelector = `[data-testid="${viewType}-view"], .${viewType}-view, button[aria-label*="${viewType}"]`;
    const viewButton = this.locatorHelper.getLocator(viewSelector);
    await this.actionHelper.clickLocator(viewButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard pagination functionality
   * Common pattern across many pages
   */
  protected async goToNextPage(nextSelector: string = '[data-testid="next-page"], .next-page, button[aria-label*="next"]'): Promise<void> {
    const nextButton = this.locatorHelper.getLocator(nextSelector);
    await this.actionHelper.clickLocator(nextButton);
    await this.waitForLoadingToComplete();
  }

  protected async goToPreviousPage(prevSelector: string = '[data-testid="previous-page"], .previous-page, button[aria-label*="previous"]'): Promise<void> {
    const prevButton = this.locatorHelper.getLocator(prevSelector);
    await this.actionHelper.clickLocator(prevButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard item selection functionality
   * Common pattern across many pages
   */
  protected async selectItems(itemIds: string[], itemSelector: string = '[data-testid*="item-checkbox"]'): Promise<void> {
    for (const itemId of itemIds) {
      const checkbox = this.locatorHelper.getLocator(`${itemSelector}[data-item-id="${itemId}"]`);
      await this.actionHelper.checkCheckbox(`${itemSelector}[data-item-id="${itemId}"]`);
    }
  }

  /**
   * Standard bulk action functionality
   * Common pattern across many pages
   */
  protected async performBulkAction(action: string, actionSelector: string = '[data-testid="bulk-actions"]'): Promise<void> {
    const bulkActionsDropdown = this.locatorHelper.getLocator(actionSelector);
    await this.actionHelper.clickLocator(bulkActionsDropdown);
    
    const actionOption = this.locatorHelper.getByText(action);
    await this.actionHelper.clickLocator(actionOption);
    await this.waitForLoadingToComplete();
  }

  /**
   * Standard status retrieval functionality
   * Common pattern across many pages
   */
  protected async getItemStatus(itemId: string, statusSelector: string = '[data-testid*="status"]'): Promise<string> {
    const statusElement = this.locatorHelper.getLocator(`${statusSelector}[data-item-id="${itemId}"]`);
    return await this.elementHelper.getTrimmedText(statusElement);
  }

  /**
   * Standard count retrieval functionality
   * Common pattern across many pages
   */
  protected async getCount(countSelector: string): Promise<string> {
    const countElement = this.locatorHelper.getLocator(countSelector);
    return await this.elementHelper.getTrimmedText(countElement);
  }

  /**
   * Standard form filling helper
   * Reduces repetitive form filling code
   */
  protected async fillFormField(fieldName: string, value: string | boolean, fieldType: 'input' | 'select' | 'checkbox' | 'textarea' = 'input'): Promise<void> {
    const selector = `[data-testid="${fieldName}"], [name="${fieldName}"], #${fieldName}`;
    
    switch (fieldType) {
      case 'input':
      case 'textarea':
        await this.actionHelper.fill(selector, value as string);
        break;
      case 'select':
        await this.actionHelper.selectOptionFromDropdown(selector, value as string);
        break;
      case 'checkbox':
        if (value as boolean) {
          await this.actionHelper.checkCheckbox(selector);
        } else {
          await this.actionHelper.uncheckCheckbox(selector);
        }
        break;
    }
  }

  /**
   * Standard form validation helper
   */
  protected async hasValidationErrors(): Promise<boolean> {
    const errorSelectors = [
      '.error',
      '.error-message',
      '[aria-invalid="true"]',
      '.field-error',
      '.validation-error'
    ];

    for (const selector of errorSelectors) {
      const errorElement = this.locatorHelper.getLocator(selector);
      if (await errorElement.isVisible()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Standard error message retrieval
   */
  protected async getValidationError(fieldName: string): Promise<string> {
    const errorSelectors = [
      `[data-testid="${fieldName}-error"]`,
      `#${fieldName}-error`,
      `.${fieldName}-error`
    ];

    for (const selector of errorSelectors) {
      const errorElement = this.locatorHelper.getLocator(selector);
      if (await errorElement.isVisible()) {
        return await this.elementHelper.getTrimmedText(errorElement);
      }
    }

    return '';
  }
}