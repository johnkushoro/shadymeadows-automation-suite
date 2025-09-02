import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * DashboardPage - Page Object Model for the main development dashboard
 * Contains all locators and interactions for the dashboard and side menu navigation
 */
export class DashboardPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Dashboard header
      dashboardTitle: this.locatorHelper.getByText('Development Dashboard'),
      userProfile: this.locatorHelper.getByTestId('user-profile') || 
                   this.locatorHelper.getLocator('.user-profile'),
      logoutButton: this.locatorHelper.getByText('Log out'),
      
      // Search functionality
      searchInput: this.locatorHelper.getInputByPlaceholder('Search For Clients,Policies,Advisers') ||
                   this.locatorHelper.getByTestId('search-input'),
      
      // Dashboard metrics cards
      totalLiveUsers: this.locatorHelper.getByText('Total Live Users').locator('..'),
      liveAdvisers: this.locatorHelper.getByText('Live Advisers').locator('..'),
      helpdeskUsers: this.locatorHelper.getByText('Helpdesk Users').locator('..'),
      clientsMetric: this.locatorHelper.getByText('Clients').locator('..'),
      policies: this.locatorHelper.getByText('Policies').locator('..'),
      ids: this.locatorHelper.getByText('IDs').locator('..'),
      riskProfiles: this.locatorHelper.getByText('Risk Profiles').locator('..'),
      factFindsOpened: this.locatorHelper.getByText('Fact Finds Opened').locator('..'),
      documents: this.locatorHelper.getByText('Documents').locator('..'),
      unmappedDocuments: this.locatorHelper.getByText('Unmapped Documents').locator('..'),
      
      // Side menu navigation items
      sideMenu: this.locatorHelper.getByTestId('side-menu') ||
                this.locatorHelper.getLocator('.sidebar, .side-menu'),
      
      // Main navigation items
      workAllocationRequests: this.locatorHelper.getByText('Work Allocation Requests'),
      activities: this.locatorHelper.getByText('Activities'),
      administration: this.locatorHelper.getByText('Administration'),
      advisers: this.locatorHelper.getByText('Advisers'),
      calendar: this.locatorHelper.getByText('Calendar'),
      caseManagement: this.locatorHelper.getByText('Case Management'),
      clients: this.locatorHelper.getByText('Clients'),
      compliance: this.locatorHelper.getByText('Compliance'),
      correspondence: this.locatorHelper.getByText('Correspondence'),
      customerProgramme: this.locatorHelper.getByText('Customer Programme'),
      fastrak: this.locatorHelper.getByText('Fastrak'),
      generalAdmin: this.locatorHelper.getByText('General Admin'),
      intranet: this.locatorHelper.getByText('Intranet'),
      investmentHub: this.locatorHelper.getByText('Investment Hub'),
      knowledgeBase: this.locatorHelper.getByText('Knowledge Base'),
      productsProviders: this.locatorHelper.getByText('Products / Providers'),
      reports: this.locatorHelper.getByText('Reports'),
      secureMessaging: this.locatorHelper.getByText('Secure Messaging'),
      supportHelpdesk: this.locatorHelper.getByText('Support Helpdesk'),
      systemMIInformation: this.locatorHelper.getByText('System MI Information'),
      unmappedStore: this.locatorHelper.getByText('Unmapped Store'),
      
      // Chart sections
      submissionsByWeekChart: this.locatorHelper.getByText('Submissions By Week'),
      submissionsByAdviserChart: this.locatorHelper.getByText('Submissions By Adviser'),
    };
  }

  /**
   * Navigate to dashboard page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/dashboard/development/dash');
  }

  /**
   * Wait for dashboard page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.dashboardTitle);
    await this.waitHelper.waitForElement(this.locators.sideMenu);
    await this.waitHelper.waitForElement(this.locators.searchInput);
  }

  /**
   * Check if we're on the dashboard page
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
   * Search for clients, policies, or advisers
   */
  public async search(searchTerm: string): Promise<void> {
    await this.actionHelper.fillInputByPlaceholder('Search For Clients,Policies,Advisers', searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Click on Work Allocation Requests menu item
   */
  public async clickWorkAllocationRequests(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.workAllocationRequests);
  }

  /**
   * Click on Activities menu item
   */
  public async clickActivities(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.activities);
  }

  /**
   * Click on Administration menu item
   */
  public async clickAdministration(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.administration);
  }

  /**
   * Click on Advisers menu item
   */
  public async clickAdvisers(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.advisers);
  }

  /**
   * Click on Calendar menu item
   */
  public async clickCalendar(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.calendar);
  }

  /**
   * Click on Case Management menu item
   */
  public async clickCaseManagement(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.caseManagement);
  }

  /**
   * Click on Clients menu item
   */
  public async clickClients(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.clients);
  }

  /**
   * Click on Compliance menu item
   */
  public async clickCompliance(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.compliance);
  }

  /**
   * Click on Correspondence menu item
   */
  public async clickCorrespondence(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.correspondence);
  }

  /**
   * Click on Customer Programme menu item
   */
  public async clickCustomerProgramme(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.customerProgramme);
  }

  /**
   * Click on Fastrak menu item
   */
  public async clickFastrak(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.fastrak);
  }

  /**
   * Click on General Admin menu item
   */
  public async clickGeneralAdmin(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.generalAdmin);
  }

  /**
   * Click on Intranet menu item
   */
  public async clickIntranet(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.intranet);
  }

  /**
   * Click on Investment Hub menu item
   */
  public async clickInvestmentHub(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.investmentHub);
  }

  /**
   * Click on Knowledge Base menu item
   */
  public async clickKnowledgeBase(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.knowledgeBase);
  }

  /**
   * Click on Products / Providers menu item
   */
  public async clickProductsProviders(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.productsProviders);
  }

  /**
   * Click on Reports menu item
   */
  public async clickReports(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.reports);
  }

  /**
   * Click on Secure Messaging menu item
   */
  public async clickSecureMessaging(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.secureMessaging);
  }

  /**
   * Click on Support Helpdesk menu item
   */
  public async clickSupportHelpdesk(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.supportHelpdesk);
  }

  /**
   * Click on System MI Information menu item
   */
  public async clickSystemMIInformation(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.systemMIInformation);
  }

  /**
   * Click on Unmapped Store menu item
   */
  public async clickUnmappedStore(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.unmappedStore);
  }

  /**
   * Get metric value by name
   */
  public async getMetricValue(metricName: string): Promise<string> {
    const metricLocator = this.locatorHelper.getByText(metricName).locator('..');
    const valueElement = metricLocator.locator('.metric-value, .count, .number').first();
    return await this.actionHelper.getTrimmedText(valueElement);
  }

  /**
   * Logout from the application
   */
  public async logout(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.logoutButton);
  }

  /**
   * Check if user is logged in
   */
  public async isUserLoggedIn(): Promise<boolean> {
    return await this.actionHelper.isVisible(this.locators.userProfile.toString());
  }
}