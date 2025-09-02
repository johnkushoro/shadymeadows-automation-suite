import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * ReportsPage - Page Object Model for Reports functionality
 * Contains all locators and interactions for report generation and management
 */
export class ReportsPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Page header
      pageTitle: this.locatorHelper.getByText('Reports'),
      breadcrumb: this.locatorHelper.getByTestId('breadcrumb') || 
                  this.locatorHelper.getLocator('.breadcrumb'),
      
      // Report categories
      clientReportsSection: this.locatorHelper.getByText('Client Reports'),
      portfolioReportsSection: this.locatorHelper.getByText('Portfolio Reports'),
      complianceReportsSection: this.locatorHelper.getByText('Compliance Reports'),
      performanceReportsSection: this.locatorHelper.getByText('Performance Reports'),
      auditReportsSection: this.locatorHelper.getByText('Audit Reports'),
      customReportsSection: this.locatorHelper.getByText('Custom Reports'),
      
      // Search and filters
      searchInput: this.locatorHelper.getInputByPlaceholder('Search reports...') ||
                   this.locatorHelper.getByTestId('search-input'),
      categoryFilter: this.locatorHelper.getByTestId('category-filter'),
      statusFilter: this.locatorHelper.getByTestId('status-filter'),
      dateRangeFilter: this.locatorHelper.getByTestId('date-range-filter'),
      createdByFilter: this.locatorHelper.getByTestId('created-by-filter'),
      
      // Action buttons
      createReportButton: this.locatorHelper.getButtonByText('Create Report') ||
                          this.locatorHelper.getByTestId('create-report-btn'),
      scheduleReportButton: this.locatorHelper.getButtonByText('Schedule Report') ||
                            this.locatorHelper.getByTestId('schedule-report-btn'),
      importTemplateButton: this.locatorHelper.getButtonByText('Import Template') ||
                            this.locatorHelper.getByTestId('import-template-btn'),
      refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                     this.locatorHelper.getByTestId('refresh-btn'),
      
      // Reports table
      reportsTable: this.locatorHelper.getByTestId('reports-table') ||
                    this.locatorHelper.getLocator('table'),
      tableHeaders: this.locatorHelper.getLocator('thead th'),
      tableRows: this.locatorHelper.getLocator('tbody tr'),
      
      // Table columns
      reportIdColumn: this.locatorHelper.getByText('Report ID'),
      nameColumn: this.locatorHelper.getByText('Name'),
      categoryColumn: this.locatorHelper.getByText('Category'),
      statusColumn: this.locatorHelper.getByText('Status'),
      createdByColumn: this.locatorHelper.getByText('Created By'),
      createdDateColumn: this.locatorHelper.getByText('Created Date'),
      lastRunColumn: this.locatorHelper.getByText('Last Run'),
      nextRunColumn: this.locatorHelper.getByText('Next Run'),
      actionsColumn: this.locatorHelper.getByText('Actions'),
      
      // Status indicators
      readyStatus: this.locatorHelper.getByText('Ready'),
      runningStatus: this.locatorHelper.getByText('Running'),
      completedStatus: this.locatorHelper.getByText('Completed'),
      failedStatus: this.locatorHelper.getByText('Failed'),
      scheduledStatus: this.locatorHelper.getByText('Scheduled'),
      
      // Row actions
      runButton: this.locatorHelper.getButtonByText('Run'),
      viewButton: this.locatorHelper.getButtonByText('View'),
      editButton: this.locatorHelper.getButtonByText('Edit'),
      downloadButton: this.locatorHelper.getButtonByText('Download'),
      scheduleButton: this.locatorHelper.getButtonByText('Schedule'),
      duplicateButton: this.locatorHelper.getButtonByText('Duplicate'),
      deleteButton: this.locatorHelper.getButtonByText('Delete'),
      
      // Report builder modal
      reportBuilderModal: this.locatorHelper.getByTestId('report-builder-modal') ||
                          this.locatorHelper.getLocator('.modal'),
      modalTitle: this.locatorHelper.getByTestId('modal-title'),
      
      // Report configuration
      reportNameInput: this.locatorHelper.getInputByLabel('Report Name'),
      reportDescriptionTextarea: this.locatorHelper.getInputByLabel('Description'),
      reportCategorySelect: this.locatorHelper.getInputByLabel('Category'),
      reportTypeSelect: this.locatorHelper.getInputByLabel('Report Type'),
      
      // Data source selection
      dataSourceSection: this.locatorHelper.getByTestId('data-source-section'),
      clientsDataSource: this.locatorHelper.getInputByLabel('Clients'),
      portfoliosDataSource: this.locatorHelper.getInputByLabel('Portfolios'),
      transactionsDataSource: this.locatorHelper.getInputByLabel('Transactions'),
      performanceDataSource: this.locatorHelper.getInputByLabel('Performance'),
      
      // Field selection
      fieldsSection: this.locatorHelper.getByTestId('fields-section'),
      availableFields: this.locatorHelper.getByTestId('available-fields'),
      selectedFields: this.locatorHelper.getByTestId('selected-fields'),
      addFieldButton: this.locatorHelper.getButtonByText('Add Field'),
      removeFieldButton: this.locatorHelper.getButtonByText('Remove Field'),
      
      // Filters section
      filtersSection: this.locatorHelper.getByTestId('filters-section'),
      addFilterButton: this.locatorHelper.getButtonByText('Add Filter'),
      filterFieldSelect: this.locatorHelper.getInputByLabel('Filter Field'),
      filterOperatorSelect: this.locatorHelper.getInputByLabel('Operator'),
      filterValueInput: this.locatorHelper.getInputByLabel('Value'),
      
      // Sorting and grouping
      sortingSection: this.locatorHelper.getByTestId('sorting-section'),
      sortFieldSelect: this.locatorHelper.getInputByLabel('Sort By'),
      sortOrderSelect: this.locatorHelper.getInputByLabel('Order'),
      groupBySelect: this.locatorHelper.getInputByLabel('Group By'),
      
      // Output format
      formatSection: this.locatorHelper.getByTestId('format-section'),
      pdfFormat: this.locatorHelper.getInputByLabel('PDF'),
      excelFormat: this.locatorHelper.getInputByLabel('Excel'),
      csvFormat: this.locatorHelper.getInputByLabel('CSV'),
      htmlFormat: this.locatorHelper.getInputByLabel('HTML'),
      
      // Scheduling options
      schedulingSection: this.locatorHelper.getByTestId('scheduling-section'),
      scheduleEnabledCheckbox: this.locatorHelper.getInputByLabel('Enable Scheduling'),
      frequencySelect: this.locatorHelper.getInputByLabel('Frequency'),
      startDateInput: this.locatorHelper.getInputByLabel('Start Date'),
      endDateInput: this.locatorHelper.getInputByLabel('End Date'),
      timeInput: this.locatorHelper.getInputByLabel('Time'),
      emailRecipientsInput: this.locatorHelper.getInputByLabel('Email Recipients'),
      
      // Report preview
      previewSection: this.locatorHelper.getByTestId('preview-section'),
      previewButton: this.locatorHelper.getButtonByText('Preview'),
      previewContainer: this.locatorHelper.getByTestId('preview-container'),
      
      // Report templates
      templatesSection: this.locatorHelper.getByTestId('templates-section'),
      templatesList: this.locatorHelper.getByTestId('templates-list'),
      useTemplateButton: this.locatorHelper.getButtonByText('Use Template'),
      saveAsTemplateButton: this.locatorHelper.getButtonByText('Save as Template'),
      
      // Quick reports
      quickReportsSection: this.locatorHelper.getByTestId('quick-reports'),
      clientSummaryReport: this.locatorHelper.getButtonByText('Client Summary'),
      portfolioPerformanceReport: this.locatorHelper.getButtonByText('Portfolio Performance'),
      transactionHistoryReport: this.locatorHelper.getButtonByText('Transaction History'),
      complianceStatusReport: this.locatorHelper.getButtonByText('Compliance Status'),
      
      // Report history
      historySection: this.locatorHelper.getByTestId('history-section'),
      historyTable: this.locatorHelper.getByTestId('history-table'),
      historyEntries: this.locatorHelper.getLocator('.history-entry'),
      
      // Common form buttons
      saveButton: this.locatorHelper.getButtonByText('Save'),
      runReportButton: this.locatorHelper.getButtonByText('Run Report'),
      cancelButton: this.locatorHelper.getButtonByText('Cancel'),
      closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                        this.locatorHelper.getLocator('.close, .btn-close'),
      
      // Pagination
      pagination: this.locatorHelper.getByTestId('pagination') ||
                  this.locatorHelper.getLocator('.pagination'),
      previousPageButton: this.locatorHelper.getButtonByText('Previous'),
      nextPageButton: this.locatorHelper.getButtonByText('Next'),
      pageInfo: this.locatorHelper.getByTestId('page-info'),
      
      // Statistics
      totalReportsCard: this.locatorHelper.getByText('Total Reports'),
      scheduledReportsCard: this.locatorHelper.getByText('Scheduled Reports'),
      recentRunsCard: this.locatorHelper.getByText('Recent Runs'),
      failedReportsCard: this.locatorHelper.getByText('Failed Reports'),
    };
  }

  /**
   * Navigate to Reports page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/reports');
  }

  /**
   * Wait for page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.pageTitle);
    await this.waitHelper.waitForElement(this.locators.reportsTable);
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
   * Search reports
   */
  public async searchReports(searchTerm: string): Promise<void> {
    await this.actionHelper.fillInputByPlaceholder('Search reports...', searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Filter by category
   */
  public async filterByCategory(category: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.categoryFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.categoryFilter.toString(), category);
  }

  /**
   * Filter by status
   */
  public async filterByStatus(status: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.statusFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
  }

  /**
   * Create new report
   */
  public async clickCreateReport(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.createReportButton);
    await this.waitHelper.waitForElement(this.locators.reportBuilderModal);
  }

  /**
   * Fill basic report information
   */
  public async fillBasicReportInfo(reportData: {
    name: string;
    description: string;
    category: string;
    type: string;
  }): Promise<void> {
    await this.actionHelper.fillInputByLabel('Report Name', reportData.name);
    await this.actionHelper.fillInputByLabel('Description', reportData.description);
    await this.actionHelper.selectCustomDropdown(this.locators.reportCategorySelect.toString(), reportData.category);
    await this.actionHelper.selectCustomDropdown(this.locators.reportTypeSelect.toString(), reportData.type);
  }

  /**
   * Select data sources
   */
  public async selectDataSources(dataSources: string[]): Promise<void> {
    for (const source of dataSources) {
      const checkbox = this.locatorHelper.getInputByLabel(source);
      await this.actionHelper.checkCheckbox(checkbox.toString());
    }
  }

  /**
   * Add fields to report
   */
  public async addFields(fields: string[]): Promise<void> {
    for (const field of fields) {
      const fieldElement = this.locatorHelper.getContainingText('.available-field', field);
      await this.actionHelper.clickLocator(fieldElement);
      await this.actionHelper.clickLocator(this.locators.addFieldButton);
    }
  }

  /**
   * Add filter to report
   */
  public async addFilter(filterData: {
    field: string;
    operator: string;
    value: string;
  }): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.addFilterButton);
    await this.actionHelper.selectCustomDropdown(this.locators.filterFieldSelect.toString(), filterData.field);
    await this.actionHelper.selectCustomDropdown(this.locators.filterOperatorSelect.toString(), filterData.operator);
    await this.actionHelper.fillInputByLabel('Value', filterData.value);
  }

  /**
   * Configure sorting
   */
  public async configureSorting(sortData: {
    field: string;
    order: string;
    groupBy?: string;
  }): Promise<void> {
    await this.actionHelper.selectCustomDropdown(this.locators.sortFieldSelect.toString(), sortData.field);
    await this.actionHelper.selectCustomDropdown(this.locators.sortOrderSelect.toString(), sortData.order);
    
    if (sortData.groupBy) {
      await this.actionHelper.selectCustomDropdown(this.locators.groupBySelect.toString(), sortData.groupBy);
    }
  }

  /**
   * Select output format
   */
  public async selectOutputFormat(format: string): Promise<void> {
    const formatCheckbox = this.locatorHelper.getInputByLabel(format);
    await this.actionHelper.checkCheckbox(formatCheckbox.toString());
  }

  /**
   * Configure scheduling
   */
  public async configureScheduling(scheduleData: {
    enabled: boolean;
    frequency?: string;
    startDate?: string;
    endDate?: string;
    time?: string;
    recipients?: string;
  }): Promise<void> {
    if (scheduleData.enabled) {
      await this.actionHelper.checkCheckbox(this.locators.scheduleEnabledCheckbox.toString());
      
      if (scheduleData.frequency) {
        await this.actionHelper.selectCustomDropdown(this.locators.frequencySelect.toString(), scheduleData.frequency);
      }
      
      if (scheduleData.startDate) {
        await this.actionHelper.fillInputByLabel('Start Date', scheduleData.startDate);
      }
      
      if (scheduleData.endDate) {
        await this.actionHelper.fillInputByLabel('End Date', scheduleData.endDate);
      }
      
      if (scheduleData.time) {
        await this.actionHelper.fillInputByLabel('Time', scheduleData.time);
      }
      
      if (scheduleData.recipients) {
        await this.actionHelper.fillInputByLabel('Email Recipients', scheduleData.recipients);
      }
    }
  }

  /**
   * Preview report
   */
  public async previewReport(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.previewButton);
    await this.waitHelper.waitForElement(this.locators.previewContainer);
  }

  /**
   * Save report
   */
  public async saveReport(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.saveButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.reportBuilderModal);
  }

  /**
   * Run report
   */
  public async runReport(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.runReportButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.reportBuilderModal);
  }

  /**
   * Cancel report creation/editing
   */
  public async cancelReport(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.cancelButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.reportBuilderModal);
  }

  /**
   * Run existing report
   */
  public async runExistingReport(reportId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', reportId);
    const runButton = row.locator('button:has-text("Run")');
    await this.actionHelper.clickLocator(runButton);
  }

  /**
   * Download report
   */
  public async downloadReport(reportId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', reportId);
    const downloadButton = row.locator('button:has-text("Download")');
    await this.actionHelper.clickLocator(downloadButton);
  }

  /**
   * Schedule existing report
   */
  public async scheduleExistingReport(reportId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', reportId);
    const scheduleButton = row.locator('button:has-text("Schedule")');
    await this.actionHelper.clickLocator(scheduleButton);
  }

  /**
   * Edit report
   */
  public async editReport(reportId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', reportId);
    const editButton = row.locator('button:has-text("Edit")');
    await this.actionHelper.clickLocator(editButton);
    await this.waitHelper.waitForElement(this.locators.reportBuilderModal);
  }

  /**
   * Delete report
   */
  public async deleteReport(reportId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', reportId);
    const deleteButton = row.locator('button:has-text("Delete")');
    await this.actionHelper.clickLocator(deleteButton);
  }

  /**
   * Use template
   */
  public async useTemplate(templateName: string): Promise<void> {
    const templateElement = this.locatorHelper.getContainingText('.template-item', templateName);
    const useButton = templateElement.locator('button:has-text("Use Template")');
    await this.actionHelper.clickLocator(useButton);
    await this.waitHelper.waitForElement(this.locators.reportBuilderModal);
  }

  /**
   * Run quick report
   */
  public async runQuickReport(reportType: string): Promise<void> {
    const quickReportButton = this.locatorHelper.getButtonByText(reportType);
    await this.actionHelper.clickLocator(quickReportButton);
  }

  /**
   * Get report status
   */
  public async getReportStatus(reportId: string): Promise<string> {
    const row = this.locatorHelper.getContainingText('tr', reportId);
    const statusCell = row.locator('td').nth(3); // Assuming status is 4th column
    return await this.actionHelper.getTrimmedText(statusCell);
  }

  /**
   * Get total reports count
   */
  public async getTotalReportsCount(): Promise<string> {
    const card = this.locatorHelper.getContainingText('.card', 'Total Reports');
    const countElement = card.locator('.count, .number').first();
    return await this.actionHelper.getTrimmedText(countElement);
  }

  /**
   * Refresh reports list
   */
  public async refreshReports(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.refreshButton);
    await this.waitForLoadingToComplete();
  }
}