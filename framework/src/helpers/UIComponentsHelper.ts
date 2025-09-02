import { Page, Locator } from '@playwright/test';
import { ActionHelper } from './ActionHelper';
import { WaitHelper } from './WaitHelper';
import { LocatorHelper } from './LocatorHelper';
import { FrameworkConfig } from '../types';

/**
 * UI Components Helper
 * Provides reusable methods for common UI components
 * Makes it easy to interact with standard web components
 */
export class UIComponentsHelper {
  private readonly page: Page;
  private readonly actionHelper: ActionHelper;
  private readonly waitHelper: WaitHelper;
  private readonly locatorHelper: LocatorHelper;

  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    this.page = page;
    this.actionHelper = new ActionHelper(page, config);
    this.waitHelper = new WaitHelper(page, config);
    this.locatorHelper = new LocatorHelper(page);
  }

  /**
   * Modal/Dialog Components
   */
  async openModal(triggerSelector: string): Promise<void> {
    await this.actionHelper.click(triggerSelector);
    await this.waitHelper.waitForVisible('.modal, .dialog, [role="dialog"]');
  }

  async closeModal(): Promise<void> {
    const closeSelectors = [
      '.modal .close',
      '.dialog .close',
      '[data-testid="close-modal"]',
      '[aria-label="Close"]',
      '.modal-close'
    ];

    for (const selector of closeSelectors) {
      try {
        await this.actionHelper.click(selector);
        await this.waitHelper.waitForHidden('.modal, .dialog, [role="dialog"]');
        return;
      } catch (error) {
        // Try next selector
      }
    }
    
    // Try pressing Escape key as fallback
    await this.actionHelper.pressKey('Escape');
  }

  async confirmModal(): Promise<void> {
    const confirmSelectors = [
      '[data-testid="confirm"]',
      '.modal .confirm',
      '.btn-confirm',
      'button:has-text("Confirm")',
      'button:has-text("OK")',
      'button:has-text("Yes")'
    ];

    for (const selector of confirmSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Dropdown/Select Components
   */
  async selectFromCustomDropdown(dropdownSelector: string, optionText: string): Promise<void> {
    // Open dropdown
    await this.actionHelper.click(dropdownSelector);
    
    // Wait for options to appear
    await this.waitHelper.waitForVisible('.dropdown-menu, .select-options, [role="listbox"]');
    
    // Select option
    const optionSelectors = [
      `[data-value="${optionText}"]`,
      `.option:has-text("${optionText}")`,
      `[role="option"]:has-text("${optionText}")`,
      `.dropdown-item:has-text("${optionText}")`
    ];

    for (const selector of optionSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Tab Components
   */
  async switchToTab(tabName: string): Promise<void> {
    const tabSelectors = [
      `[data-testid="${tabName.toLowerCase()}-tab"]`,
      `.tab:has-text("${tabName}")`,
      `[role="tab"]:has-text("${tabName}")`,
      `.nav-tab:has-text("${tabName}")`
    ];

    for (const selector of tabSelectors) {
      try {
        await this.actionHelper.click(selector);
        await this.waitHelper.waitForVisible(`[role="tabpanel"], .tab-content`);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Accordion Components
   */
  async expandAccordion(sectionName: string): Promise<void> {
    const accordionSelectors = [
      `[data-testid="${sectionName.toLowerCase()}-accordion"]`,
      `.accordion-header:has-text("${sectionName}")`,
      `.accordion-toggle:has-text("${sectionName}")`
    ];

    for (const selector of accordionSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Table Components
   */
  async sortTableByColumn(columnName: string): Promise<void> {
    const headerSelectors = [
      `th:has-text("${columnName}")`,
      `[data-column="${columnName.toLowerCase()}"]`,
      `.sortable:has-text("${columnName}")`
    ];

    for (const selector of headerSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  async selectTableRow(rowIdentifier: string): Promise<void> {
    const rowSelectors = [
      `tr:has-text("${rowIdentifier}")`,
      `[data-row-id="${rowIdentifier}"]`,
      `tr[data-testid*="${rowIdentifier}"]`
    ];

    for (const selector of rowSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  async getTableCellValue(rowIdentifier: string, columnName: string): Promise<string> {
    const row = this.locatorHelper.getLocator(`tr:has-text("${rowIdentifier}")`);
    const columnIndex = await this.getColumnIndex(columnName);
    const cell = row.locator(`td:nth-child(${columnIndex + 1})`);
    return await cell.textContent() || '';
  }

  private async getColumnIndex(columnName: string): Promise<number> {
    const headers = await this.locatorHelper.getLocator('th').all();
    for (let i = 0; i < headers.length; i++) {
      const headerText = await headers[i].textContent();
      if (headerText?.includes(columnName)) {
        return i;
      }
    }
    throw new Error(`Column "${columnName}" not found`);
  }

  /**
   * Pagination Components
   */
  async goToPage(pageNumber: number): Promise<void> {
    const pageSelectors = [
      `[data-page="${pageNumber}"]`,
      `.page-link:has-text("${pageNumber}")`,
      `.pagination button:has-text("${pageNumber}")`
    ];

    for (const selector of pageSelectors) {
      try {
        await this.actionHelper.click(selector);
        await this.waitForLoadingToComplete();
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  async goToNextPage(): Promise<void> {
    const nextSelectors = [
      '[data-testid="next-page"]',
      '.pagination .next',
      'button:has-text("Next")',
      '[aria-label="Next page"]'
    ];

    for (const selector of nextSelectors) {
      try {
        await this.actionHelper.click(selector);
        await this.waitForLoadingToComplete();
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  async goToPreviousPage(): Promise<void> {
    const prevSelectors = [
      '[data-testid="previous-page"]',
      '.pagination .prev',
      'button:has-text("Previous")',
      '[aria-label="Previous page"]'
    ];

    for (const selector of prevSelectors) {
      try {
        await this.actionHelper.click(selector);
        await this.waitForLoadingToComplete();
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Search Components
   */
  async performSearch(searchTerm: string, searchSelector?: string): Promise<void> {
    const selectors = searchSelector ? [searchSelector] : [
      '[data-testid="search"]',
      '.search-input',
      'input[type="search"]',
      'input[placeholder*="search"]',
      '#search'
    ];

    for (const selector of selectors) {
      try {
        await this.actionHelper.fill(selector, searchTerm);
        await this.actionHelper.pressKey('Enter');
        await this.waitForLoadingToComplete();
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  async clearSearch(): Promise<void> {
    const clearSelectors = [
      '[data-testid="clear-search"]',
      '.search-clear',
      '.clear-button'
    ];

    for (const selector of clearSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Filter Components
   */
  async applyFilter(filterName: string, filterValue: string): Promise<void> {
    const filterSelector = `[data-testid="${filterName.toLowerCase()}-filter"], .${filterName.toLowerCase()}-filter`;
    
    try {
      await this.actionHelper.selectOptionFromDropdown(filterSelector, filterValue);
    } catch (error) {
      // Try custom dropdown
      await this.selectFromCustomDropdown(filterSelector, filterValue);
    }
    
    await this.waitForLoadingToComplete();
  }

  async clearAllFilters(): Promise<void> {
    const clearSelectors = [
      '[data-testid="clear-filters"]',
      '.clear-filters',
      'button:has-text("Clear Filters")',
      '.reset-filters'
    ];

    for (const selector of clearSelectors) {
      try {
        await this.actionHelper.click(selector);
        await this.waitForLoadingToComplete();
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Notification/Toast Components
   */
  async waitForNotification(timeout: number = 5000): Promise<string> {
    const notificationSelectors = [
      '.notification',
      '.toast',
      '.alert',
      '[data-testid="notification"]',
      '.message'
    ];

    for (const selector of notificationSelectors) {
      try {
        await this.waitHelper.waitForVisible(selector, timeout);
        const notification = this.locatorHelper.getLocator(selector);
        return await notification.textContent() || '';
      } catch (error) {
        // Try next selector
      }
    }
    
    throw new Error('No notification appeared within timeout');
  }

  async dismissNotification(): Promise<void> {
    const dismissSelectors = [
      '.notification .close',
      '.toast .close',
      '.alert .close',
      '[data-testid="dismiss-notification"]'
    ];

    for (const selector of dismissSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Form Components
   */
  async fillForm(formData: Record<string, any>): Promise<void> {
    for (const [fieldName, value] of Object.entries(formData)) {
      if (value !== null && value !== undefined) {
        await this.fillFormField(fieldName, value);
      }
    }
  }

  private async fillFormField(fieldName: string, value: any): Promise<void> {
    const selectors = [
      `[data-testid="${fieldName}"]`,
      `[name="${fieldName}"]`,
      `#${fieldName}`,
      `input[placeholder*="${fieldName}"]`
    ];

    for (const selector of selectors) {
      try {
        const element = this.locatorHelper.getLocator(selector);
        const tagName = await element.evaluate(el => el.tagName.toLowerCase());
        const inputType = await element.getAttribute('type');

        if (tagName === 'select') {
          await this.actionHelper.selectOptionFromDropdown(selector, value.toString());
        } else if (inputType === 'checkbox') {
          if (value) {
            await this.actionHelper.checkCheckbox(selector);
          } else {
            await this.actionHelper.uncheckCheckbox(selector);
          }
        } else if (inputType === 'radio') {
          await this.actionHelper.selectRadioByValue(fieldName, value.toString());
        } else {
          await this.actionHelper.fill(selector, value.toString());
        }
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }

  /**
   * Loading Components
   */
  async waitForLoadingToComplete(timeout: number = 30000): Promise<void> {
    const loadingSelectors = [
      '.loading',
      '.spinner',
      '.loader',
      '[data-testid*="loading"]',
      '[aria-label*="loading"]'
    ];

    for (const selector of loadingSelectors) {
      try {
        await this.waitHelper.waitForHidden(selector, timeout);
      } catch (error) {
        // Loading element might not exist, which is fine
      }
    }
  }

  /**
   * Breadcrumb Components
   */
  async navigateViaBreadcrumb(breadcrumbText: string): Promise<void> {
    const breadcrumbSelectors = [
      `.breadcrumb a:has-text("${breadcrumbText}")`,
      `.breadcrumb-item:has-text("${breadcrumbText}")`,
      `[data-testid="breadcrumb-${breadcrumbText.toLowerCase()}"]`
    ];

    for (const selector of breadcrumbSelectors) {
      try {
        await this.actionHelper.click(selector);
        return;
      } catch (error) {
        // Try next selector
      }
    }
  }
}