import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * CorrespondencePage - Page Object Model for Correspondence functionality
 * Contains all locators and interactions for managing correspondence
 */
export class CorrespondencePage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Page header
      pageTitle: this.locatorHelper.getByText('Correspondence'),
      breadcrumb: this.locatorHelper.getByTestId('breadcrumb') || 
                  this.locatorHelper.getLocator('.breadcrumb'),
      
      // Main sections
      inboxSection: this.locatorHelper.getByText('Inbox'),
      sentSection: this.locatorHelper.getByText('Sent'),
      draftsSection: this.locatorHelper.getByText('Drafts'),
      templatesSection: this.locatorHelper.getByText('Templates'),
      archiveSection: this.locatorHelper.getByText('Archive'),
      
      // Search and filters
      searchInput: this.locatorHelper.getInputByPlaceholder('Search correspondence...') ||
                   this.locatorHelper.getByTestId('search-input'),
      typeFilter: this.locatorHelper.getByTestId('type-filter'),
      statusFilter: this.locatorHelper.getByTestId('status-filter'),
      priorityFilter: this.locatorHelper.getByTestId('priority-filter'),
      dateRangeFilter: this.locatorHelper.getByTestId('date-range-filter'),
      clientFilter: this.locatorHelper.getByTestId('client-filter'),
      
      // Action buttons
      composeButton: this.locatorHelper.getButtonByText('Compose') ||
                     this.locatorHelper.getByTestId('compose-btn'),
      replyButton: this.locatorHelper.getButtonByText('Reply') ||
                   this.locatorHelper.getByTestId('reply-btn'),
      forwardButton: this.locatorHelper.getButtonByText('Forward') ||
                     this.locatorHelper.getByTestId('forward-btn'),
      deleteButton: this.locatorHelper.getButtonByText('Delete') ||
                    this.locatorHelper.getByTestId('delete-btn'),
      archiveButton: this.locatorHelper.getButtonByText('Archive') ||
                     this.locatorHelper.getByTestId('archive-btn'),
      refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                     this.locatorHelper.getByTestId('refresh-btn'),
      
      // Correspondence list
      correspondenceTable: this.locatorHelper.getByTestId('correspondence-table') ||
                           this.locatorHelper.getLocator('table'),
      tableHeaders: this.locatorHelper.getLocator('thead th'),
      tableRows: this.locatorHelper.getLocator('tbody tr'),
      
      // Table columns
      selectColumn: this.locatorHelper.getByText('Select'),
      typeColumn: this.locatorHelper.getByText('Type'),
      subjectColumn: this.locatorHelper.getByText('Subject'),
      fromColumn: this.locatorHelper.getByText('From'),
      toColumn: this.locatorHelper.getByText('To'),
      clientColumn: this.locatorHelper.getByText('Client'),
      dateColumn: this.locatorHelper.getByText('Date'),
      statusColumn: this.locatorHelper.getByText('Status'),
      priorityColumn: this.locatorHelper.getByText('Priority'),
      actionsColumn: this.locatorHelper.getByText('Actions'),
      
      // Correspondence types
      emailType: this.locatorHelper.getByText('Email'),
      letterType: this.locatorHelper.getByText('Letter'),
      smsType: this.locatorHelper.getByText('SMS'),
      faxType: this.locatorHelper.getByText('Fax'),
      noteType: this.locatorHelper.getByText('Note'),
      
      // Status indicators
      draftStatus: this.locatorHelper.getByText('Draft'),
      sentStatus: this.locatorHelper.getByText('Sent'),
      deliveredStatus: this.locatorHelper.getByText('Delivered'),
      readStatus: this.locatorHelper.getByText('Read'),
      failedStatus: this.locatorHelper.getByText('Failed'),
      
      // Priority indicators
      highPriority: this.locatorHelper.getByText('High'),
      mediumPriority: this.locatorHelper.getByText('Medium'),
      lowPriority: this.locatorHelper.getByText('Low'),
      urgentPriority: this.locatorHelper.getByText('Urgent'),
      
      // Row actions
      viewButton: this.locatorHelper.getButtonByText('View'),
      editButton: this.locatorHelper.getButtonByText('Edit'),
      duplicateButton: this.locatorHelper.getButtonByText('Duplicate'),
      printButton: this.locatorHelper.getButtonByText('Print'),
      
      // Compose/Edit modal
      composeModal: this.locatorHelper.getByTestId('compose-modal') ||
                    this.locatorHelper.getLocator('.modal'),
      modalTitle: this.locatorHelper.getByTestId('modal-title'),
      
      // Correspondence form
      typeSelect: this.locatorHelper.getInputByLabel('Type'),
      toInput: this.locatorHelper.getInputByLabel('To'),
      ccInput: this.locatorHelper.getInputByLabel('CC'),
      bccInput: this.locatorHelper.getInputByLabel('BCC'),
      clientSelect: this.locatorHelper.getInputByLabel('Client'),
      subjectInput: this.locatorHelper.getInputByLabel('Subject'),
      prioritySelect: this.locatorHelper.getInputByLabel('Priority'),
      
      // Message content
      messageEditor: this.locatorHelper.getByTestId('message-editor') ||
                     this.locatorHelper.getLocator('.editor'),
      messageTextarea: this.locatorHelper.getInputByLabel('Message'),
      
      // Rich text editor tools
      boldButton: this.locatorHelper.getButtonByText('Bold') ||
                  this.locatorHelper.getByTestId('bold-btn'),
      italicButton: this.locatorHelper.getButtonByText('Italic') ||
                    this.locatorHelper.getByTestId('italic-btn'),
      underlineButton: this.locatorHelper.getButtonByText('Underline') ||
                       this.locatorHelper.getByTestId('underline-btn'),
      bulletListButton: this.locatorHelper.getByTestId('bullet-list-btn'),
      numberedListButton: this.locatorHelper.getByTestId('numbered-list-btn'),
      
      // Attachments
      attachmentsSection: this.locatorHelper.getByTestId('attachments-section'),
      attachFileButton: this.locatorHelper.getButtonByText('Attach File') ||
                        this.locatorHelper.getByTestId('attach-file-btn'),
      fileInput: this.locatorHelper.getLocator('input[type="file"]'),
      attachmentsList: this.locatorHelper.getByTestId('attachments-list'),
      removeAttachmentButton: this.locatorHelper.getButtonByText('Remove'),
      
      // Templates
      templatesDropdown: this.locatorHelper.getByTestId('templates-dropdown'),
      useTemplateButton: this.locatorHelper.getButtonByText('Use Template'),
      saveAsTemplateButton: this.locatorHelper.getButtonByText('Save as Template'),
      templateNameInput: this.locatorHelper.getInputByLabel('Template Name'),
      
      // Scheduling
      schedulingSection: this.locatorHelper.getByTestId('scheduling-section'),
      scheduleCheckbox: this.locatorHelper.getInputByLabel('Schedule Send'),
      scheduleDateInput: this.locatorHelper.getInputByLabel('Schedule Date'),
      scheduleTimeInput: this.locatorHelper.getInputByLabel('Schedule Time'),
      
      // Delivery options
      deliverySection: this.locatorHelper.getByTestId('delivery-section'),
      deliveryReceiptCheckbox: this.locatorHelper.getInputByLabel('Request Delivery Receipt'),
      readReceiptCheckbox: this.locatorHelper.getInputByLabel('Request Read Receipt'),
      
      // Signature
      signatureSection: this.locatorHelper.getByTestId('signature-section'),
      signatureSelect: this.locatorHelper.getInputByLabel('Signature'),
      includeSignatureCheckbox: this.locatorHelper.getInputByLabel('Include Signature'),
      
      // Form buttons
      sendButton: this.locatorHelper.getButtonByText('Send'),
      saveButton: this.locatorHelper.getButtonByText('Save'),
      saveDraftButton: this.locatorHelper.getButtonByText('Save Draft'),
      cancelButton: this.locatorHelper.getButtonByText('Cancel'),
      closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                        this.locatorHelper.getLocator('.close, .btn-close'),
      
      // View correspondence modal
      viewModal: this.locatorHelper.getByTestId('view-modal'),
      correspondenceContent: this.locatorHelper.getByTestId('correspondence-content'),
      correspondenceHeader: this.locatorHelper.getByTestId('correspondence-header'),
      correspondenceBody: this.locatorHelper.getByTestId('correspondence-body'),
      correspondenceAttachments: this.locatorHelper.getByTestId('correspondence-attachments'),
      
      // Bulk actions
      selectAllCheckbox: this.locatorHelper.getInputByLabel('Select All'),
      bulkActionsDropdown: this.locatorHelper.getByTestId('bulk-actions-dropdown'),
      bulkDeleteOption: this.locatorHelper.getByText('Delete Selected'),
      bulkArchiveOption: this.locatorHelper.getByText('Archive Selected'),
      bulkMarkReadOption: this.locatorHelper.getByText('Mark as Read'),
      bulkMarkUnreadOption: this.locatorHelper.getByText('Mark as Unread'),
      
      // Pagination
      pagination: this.locatorHelper.getByTestId('pagination') ||
                  this.locatorHelper.getLocator('.pagination'),
      previousPageButton: this.locatorHelper.getButtonByText('Previous'),
      nextPageButton: this.locatorHelper.getButtonByText('Next'),
      pageInfo: this.locatorHelper.getByTestId('page-info'),
      
      // Statistics
      totalCorrespondenceCard: this.locatorHelper.getByText('Total Correspondence'),
      unreadCorrespondenceCard: this.locatorHelper.getByText('Unread'),
      sentTodayCard: this.locatorHelper.getByText('Sent Today'),
      pendingCard: this.locatorHelper.getByText('Pending'),
    };
  }

  /**
   * Navigate to Correspondence page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/correspondence');
  }

  /**
   * Wait for page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.pageTitle);
    await this.waitHelper.waitForElement(this.locators.correspondenceTable);
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
   * Search correspondence
   */
  public async searchCorrespondence(searchTerm: string): Promise<void> {
    await this.actionHelper.fillInputByPlaceholder('Search correspondence...', searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Filter by type
   */
  public async filterByType(type: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.typeFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.typeFilter.toString(), type);
  }

  /**
   * Filter by status
   */
  public async filterByStatus(status: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.statusFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
  }

  /**
   * Filter by priority
   */
  public async filterByPriority(priority: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.priorityFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.priorityFilter.toString(), priority);
  }

  /**
   * Navigate to section
   */
  public async navigateToSection(section: string): Promise<void> {
    const sectionElement = this.locatorHelper.getByText(section);
    await this.actionHelper.clickLocator(sectionElement);
    await this.waitForLoadingToComplete();
  }

  /**
   * Compose new correspondence
   */
  public async clickCompose(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.composeButton);
    await this.waitHelper.waitForElement(this.locators.composeModal);
  }

  /**
   * Fill correspondence form
   */
  public async fillCorrespondenceForm(correspondenceData: {
    type: string;
    to: string;
    cc?: string;
    bcc?: string;
    client?: string;
    subject: string;
    priority: string;
    message: string;
  }): Promise<void> {
    await this.actionHelper.selectCustomDropdown(this.locators.typeSelect.toString(), correspondenceData.type);
    await this.actionHelper.fillInputByLabel('To', correspondenceData.to);
    
    if (correspondenceData.cc) {
      await this.actionHelper.fillInputByLabel('CC', correspondenceData.cc);
    }
    
    if (correspondenceData.bcc) {
      await this.actionHelper.fillInputByLabel('BCC', correspondenceData.bcc);
    }
    
    if (correspondenceData.client) {
      await this.actionHelper.selectCustomDropdown(this.locators.clientSelect.toString(), correspondenceData.client);
    }
    
    await this.actionHelper.fillInputByLabel('Subject', correspondenceData.subject);
    await this.actionHelper.selectCustomDropdown(this.locators.prioritySelect.toString(), correspondenceData.priority);
    await this.actionHelper.fillInputByLabel('Message', correspondenceData.message);
  }

  /**
   * Format message text
   */
  public async formatText(format: 'bold' | 'italic' | 'underline'): Promise<void> {
    switch (format) {
      case 'bold':
        await this.actionHelper.clickLocator(this.locators.boldButton);
        break;
      case 'italic':
        await this.actionHelper.clickLocator(this.locators.italicButton);
        break;
      case 'underline':
        await this.actionHelper.clickLocator(this.locators.underlineButton);
        break;
    }
  }

  /**
   * Attach file
   */
  public async attachFile(filePath: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.attachFileButton);
    await this.actionHelper.uploadFile(this.locators.fileInput.toString(), filePath);
  }

  /**
   * Use template
   */
  public async useTemplate(templateName: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.templatesDropdown);
    await this.actionHelper.selectCustomDropdown(this.locators.templatesDropdown.toString(), templateName);
    await this.actionHelper.clickLocator(this.locators.useTemplateButton);
  }

  /**
   * Save as template
   */
  public async saveAsTemplate(templateName: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.saveAsTemplateButton);
    await this.actionHelper.fillInputByLabel('Template Name', templateName);
    await this.actionHelper.clickLocator(this.locators.saveButton);
  }

  /**
   * Schedule correspondence
   */
  public async scheduleCorrespondence(scheduleData: {
    date: string;
    time: string;
  }): Promise<void> {
    await this.actionHelper.checkCheckbox(this.locators.scheduleCheckbox.toString());
    await this.actionHelper.fillInputByLabel('Schedule Date', scheduleData.date);
    await this.actionHelper.fillInputByLabel('Schedule Time', scheduleData.time);
  }

  /**
   * Configure delivery options
   */
  public async configureDeliveryOptions(options: {
    deliveryReceipt?: boolean;
    readReceipt?: boolean;
  }): Promise<void> {
    if (options.deliveryReceipt) {
      await this.actionHelper.checkCheckbox(this.locators.deliveryReceiptCheckbox.toString());
    }
    
    if (options.readReceipt) {
      await this.actionHelper.checkCheckbox(this.locators.readReceiptCheckbox.toString());
    }
  }

  /**
   * Include signature
   */
  public async includeSignature(signatureName?: string): Promise<void> {
    await this.actionHelper.checkCheckbox(this.locators.includeSignatureCheckbox.toString());
    
    if (signatureName) {
      await this.actionHelper.selectCustomDropdown(this.locators.signatureSelect.toString(), signatureName);
    }
  }

  /**
   * Send correspondence
   */
  public async sendCorrespondence(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.sendButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.composeModal);
  }

  /**
   * Save as draft
   */
  public async saveDraft(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.saveDraftButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.composeModal);
  }

  /**
   * Cancel correspondence
   */
  public async cancelCorrespondence(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.cancelButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.composeModal);
  }

  /**
   * View correspondence
   */
  public async viewCorrespondence(correspondenceId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', correspondenceId);
    const viewButton = row.locator('button:has-text("View")');
    await this.actionHelper.clickLocator(viewButton);
    await this.waitHelper.waitForElement(this.locators.viewModal);
  }

  /**
   * Reply to correspondence
   */
  public async replyToCorrespondence(correspondenceId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', correspondenceId);
    const replyButton = row.locator('button:has-text("Reply")');
    await this.actionHelper.clickLocator(replyButton);
    await this.waitHelper.waitForElement(this.locators.composeModal);
  }

  /**
   * Forward correspondence
   */
  public async forwardCorrespondence(correspondenceId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', correspondenceId);
    const forwardButton = row.locator('button:has-text("Forward")');
    await this.actionHelper.clickLocator(forwardButton);
    await this.waitHelper.waitForElement(this.locators.composeModal);
  }

  /**
   * Delete correspondence
   */
  public async deleteCorrespondence(correspondenceId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', correspondenceId);
    const deleteButton = row.locator('button:has-text("Delete")');
    await this.actionHelper.clickLocator(deleteButton);
  }

  /**
   * Archive correspondence
   */
  public async archiveCorrespondence(correspondenceId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', correspondenceId);
    const archiveButton = row.locator('button:has-text("Archive")');
    await this.actionHelper.clickLocator(archiveButton);
  }

  /**
   * Select multiple correspondence items
   */
  public async selectCorrespondenceItems(correspondenceIds: string[]): Promise<void> {
    for (const id of correspondenceIds) {
      const row = this.locatorHelper.getContainingText('tr', id);
      const checkbox = row.locator('input[type="checkbox"]');
      await this.actionHelper.checkCheckbox(checkbox.toString());
    }
  }

  /**
   * Perform bulk action
   */
  public async performBulkAction(action: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.bulkActionsDropdown);
    const actionOption = this.locatorHelper.getByText(action);
    await this.actionHelper.clickLocator(actionOption);
  }

  /**
   * Get correspondence status
   */
  public async getCorrespondenceStatus(correspondenceId: string): Promise<string> {
    const row = this.locatorHelper.getContainingText('tr', correspondenceId);
    const statusCell = row.locator('td').nth(7); // Assuming status is 8th column
    return await this.actionHelper.getTrimmedText(statusCell);
  }

  /**
   * Get total correspondence count
   */
  public async getTotalCorrespondenceCount(): Promise<string> {
    const card = this.locatorHelper.getContainingText('.card', 'Total Correspondence');
    const countElement = card.locator('.count, .number').first();
    return await this.actionHelper.getTrimmedText(countElement);
  }

  /**
   * Get unread correspondence count
   */
  public async getUnreadCorrespondenceCount(): Promise<string> {
    const card = this.locatorHelper.getContainingText('.card', 'Unread');
    const countElement = card.locator('.count, .number').first();
    return await this.actionHelper.getTrimmedText(countElement);
  }

  /**
   * Refresh correspondence list
   */
  public async refreshCorrespondence(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.refreshButton);
    await this.waitForLoadingToComplete();
  }
}