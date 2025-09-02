import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * ActivitiesPage - Page Object Model for Activities functionality
 * Contains all locators and interactions for managing activities
 */
export class ActivitiesPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Page header
      pageTitle: this.locatorHelper.getByText('Activities'),
      breadcrumb: this.locatorHelper.getByTestId('breadcrumb') || 
                  this.locatorHelper.getLocator('.breadcrumb'),
      
      // Search and filters
      searchInput: this.locatorHelper.getInputByPlaceholder('Search activities...') ||
                   this.locatorHelper.getByTestId('search-input'),
      filterDropdown: this.locatorHelper.getByTestId('filter-dropdown') ||
                      this.locatorHelper.getLocator('.filter-dropdown'),
      typeFilter: this.locatorHelper.getByTestId('type-filter'),
      statusFilter: this.locatorHelper.getByTestId('status-filter'),
      dateRangeFilter: this.locatorHelper.getByTestId('date-range-filter'),
      
      // Action buttons
      createActivityButton: this.locatorHelper.getButtonByText('Create Activity') ||
                            this.locatorHelper.getByTestId('create-activity-btn'),
      exportButton: this.locatorHelper.getButtonByText('Export') ||
                    this.locatorHelper.getByTestId('export-btn'),
      refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                     this.locatorHelper.getByTestId('refresh-btn'),
      
      // View toggles
      listViewButton: this.locatorHelper.getButtonByText('List View') ||
                      this.locatorHelper.getByTestId('list-view-btn'),
      calendarViewButton: this.locatorHelper.getButtonByText('Calendar View') ||
                          this.locatorHelper.getByTestId('calendar-view-btn'),
      
      // Table elements (List View)
      activitiesTable: this.locatorHelper.getByTestId('activities-table') ||
                       this.locatorHelper.getLocator('table'),
      tableHeaders: this.locatorHelper.getLocator('thead th'),
      tableRows: this.locatorHelper.getLocator('tbody tr'),
      
      // Table columns
      activityIdColumn: this.locatorHelper.getByText('Activity ID'),
      titleColumn: this.locatorHelper.getByText('Title'),
      typeColumn: this.locatorHelper.getByText('Type'),
      clientColumn: this.locatorHelper.getByText('Client'),
      advisorColumn: this.locatorHelper.getByText('Advisor'),
      statusColumn: this.locatorHelper.getByText('Status'),
      dueDateColumn: this.locatorHelper.getByText('Due Date'),
      priorityColumn: this.locatorHelper.getByText('Priority'),
      actionsColumn: this.locatorHelper.getByText('Actions'),
      
      // Calendar elements (Calendar View)
      calendarContainer: this.locatorHelper.getByTestId('calendar-container') ||
                         this.locatorHelper.getLocator('.calendar'),
      monthView: this.locatorHelper.getByTestId('month-view'),
      weekView: this.locatorHelper.getByTestId('week-view'),
      dayView: this.locatorHelper.getByTestId('day-view'),
      calendarNavigation: this.locatorHelper.getByTestId('calendar-nav'),
      previousMonthButton: this.locatorHelper.getButtonByText('Previous'),
      nextMonthButton: this.locatorHelper.getButtonByText('Next'),
      todayButton: this.locatorHelper.getButtonByText('Today'),
      
      // Row/Event actions
      viewButton: this.locatorHelper.getButtonByText('View'),
      editButton: this.locatorHelper.getButtonByText('Edit'),
      completeButton: this.locatorHelper.getButtonByText('Complete'),
      deleteButton: this.locatorHelper.getButtonByText('Delete'),
      
      // Status indicators
      pendingStatus: this.locatorHelper.getByText('Pending'),
      inProgressStatus: this.locatorHelper.getByText('In Progress'),
      completedStatus: this.locatorHelper.getByText('Completed'),
      overdueStatus: this.locatorHelper.getByText('Overdue'),
      
      // Priority indicators
      highPriority: this.locatorHelper.getByText('High'),
      mediumPriority: this.locatorHelper.getByText('Medium'),
      lowPriority: this.locatorHelper.getByText('Low'),
      
      // Modal/Form elements
      activityModal: this.locatorHelper.getByTestId('activity-modal') ||
                     this.locatorHelper.getLocator('.modal'),
      modalTitle: this.locatorHelper.getByTestId('modal-title'),
      titleInput: this.locatorHelper.getInputByLabel('Title'),
      typeSelect: this.locatorHelper.getInputByLabel('Type'),
      clientSelect: this.locatorHelper.getInputByLabel('Client'),
      advisorSelect: this.locatorHelper.getInputByLabel('Advisor'),
      descriptionTextarea: this.locatorHelper.getInputByLabel('Description'),
      dueDateInput: this.locatorHelper.getInputByLabel('Due Date'),
      prioritySelect: this.locatorHelper.getInputByLabel('Priority'),
      statusSelect: this.locatorHelper.getInputByLabel('Status'),
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
   * Navigate to Activities page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/activities');
  }

  /**
   * Wait for page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.pageTitle);
    // Wait for either table or calendar view to load
    try {
      await this.waitHelper.waitForElement(this.locators.activitiesTable, 2000);
    } catch {
      await this.waitHelper.waitForElement(this.locators.calendarContainer);
    }
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
   * Search for activities
   */
  public async searchActivities(searchTerm: string): Promise<void> {
    await this.actionHelper.fillInputByPlaceholder('Search activities...', searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Filter activities by type
   */
  public async filterByType(type: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.typeFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.typeFilter.toString(), type);
  }

  /**
   * Filter activities by status
   */
  public async filterByStatus(status: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.statusFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
  }

  /**
   * Switch to list view
   */
  public async switchToListView(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.listViewButton);
    await this.waitHelper.waitForElement(this.locators.activitiesTable);
  }

  /**
   * Switch to calendar view
   */
  public async switchToCalendarView(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.calendarViewButton);
    await this.waitHelper.waitForElement(this.locators.calendarContainer);
  }

  /**
   * Create new activity
   */
  public async clickCreateActivity(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.createActivityButton);
    await this.waitHelper.waitForElement(this.locators.activityModal);
  }

  /**
   * Fill activity form
   */
  public async fillActivityForm(activityData: {
    title: string;
    type: string;
    client: string;
    advisor: string;
    description: string;
    dueDate: string;
    priority: string;
    status?: string;
  }): Promise<void> {
    await this.actionHelper.fillInputByLabel('Title', activityData.title);
    await this.actionHelper.selectCustomDropdown(this.locators.typeSelect.toString(), activityData.type);
    await this.actionHelper.selectCustomDropdown(this.locators.clientSelect.toString(), activityData.client);
    await this.actionHelper.selectCustomDropdown(this.locators.advisorSelect.toString(), activityData.advisor);
    await this.actionHelper.fillInputByLabel('Description', activityData.description);
    await this.actionHelper.fillInputByLabel('Due Date', activityData.dueDate);
    await this.actionHelper.selectCustomDropdown(this.locators.prioritySelect.toString(), activityData.priority);
    
    if (activityData.status) {
      await this.actionHelper.selectCustomDropdown(this.locators.statusSelect.toString(), activityData.status);
    }
  }

  /**
   * Save activity
   */
  public async saveActivity(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.saveButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.activityModal);
  }

  /**
   * Cancel activity creation/editing
   */
  public async cancelActivity(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.cancelButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.activityModal);
  }

  /**
   * View activity details
   */
  public async viewActivity(activityId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', activityId);
    const viewButton = row.locator('button:has-text("View")');
    await this.actionHelper.clickLocator(viewButton);
  }

  /**
   * Edit activity
   */
  public async editActivity(activityId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', activityId);
    const editButton = row.locator('button:has-text("Edit")');
    await this.actionHelper.clickLocator(editButton);
    await this.waitHelper.waitForElement(this.locators.activityModal);
  }

  /**
   * Complete activity
   */
  public async completeActivity(activityId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', activityId);
    const completeButton = row.locator('button:has-text("Complete")');
    await this.actionHelper.clickLocator(completeButton);
  }

  /**
   * Delete activity
   */
  public async deleteActivity(activityId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', activityId);
    const deleteButton = row.locator('button:has-text("Delete")');
    await this.actionHelper.clickLocator(deleteButton);
  }

  /**
   * Get activity count
   */
  public async getActivityCount(): Promise<number> {
    return await this.actionHelper.getElementCount('tbody tr');
  }

  /**
   * Get activity status
   */
  public async getActivityStatus(activityId: string): Promise<string> {
    const row = this.locatorHelper.getContainingText('tr', activityId);
    const statusCell = row.locator('td').nth(5); // Assuming status is 6th column
    return await this.actionHelper.getTrimmedText(statusCell);
  }

  /**
   * Navigate calendar to previous month
   */
  public async goToPreviousMonth(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.previousMonthButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Navigate calendar to next month
   */
  public async goToNextMonth(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.nextMonthButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Navigate calendar to today
   */
  public async goToToday(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.todayButton);
    await this.waitForLoadingToComplete();
  }

  /**
   * Export activities
   */
  public async exportActivities(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.exportButton);
  }

  /**
   * Refresh activities list
   */
  public async refreshActivities(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.refreshButton);
    await this.waitForLoadingToComplete();
  }
}