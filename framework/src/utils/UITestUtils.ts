import { Page, expect } from '@playwright/test';
import { FrameworkConfig } from '../types';

/**
 * UI Test Utilities
 * Provides common UI testing utilities and helper methods
 */
export class UITestUtils {
  constructor(
    private page: Page,
    private config: Partial<FrameworkConfig> = {}
  ) {}

  /**
   * Take a screenshot with optional name
   */
  async takeScreenshot(name?: string): Promise<Buffer> {
    const screenshotName = name || `screenshot-${Date.now()}`;
    return await this.page.screenshot({ 
      path: `test-results/screenshots/${screenshotName}.png`,
      fullPage: true 
    });
  }

  /**
   * Get page performance metrics
   */
  async getPageMetrics(): Promise<{
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  }> {
    const performanceMetrics = await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        largestContentfulPaint: paint.find(p => p.name === 'largest-contentful-paint')?.startTime || 0
      };
    });

    return performanceMetrics;
  }

  /**
   * Check basic accessibility compliance
   */
  async checkAccessibility(): Promise<{
    hasAltText: boolean;
    hasHeadings: boolean;
    hasLabels: boolean;
    hasLandmarks: boolean;
  }> {
    const accessibilityCheck = await this.page.evaluate(() => {
      const images = document.querySelectorAll('img');
      const hasAltText = Array.from(images).every(img => img.hasAttribute('alt'));
      
      const hasHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length > 0;
      
      const inputs = document.querySelectorAll('input, textarea, select');
      const hasLabels = Array.from(inputs).every(input => {
        const id = input.getAttribute('id');
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledBy = input.getAttribute('aria-labelledby');
        const label = id ? document.querySelector(`label[for="${id}"]`) : null;
        
        return ariaLabel || ariaLabelledBy || label;
      });
      
      const landmarks = document.querySelectorAll('main, nav, header, footer, aside, section[aria-label], section[aria-labelledby]');
      const hasLandmarks = landmarks.length > 0;
      
      return {
        hasAltText,
        hasHeadings,
        hasLabels,
        hasLandmarks
      };
    });

    return accessibilityCheck;
  }

  /**
   * Validate all links on the page
   */
  async validateLinks(): Promise<{
    totalLinks: number;
    validLinks: number;
    brokenLinks: string[];
  }> {
    const links = await this.page.locator('a[href]').all();
    const totalLinks = links.length;
    let validLinks = 0;
    const brokenLinks: string[] = [];

    for (const link of links) {
      try {
        const href = await link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          // For external links, we'll just check if they're properly formatted
          if (href.startsWith('http') || href.startsWith('/')) {
            validLinks++;
          } else {
            brokenLinks.push(href);
          }
        } else {
          validLinks++; // Internal anchors, mailto, tel are considered valid
        }
      } catch (error) {
        const href = await link.getAttribute('href') || 'unknown';
        brokenLinks.push(href);
      }
    }

    return {
      totalLinks,
      validLinks,
      brokenLinks
    };
  }

  /**
   * Check if page is responsive
   */
  async checkResponsiveness(): Promise<{
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  }> {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    const results: { mobile: boolean; tablet: boolean; desktop: boolean } = {
      mobile: false,
      tablet: false,
      desktop: false
    };

    for (const viewport of viewports) {
      await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
      await this.page.waitForTimeout(500); // Allow time for responsive changes
      
      // Check if content is properly displayed (not overflowing)
      const isResponsive = await this.page.evaluate(() => {
        const body = document.body;
        return body.scrollWidth <= window.innerWidth;
      });

      results[viewport.name as keyof typeof results] = isResponsive;
    }

    return results;
  }

  /**
   * Get page load state information
   */
  async getLoadState(): Promise<{
    domContentLoaded: boolean;
    load: boolean;
    networkIdle: boolean;
  }> {
    const states = await Promise.allSettled([
      this.page.waitForLoadState('domcontentloaded', { timeout: 1000 }),
      this.page.waitForLoadState('load', { timeout: 1000 }),
      this.page.waitForLoadState('networkidle', { timeout: 1000 })
    ]);

    return {
      domContentLoaded: states[0].status === 'fulfilled',
      load: states[1].status === 'fulfilled',
      networkIdle: states[2].status === 'fulfilled'
    };
  }

  /**
   * Check for JavaScript errors on the page
   */
  async checkForJavaScriptErrors(): Promise<string[]> {
    const errors: string[] = [];
    
    this.page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Get all form validation errors on the page
   */
  async getFormValidationErrors(): Promise<string[]> {
    const errors = await this.page.evaluate(() => {
      const errorElements = document.querySelectorAll('.error, .error-message, [aria-invalid="true"]');
      return Array.from(errorElements).map(el => el.textContent?.trim() || '').filter(text => text.length > 0);
    });

    return errors;
  }

  /**
   * Check if page has loading indicators
   */
  async hasLoadingIndicators(): Promise<boolean> {
    const loadingSelectors = [
      '.loading',
      '.spinner',
      '.loader',
      '[data-testid*="loading"]',
      '[aria-label*="loading"]',
      '.fa-spinner',
      '.fa-circle-o-notch'
    ];

    for (const selector of loadingSelectors) {
      const element = this.page.locator(selector);
      if (await element.isVisible()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Wait for page to be fully loaded (no loading indicators)
   */
  async waitForPageFullyLoaded(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    
    // Wait for any loading indicators to disappear
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const hasLoading = await this.hasLoadingIndicators();
      if (!hasLoading) {
        break;
      }
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Get page title and meta information
   */
  async getPageInfo(): Promise<{
    title: string;
    url: string;
    description: string;
    keywords: string;
  }> {
    const pageInfo = await this.page.evaluate(() => {
      const title = document.title;
      const url = window.location.href;
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      
      return { title, url, description, keywords };
    });

    return pageInfo;
  }

  /**
   * Check if element is in viewport
   */
  async isElementInViewport(selector: string): Promise<boolean> {
    const element = this.page.locator(selector);
    const boundingBox = await element.boundingBox();
    
    if (!boundingBox) {
      return false;
    }

    const viewport = this.page.viewportSize();
    if (!viewport) {
      return false;
    }

    return (
      boundingBox.x >= 0 &&
      boundingBox.y >= 0 &&
      boundingBox.x + boundingBox.width <= viewport.width &&
      boundingBox.y + boundingBox.height <= viewport.height
    );
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get element's computed styles
   */
  async getComputedStyles(selector: string, properties: string[]): Promise<Record<string, string>> {
    const element = this.page.locator(selector);
    
    const styles = await element.evaluate((el, props) => {
      const computedStyle = window.getComputedStyle(el);
      const result: Record<string, string> = {};
      
      props.forEach(prop => {
        result[prop] = computedStyle.getPropertyValue(prop);
      });
      
      return result;
    }, properties);

    return styles;
  }
}