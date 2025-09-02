import { Page, Request, Response } from '@playwright/test';
import { FrameworkConfig } from '../types';

/**
 * API Helper for UI Testing
 * Handles API interactions within UI test context
 * Complements backend API testing by focusing on UI-API integration
 */
export class ApiHelper {
  private readonly page: Page;
  private readonly config: Partial<FrameworkConfig>;
  private interceptedRequests: Request[] = [];
  private interceptedResponses: Response[] = [];

  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    this.page = page;
    this.config = config;
    this.setupRequestInterception();
  }

  /**
   * Setup request/response interception for monitoring
   */
  private setupRequestInterception(): void {
    this.page.on('request', (request) => {
      this.interceptedRequests.push(request);
    });

    this.page.on('response', (response) => {
      this.interceptedResponses.push(response);
    });
  }

  /**
   * Make API request using page context (inherits cookies/auth)
   */
  async makeRequest(options: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
  }): Promise<{
    status: number;
    data: any;
    headers: Record<string, string>;
    ok: boolean;
  }> {
    const response = await this.page.request[options.method.toLowerCase() as 'get'](
      options.url,
      {
        data: options.data,
        headers: options.headers,
        timeout: options.timeout || 30000,
      }
    );

    const responseHeaders: Record<string, string> = {};
    const headers = response.headers();
    Object.entries(headers).forEach(([key, value]) => {
      responseHeaders[key] = value;
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response.text();
    }

    return {
      status: response.status(),
      data: responseData,
      headers: responseHeaders,
      ok: response.ok(),
    };
  }

  /**
   * Wait for specific API call to be made
   */
  async waitForApiCall(
    urlPattern: string | RegExp,
    options: {
      method?: string;
      timeout?: number;
      predicate?: (request: Request) => boolean;
    } = {}
  ): Promise<Request> {
    const { method, timeout = 30000, predicate } = options;

    return await this.page.waitForRequest(
      (request) => {
        const urlMatches = typeof urlPattern === 'string' 
          ? request.url().includes(urlPattern)
          : urlPattern.test(request.url());
        
        const methodMatches = !method || request.method() === method.toUpperCase();
        const customMatches = !predicate || predicate(request);
        
        return urlMatches && methodMatches && customMatches;
      },
      { timeout }
    );
  }

  /**
   * Wait for API response with specific criteria
   */
  async waitForApiResponse(
    urlPattern: string | RegExp,
    options: {
      status?: number;
      timeout?: number;
      predicate?: (response: Response) => boolean;
    } = {}
  ): Promise<Response> {
    const { status, timeout = 30000, predicate } = options;

    return await this.page.waitForResponse(
      (response) => {
        const urlMatches = typeof urlPattern === 'string'
          ? response.url().includes(urlPattern)
          : urlPattern.test(response.url());
        
        const statusMatches = !status || response.status() === status;
        const customMatches = !predicate || predicate(response);
        
        return urlMatches && statusMatches && customMatches;
      },
      { timeout }
    );
  }

  /**
   * Mock API response for testing
   */
  async mockApiResponse(
    urlPattern: string | RegExp,
    mockResponse: {
      status?: number;
      body?: any;
      headers?: Record<string, string>;
      delay?: number;
    }
  ): Promise<void> {
    await this.page.route(urlPattern, async (route) => {
      if (mockResponse.delay) {
        await new Promise(resolve => setTimeout(resolve, mockResponse.delay));
      }

      await route.fulfill({
        status: mockResponse.status || 200,
        body: typeof mockResponse.body === 'object' 
          ? JSON.stringify(mockResponse.body) 
          : mockResponse.body,
        headers: {
          'Content-Type': 'application/json',
          ...mockResponse.headers,
        },
      });
    });
  }

  /**
   * Get all API requests made during test
   */
  getInterceptedRequests(filter?: {
    url?: string | RegExp;
    method?: string;
  }): Request[] {
    if (!filter) {
      return [...this.interceptedRequests];
    }

    return this.interceptedRequests.filter(request => {
      const urlMatches = !filter.url || (
        typeof filter.url === 'string'
          ? request.url().includes(filter.url)
          : filter.url.test(request.url())
      );
      
      const methodMatches = !filter.method || 
        request.method() === filter.method.toUpperCase();
      
      return urlMatches && methodMatches;
    });
  }

  /**
   * Get all API responses received during test
   */
  getInterceptedResponses(filter?: {
    url?: string | RegExp;
    status?: number;
  }): Response[] {
    if (!filter) {
      return [...this.interceptedResponses];
    }

    return this.interceptedResponses.filter(response => {
      const urlMatches = !filter.url || (
        typeof filter.url === 'string'
          ? response.url().includes(filter.url)
          : filter.url.test(response.url())
      );
      
      const statusMatches = !filter.status || response.status() === filter.status;
      
      return urlMatches && statusMatches;
    });
  }

  /**
   * Verify API call was made with expected payload
   */
  async verifyApiCall(
    urlPattern: string | RegExp,
    expectedPayload?: any,
    options: {
      method?: string;
      timeout?: number;
    } = {}
  ): Promise<boolean> {
    try {
      const request = await this.waitForApiCall(urlPattern, options);
      
      if (expectedPayload) {
        const actualPayload = request.postDataJSON();
        return JSON.stringify(actualPayload) === JSON.stringify(expectedPayload);
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Setup test data via API before UI test
   */
  async setupTestData(endpoint: string, data: any): Promise<any> {
    const response = await this.makeRequest({
      method: 'POST',
      url: endpoint,
      data,
    });

    if (!response.ok) {
      throw new Error(`Failed to setup test data: ${response.status} - ${JSON.stringify(response.data)}`);
    }

    return response.data;
  }

  /**
   * Cleanup test data via API after UI test
   */
  async cleanupTestData(endpoint: string, identifier?: string): Promise<void> {
    const url = identifier ? `${endpoint}/${identifier}` : endpoint;
    
    const response = await this.makeRequest({
      method: 'DELETE',
      url,
    });

    if (!response.ok && response.status !== 404) {
      console.warn(`Failed to cleanup test data: ${response.status} - ${JSON.stringify(response.data)}`);
    }
  }

  /**
   * Verify data state via API after UI action
   */
  async verifyDataState(endpoint: string, expectedData: any): Promise<boolean> {
    const response = await this.makeRequest({
      method: 'GET',
      url: endpoint,
    });

    if (!response.ok) {
      return false;
    }

    // Deep comparison of expected vs actual data
    return this.deepEqual(response.data, expectedData);
  }

  /**
   * Monitor API performance during UI interactions
   */
  async monitorApiPerformance(
    urlPattern: string | RegExp,
    action: () => Promise<void>
  ): Promise<{
    requestCount: number;
    averageResponseTime: number;
    slowestRequest: number;
    fastestRequest: number;
    errors: number;
  }> {
    const startTime = Date.now();
    const requestTimes: number[] = [];
    let errors = 0;

    // Setup monitoring
    const responseHandler = (response: Response) => {
      const urlMatches = typeof urlPattern === 'string'
        ? response.url().includes(urlPattern)
        : urlPattern.test(response.url());
      
      if (urlMatches) {
        const responseTime = Date.now() - startTime;
        requestTimes.push(responseTime);
        
        if (!response.ok()) {
          errors++;
        }
      }
    };

    this.page.on('response', responseHandler);

    try {
      await action();
    } finally {
      this.page.off('response', responseHandler);
    }

    return {
      requestCount: requestTimes.length,
      averageResponseTime: requestTimes.length > 0 
        ? requestTimes.reduce((a, b) => a + b, 0) / requestTimes.length 
        : 0,
      slowestRequest: Math.max(...requestTimes, 0),
      fastestRequest: Math.min(...requestTimes, 0),
      errors,
    };
  }

  /**
   * Clear intercepted requests/responses
   */
  clearInterceptedData(): void {
    this.interceptedRequests = [];
    this.interceptedResponses = [];
  }

  /**
   * Deep equality check for objects
   */
  private deepEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) {
      return true;
    }

    if (obj1 == null || obj2 == null) {
      return false;
    }

    if (typeof obj1 !== typeof obj2) {
      return false;
    }

    if (typeof obj1 !== 'object') {
      return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }

      if (!this.deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Extract authentication token from response
   */
  async extractAuthToken(
    loginResponse: Response,
    tokenPath: string = 'token'
  ): Promise<string | null> {
    try {
      const responseData = await loginResponse.json();
      const pathParts = tokenPath.split('.');
      
      let token = responseData;
      for (const part of pathParts) {
        token = token[part];
        if (token === undefined) {
          return null;
        }
      }
      
      return typeof token === 'string' ? token : null;
    } catch {
      return null;
    }
  }

  /**
   * Set authorization header for subsequent requests
   */
  async setAuthorizationHeader(token: string, type: 'Bearer' | 'Basic' = 'Bearer'): Promise<void> {
    await this.page.setExtraHTTPHeaders({
      'Authorization': `${type} ${token}`,
    });
  }
}