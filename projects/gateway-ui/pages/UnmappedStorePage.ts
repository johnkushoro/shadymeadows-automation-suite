import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';

/**
 * UnmappedStorePage - Page Object Model for Unmapped Store functionality
 * Contains all locators and interactions for managing unmapped documents and data
 */
export class UnmappedStorePage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Locators
  public get locators() {
    return {
      // Page header
      pageTitle: this.locatorHelper.getByText('Unmapped Store'),
      breadcrumb: this.locatorHelper.getByTestId('breadcrumb') || 
                  this.locatorHelper.getLocator('.breadcrumb'),
      
      // Search and filters
      searchInput: this.locatorHelper.getInputByPlaceholder('Search unmapped items...') ||
                   this.locatorHelper.getByTestId('search-input'),
      typeFilter: this.locatorHelper.getByTestId('type-filter'),
      statusFilter: this.locatorHelper.getByTestId('status-filter'),
      dateRangeFilter: this.locatorHelper.getByTestId('date-range-filter'),
      sourceFilter: this.locatorHelper.getByTestId('source-filter'),
      
      // Action buttons
      mapItemButton: this.locatorHelper.getButtonByText('Map Item') ||
                     this.locatorHelper.getByTestId('map-item-btn'),
      bulkMapButton: this.locatorHelper.getButtonByText('Bulk Map') ||
                     this.locatorHelper.getByTestId('bulk-map-btn'),
      deleteButton: this.locatorHelper.getButtonByText('Delete') ||
                    this.locatorHelper.getByTestId('delete-btn'),
      exportButton: this.locatorHelper.getButtonByText('Export') ||
                    this.locatorHelper.getByTestId('export-btn'),
      refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                     this.locatorHelper.getByTestId('refresh-btn'),
      
      // Unmapped items table
      unmappedTable: this.locatorHelper.getByTestId('unmapped-table') ||
                     this.locatorHelper.getLocator('table'),
      tableHeaders: this.locatorHelper.getLocator('thead th'),
      tableRows: this.locatorHelper.getLocator('tbody tr'),
      
      // Table columns
      selectColumn: this.locatorHelper.getByText('Select'),
      itemIdColumn: this.locatorHelper.getByText('Item ID'),
      typeColumn: this.locatorHelper.getByText('Type'),
      titleColumn: this.locatorHelper.getByText('Title'),
      sourceColumn: this.locatorHelper.getByText('Source'),
      receivedDateColumn: this.locatorHelper.getByText('Received Date'),
      statusColumn: this.locatorHelper.getByText('Status'),
      sizeColumn: this.locatorHelper.getByText('Size'),
      actionsColumn: this.locatorHelper.getByText('Actions'),
      
      // Item types
      documentType: this.locatorHelper.getByText('Document'),
      emailType: this.locatorHelper.getByText('Email'),
      imageType: this.locatorHelper.getByText('Image'),
      dataType: this.locatorHelper.getByText('Data'),
      attachmentType: this.locatorHelper.getByText('Attachment'),
      
      // Status indicators
      unmappedStatus: this.locatorHelper.getByText('Unmapped'),
      pendingStatus: this.locatorHelper.getByText('Pending'),
      mappedStatus: this.locatorHelper.getByText('Mapped'),
      errorStatus: this.locatorHelper.getByText('Error'),
      processingStatus: this.locatorHelper.getByText('Processing'),
      
      // Source indicators
      emailSource: this.locatorHelper.getByText('Email'),
      uploadSource: this.locatorHelper.getByText('Upload'),
      scanSource: this.locatorHelper.getByText('Scan'),
      importSource: this.locatorHelper.getByText('Import'),
      apiSource: this.locatorHelper.getByText('API'),
      
      // Row actions
      viewButton: this.locatorHelper.getButtonByText('View'),
      mapButton: this.locatorHelper.getButtonByText('Map'),
      downloadButton: this.locatorHelper.getButtonByText('Download'),
      previewButton: this.locatorHelper.getButtonByText('Preview'),
      deleteItemButton: this.locatorHelper.getButtonByText('Delete'),
      
      // Mapping modal
      mappingModal: this.locatorHelper.getByTestId('mapping-modal') ||
                    this.locatorHelper.getLocator('.modal'),
      modalTitle: this.locatorHelper.getByTestId('modal-title'),
      
      // Mapping form
      clientSelect: this.locatorHelper.getInputByLabel('Client'),
      advisorSelect: this.locatorHelper.getInputByLabel('Advisor'),
      categorySelect: this.locatorHelper.getInputByLabel('Category'),
      subcategorySelect: this.locatorHelper.getInputByLabel('Subcategory'),
      documentTypeSelect: this.locatorHelper.getInputByLabel('Document Type'),
      tagsInput: this.locatorHelper.getInputByLabel('Tags'),
      notesTextarea: this.locatorHelper.getInputByLabel('Notes'),
      
      // Auto-mapping suggestions
      suggestionsSection: this.locatorHelper.getByTestId('suggestions-section'),
      suggestionsList: this.locatorHelper.getByTestId('suggestions-list'),
      applySuggestionButton: this.locatorHelper.getButtonByText('Apply Suggestion'),
      
      // Preview section
      previewSection: this.locatorHelper.getByTestId('preview-section'),
      previewContainer: this.locatorHelper.getByTestId('preview-container'),
      previewImage: this.locatorHelper.getByTestId('preview-image'),
      previewText: this.locatorHelper.getByTestId('preview-text'),
      
      // Metadata section
      metadataSection: this.locatorHelper.getByTestId('metadata-section'),
      metadataTable: this.locatorHelper.getByTestId('metadata-table'),
      fileNameDisplay: this.locatorHelper.getByTestId('file-name'),
      fileSizeDisplay: this.locatorHelper.getByTestId('file-size'),
      fileTypeDisplay: this.locatorHelper.getByTestId('file-type'),
      createdDateDisplay: this.locatorHelper.getByTestId('created-date'),
      
      // OCR section (for scanned documents)
      ocrSection: this.locatorHelper.getByTestId('ocr-section'),
      ocrText: this.locatorHelper.getByTestId('ocr-text'),
      runOcrButton: this.locatorHelper.getButtonByText('Run OCR'),
      ocrConfidenceScore: this.locatorHelper.getByTestId('ocr-confidence'),
      
      // Bulk mapping
      bulkMappingModal: this.locatorHelper.getByTestId('bulk-mapping-modal'),
      bulkClientSelect: this.locatorHelper.getInputByLabel('Bulk Client'),
      bulkAdvisorSelect: this.locatorHelper.getInputByLabel('Bulk Advisor'),
      bulkCategorySelect: this.locatorHelper.getInputByLabel('Bulk Category'),
      selectedItemsCount: this.locatorHelper.getByTestId('selected-items-count'),
      
      // Form buttons
      mapItemSaveButton: this.locatorHelper.getButtonByText('Map Item'),
      saveButton: this.locatorHelper.getButtonByText('Save'),
      cancelButton: this.locatorHelper.getButtonByText('Cancel'),
      closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                        this.locatorHelper.getLocator('.close, .btn-close'),
      
      // Bulk selection
      selectAllCheckbox: this.locatorHelper.getInputByLabel('Select All'),
      itemCheckboxes: this.locatorHelper.getLocator('input[type="checkbox"]'),
      
      // Statistics cards
      totalUnmappedCard: this.locatorHelper.getByText('Total Unmapped'),
      pendingMappingCard: this.locatorHelper.getByText('Pending Mapping'),
      recentlyMappedCard: this.locatorHelper.getByText('Recently Mapped'),
      errorItemsCard: this.locatorHelper.getByText('Error Items'),
      
      // Pagination
      pagination: this.locatorHelper.getByTestId('pagination') ||
                  this.locatorHelper.getLocator('.pagination'),
      previousPageButton: this.locatorHelper.getButtonByText('Previous'),
      nextPageButton: this.locatorHelper.getButtonByText('Next'),
      pageInfo: this.locatorHelper.getByTestId('page-info'),
      
      // Auto-mapping settings
      autoMappingSection: this.locatorHelper.getByTestId('auto-mapping-section'),
      enableAutoMappingCheckbox: this.locatorHelper.getInputByLabel('Enable Auto-mapping'),
      confidenceThresholdSlider: this.locatorHelper.getByTestId('confidence-threshold'),
      autoMappingRulesButton: this.locatorHelper.getButtonByText('Mapping Rules'),
    };
  }

  /**
   * Navigate to Unmapped Store page
   */
  public async navigate(): Promise<void> {
    await this.navigateToPath('/unmapped-store');
  }

  /**
   * Wait for page to load
   */
  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.pageTitle);
    await this.waitHelper.waitForElement(this.locators.unmappedTable);
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
   * Search unmapped items
   */
  public async searchUnmappedItems(searchTerm: string): Promise<void> {
    await this.actionHelper.fillInputByPlaceholder('Search unmapped items...', searchTerm);
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
   * Filter by source
   */
  public async filterBySource(source: string): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.sourceFilter);
    await this.actionHelper.selectCustomDropdown(this.locators.sourceFilter.toString(), source);
  }

  /**
   * View unmapped item
   */
  public async viewUnmappedItem(itemId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', itemId);
    const viewButton = row.locator('button:has-text("View")');
    await this.actionHelper.clickLocator(viewButton);
  }

  /**
   * Preview unmapped item
   */
  public async previewUnmappedItem(itemId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', itemId);
    const previewButton = row.locator('button:has-text("Preview")');
    await this.actionHelper.clickLocator(previewButton);
    await this.waitHelper.waitForElement(this.locators.previewContainer);
  }

  /**
   * Map single item
   */
  public async mapItem(itemId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', itemId);
    const mapButton = row.locator('button:has-text("Map")');
    await this.actionHelper.clickLocator(mapButton);
    await this.waitHelper.waitForElement(this.locators.mappingModal);
  }

  /**
   * Fill mapping form
   */
  public async fillMappingForm(mappingData: {
    client: string;
    advisor: string;
    category: string;
    subcategory?: string;
    documentType: string;
    tags?: string;
    notes?: string;
  }): Promise<void> {
    await this.actionHelper.selectCustomDropdown(this.locators.clientSelect.toString(), mappingData.client);
    await this.actionHelper.selectCustomDropdown(this.locators.advisorSelect.toString(), mappingData.advisor);
    await this.actionHelper.selectCustomDropdown(this.locators.categorySelect.toString(), mappingData.category);
    
    if (mappingData.subcategory) {
      await this.actionHelper.selectCustomDropdown(this.locators.subcategorySelect.toString(), mappingData.subcategory);
    }
    
    await this.actionHelper.selectCustomDropdown(this.locators.documentTypeSelect.toString(), mappingData.documentType);
    
    if (mappingData.tags) {
      await this.actionHelper.fillInputByLabel('Tags', mappingData.tags);
    }
    
    if (mappingData.notes) {
      await this.actionHelper.fillInputByLabel('Notes', mappingData.notes);
    }
  }

  /**
   * Apply auto-mapping suggestion
   */
  public async applySuggestion(suggestionIndex: number = 0): Promise<void> {
    const suggestions = this.locators.suggestionsList.locator('.suggestion-item');
    const suggestion = suggestions.nth(suggestionIndex);
    const applyButton = suggestion.locator('button:has-text("Apply Suggestion")');
    await this.actionHelper.clickLocator(applyButton);
  }

  /**
   * Run OCR on document
   */
  public async runOCR(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.runOcrButton);
    await this.waitHelper.waitForElement(this.locators.ocrText);
  }

  /**
   * Save mapping
   */
  public async saveMapping(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.mapItemSaveButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.mappingModal);
  }

  /**
   * Cancel mapping
   */
  public async cancelMapping(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.cancelButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.mappingModal);
  }

  /**
   * Select multiple items for bulk mapping
   */
  public async selectItems(itemIds: string[]): Promise<void> {
    for (const itemId of itemIds) {
      const row = this.locatorHelper.getContainingText('tr', itemId);
      const checkbox = row.locator('input[type="checkbox"]');
      await this.actionHelper.checkCheckbox(checkbox.toString());
    }
  }

  /**
   * Select all items
   */
  public async selectAllItems(): Promise<void> {
    await this.actionHelper.checkCheckbox(this.locators.selectAllCheckbox.toString());
  }

  /**
   * Perform bulk mapping
   */
  public async performBulkMapping(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.bulkMapButton);
    await this.waitHelper.waitForElement(this.locators.bulkMappingModal);
  }

  /**
   * Fill bulk mapping form
   */
  public async fillBulkMappingForm(bulkData: {
    client: string;
    advisor: string;
    category: string;
  }): Promise<void> {
    await this.actionHelper.selectCustomDropdown(this.locators.bulkClientSelect.toString(), bulkData.client);
    await this.actionHelper.selectCustomDropdown(this.locators.bulkAdvisorSelect.toString(), bulkData.advisor);
    await this.actionHelper.selectCustomDropdown(this.locators.bulkCategorySelect.toString(), bulkData.category);
  }

  /**
   * Save bulk mapping
   */
  public async saveBulkMapping(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.saveButton);
    await this.waitHelper.waitForElementToBeHidden(this.locators.bulkMappingModal);
  }

  /**
   * Download unmapped item
   */
  public async downloadItem(itemId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', itemId);
    const downloadButton = row.locator('button:has-text("Download")');
    await this.actionHelper.clickLocator(downloadButton);
  }

  /**
   * Delete unmapped item
   */
  public async deleteItem(itemId: string): Promise<void> {
    const row = this.locatorHelper.getContainingText('tr', itemId);
    const deleteButton = row.locator('button:has-text("Delete")');
    await this.actionHelper.clickLocator(deleteButton);
  }

  /**
   * Get item status
   */
  public async getItemStatus(itemId: string): Promise<string> {
    const row = this.locatorHelper.getContainingText('tr', itemId);
    const statusCell = row.locator('td').nth(6); // Assuming status is 7th column
    return await this.actionHelper.getTrimmedText(statusCell);
  }

  /**
   * Get selected items count
   */
  public async getSelectedItemsCount(): Promise<string> {
    return await this.actionHelper.getTrimmedText(this.locators.selectedItemsCount);
  }

  /**
   * Get total unmapped count
   */
  public async getTotalUnmappedCount(): Promise<string> {
    const card = this.locatorHelper.getContainingText('.card', 'Total Unmapped');
    const countElement = card.locator('.count, .number').first();
    return await this.actionHelper.getTrimmedText(countElement);
  }

  /**
   * Get OCR confidence score
   */
  public async getOCRConfidenceScore(): Promise<string> {
    return await this.actionHelper.getTrimmedText(this.locators.ocrConfidenceScore);
  }

  /**
   * Get OCR extracted text
   */
  public async getOCRText(): Promise<string> {
    return await this.actionHelper.getTrimmedText(this.locators.ocrText);
  }

  /**
   * Enable auto-mapping
   */
  public async enableAutoMapping(): Promise<void> {
    await this.actionHelper.checkCheckbox(this.locators.enableAutoMappingCheckbox.toString());
  }

  /**
   * Configure auto-mapping rules
   */
  public async configureAutoMappingRules(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.autoMappingRulesButton);
  }

  /**
   * Export unmapped items
   */
  public async exportUnmappedItems(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.exportButton);
  }

  /**
   * Refresh unmapped items list
   */
  public async refreshUnmappedItems(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.refreshButton);
    await this.waitForLoadingToComplete();
  }
}