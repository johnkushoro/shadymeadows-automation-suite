# Gateway UI Test Project

Automated UI tests for the Fairstone Gateway application using the UI Test Automation Framework. This project demonstrates professional test automation implementation with comprehensive coverage, clean architecture, and maintainable code.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Implementation Examples](#implementation-examples)
- [Authentication](#authentication)
- [Debugging](#debugging)
- [Test Reports](#test-reports)
- [Performance](#performance)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Project Overview

The Gateway UI test project provides comprehensive automated testing for the Fairstone Gateway application. It demonstrates:

**Key Features:**
- OAuth 2.0 authentication integration with Microsoft Azure AD
- Page Object Model implementation with clean separation of concerns
- Step definition classes for complex business workflows
- Environment-specific configuration management
- Comprehensive test coverage with proper error handling
- Professional debugging and reporting capabilities

**Test Coverage:**
- Authentication flows (OAuth 2.0 with Microsoft Azure AD)
- Dashboard functionality and navigation
- User interface validation and responsiveness
- Error handling and edge cases
- Cross-browser compatibility testing

**Architecture Benefits:**
- Maintainable and scalable test code
- Reusable components across test scenarios
- Clear separation between page logic and test logic
- Comprehensive error handling and logging
- Easy integration with CI/CD pipelines

## Project Structure

```
projects/gateway-ui/
├── pages/                          # Page Object Model implementations
│   ├── AuthPage.ts                 # OAuth authentication page
│   ├── LoginPage.ts                # Legacy login page (OAuth wrapper)
│   ├── DashboardPage.ts            # Main dashboard interactions
│   ├── ContactPage.ts              # Contact form interactions
│   ├── AdministrationPage.ts       # Admin panel interactions
│   ├── ClientsPage.ts              # Client management page
│   ├── ReportsPage.ts              # Reports and analytics page
│   └── ...                         # Additional page objects
├── steps/                          # Business logic and test workflows
│   ├── AuthSteps.ts                # Authentication workflows
│   ├── LoginSteps.ts               # Legacy login steps (OAuth wrapper)
│   ├── DashboardSteps.ts           # Dashboard operations
│   ├── ContactSteps.ts             # Contact form workflows
│   └── ...                         # Additional step definitions
├── tests/                          # Test specifications
│   ├── Login.spec.ts               # Authentication test scenarios
│   └── test-config.spec.ts         # Configuration validation tests
├── utils/                          # Project-specific utilities
│   └── saveAuthSession.ts          # Authentication session management
├── environments/                   # Environment configuration files
│   ├── .env.development            # Development environment settings
│   ├── .env.qa                     # QA environment settings
│   └── .env.production             # Production environment settings
├── setup/                          # Test setup and teardown
│   ├── global-setup.ts             # Global test setup
│   └── global-teardown.ts          # Global test cleanup
├── test-results/                   # Generated test reports and artifacts
│   ├── html-report/                # Interactive HTML reports
│   ├── junit-report.xml            # JUnit format for CI/CD
│   ├── test-results.json           # JSON format for processing
│   └── artifacts/                  # Screenshots, videos, traces
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies and scripts
└── README.md                       # This documentation
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Framework dependencies installed (see [Framework README](../../framework/README.md))
- Access to Gateway application environments
- Valid Microsoft Azure AD credentials for OAuth testing

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd projects/gateway-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Verify installation:**
   ```bash
   npm run test:config
   ```

### Environment Setup

1. **Configure environment variables:**
   ```bash
   # Copy environment template
   cp environments/.env.qa.example environments/.env.qa
   
   # Edit with your specific settings
   nano environments/.env.qa
   ```

2. **Set up authentication:**
   ```bash
   # Save authentication session for faster test execution
   npm run save-auth
   ```

3. **Validate configuration:**
   ```bash
   # Run configuration tests
   npm run test:config
   ```

## Configuration

### Environment Configuration

The project supports multiple environments with specific configurations:

```typescript
// environments/.env.development
NODE_ENV=development
BASE_URL=https://dev-gateway.fairstone.co.uk
BROWSER=chromium
HEADLESS=false
TIMEOUT=30000
SLOW_MO=500
ENABLE_TRACE=true
ENABLE_SCREENSHOTS=true

// environments/.env.qa
NODE_ENV=qa
BASE_URL=https://qa-fairstonegateway.fairstone.co.uk
BROWSER=chromium
HEADLESS=true
TIMEOUT=60000
ENABLE_TRACE=true
ENABLE_VIDEO=true
WORKERS=4

// environments/.env.production
NODE_ENV=production
BASE_URL=https://gateway.fairstone.co.uk
BROWSER=chromium
HEADLESS=true
TIMEOUT=90000
RETRIES=3
ENABLE_SCREENSHOTS=true
```

### Playwright Configuration

```typescript
// playwright.config.ts
import { PlaywrightConfigBuilder } from '@framework/config/PlaywrightConfigBuilder';

export default PlaywrightConfigBuilder.buildConfig({
  testDir: './tests',
  projectName: 'gateway-ui',
  environments: ['development', 'qa', 'production'],
  
  // Project-specific settings
  use: {
    baseURL: process.env.BASE_URL,
    trace: process.env.ENABLE_TRACE === 'true' ? 'on-first-retry' : 'off',
    screenshot: process.env.ENABLE_SCREENSHOTS === 'true' ? 'only-on-failure' : 'off',
    video: process.env.ENABLE_VIDEO === 'true' ? 'retain-on-failure' : 'off'
  },
  
  // Reporting configuration
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['junit', { outputFile: 'test-results/junit-report.xml' }],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ]
});
```

### TypeScript Configuration

```typescript
// tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@framework/*": ["../../framework/src/*"],
      "@pages/*": ["./pages/*"],
      "@steps/*": ["./steps/*"],
      "@utils/*": ["./utils/*"],
      "@tests/*": ["./tests/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.js"
  ],
  "exclude": [
    "node_modules",
    "test-results"
  ]
}
```

## Running Tests

### Development Mode

```bash
# Run all tests with browser visible and slow motion
npm run test:dev

# Run specific test file
npm run test:dev -- tests/Login.spec.ts

# Run tests with debugging enabled
npm run test:debug

# Run tests with specific browser
BROWSER=firefox npm run test:dev
```

### QA Mode

```bash
# Run tests in headless mode with parallel execution
npm run test:qa

# Run with specific number of workers
npm run test:qa -- --workers=4

# Run with retries enabled
npm run test:qa -- --retries=2

# Run specific test suite
npm run test:qa -- --grep "Authentication"
```

### Production Mode

```bash
# Run with maximum stability and retries
npm run test:prod

# Run with comprehensive reporting
npm run test:prod -- --reporter=html,junit,json

# Run smoke tests only
npm run test:smoke
```

### Continuous Integration

```bash
# CI-optimized test execution
npm run test:ci

# Generate test reports for CI
npm run test:ci -- --reporter=junit
```

## Test Scenarios

### Authentication Tests

**OAuth 2.0 Authentication Flow:**
- Successful authentication with valid Microsoft Azure AD credentials
- Authentication state persistence across browser sessions
- Automatic token refresh handling
- Error handling for authentication failures
- Session timeout and re-authentication

**Test Coverage:**
```typescript
test.describe('Authentication Tests', () => {
  test('should authenticate user with OAuth successfully', async () => {
    await authSteps.authenticateUser();
    await authSteps.verifyDashboardAccess();
  });

  test('should handle authentication errors gracefully', async () => {
    // Test authentication error scenarios
  });

  test('should maintain session across page refreshes', async () => {
    // Test session persistence
  });
});
```

### Dashboard Tests

**Dashboard Functionality:**
- Dashboard loading and element visibility
- Navigation menu functionality
- User interface responsiveness
- Data display and metrics validation
- Search functionality

**Planned Test Coverage:**
- Dashboard metrics validation
- Navigation between different sections
- User interface responsiveness testing
- Error handling for data loading failures
- Performance monitoring

### User Interface Tests

**UI Validation:**
- Form validation and error handling
- Responsive design testing
- Accessibility compliance
- Cross-browser compatibility
- Visual regression testing

### Integration Tests

**End-to-End Workflows:**
- Complete user journeys from login to task completion
- Multi-page workflows and data persistence
- Error recovery and graceful degradation
- Performance under load

## Implementation Examples

### Page Object Implementation

```typescript
// pages/AuthPage.ts
import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';

export class AuthPage extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Organized locators with fallback strategies
  public get locators() {
    return {
      loginButton: this.locatorHelper.getByTestId('login-button') ||
                   this.locatorHelper.getButtonByText('Login') ||
                   this.locatorHelper.getLocator('button[type="submit"]'),
      
      loadingSpinner: this.locatorHelper.getByTestId('loading-spinner') ||
                      this.locatorHelper.getLocator('.loading, .spinner'),
      
      errorMessage: this.locatorHelper.getByTestId('error-message') ||
                    this.locatorHelper.getLocator('.error-message, .alert-error')
    };
  }

  // Required abstract method implementations
  public async navigate(): Promise<void> {
    await this.navigateToPath('/auth');
  }

  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.loginButton);
    await this.waitForLoadingToComplete();
  }

  public async isPageLoaded(): Promise<boolean> {
    try {
      return await this.locators.loginButton.isVisible();
    } catch {
      return false;
    }
  }

  // Business logic methods
  public async clickLogin(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.loginButton);
    await this.waitForLoadingToComplete();
  }

  public async waitForAuthRedirect(): Promise<void> {
    await this.waitHelper.waitForUrlToMatch(/dashboard|auth\/callback/);
  }
}
```

### Step Definition Implementation

```typescript
// steps/AuthSteps.ts
import { Page } from '@playwright/test';
import { BaseSteps } from '@framework/core/BaseSteps';
import { AuthPage } from '../pages/AuthPage';
import { DashboardPage } from '../pages/DashboardPage';

export class AuthSteps extends BaseSteps {
  private authPage: AuthPage;
  private dashboardPage: DashboardPage;

  constructor(page: Page) {
    super(page);
    this.authPage = new AuthPage(page);
    this.dashboardPage = new DashboardPage(page);
  }

  public async authenticateUser(): Promise<void> {
    console.log('Starting OAuth authentication process...');
    
    await this.authPage.navigate();
    await this.authPage.waitForPageLoad();
    
    await this.performOAuthLogin();
    await this.verifyDashboardAccess();
    
    console.log('Authentication completed successfully');
  }

  public async verifyDashboardAccess(): Promise<void> {
    await this.dashboardPage.waitForPageLoad();
    await this.assertionHelper.assertPageUrl(/dashboard/);
    
    const isLoaded = await this.dashboardPage.isPageLoaded();
    if (!isLoaded) {
      throw new Error('Dashboard failed to load after authentication');
    }
  }

  public async getAuthenticationState(): Promise<{
    isAuthenticated: boolean;
    currentUrl: string;
    onDashboard: boolean;
  }> {
    const currentUrl = this.page.url();
    const onDashboard = currentUrl.includes('/dashboard');
    const isAuthenticated = onDashboard || await this.isUserAuthenticated();

    return {
      isAuthenticated,
      currentUrl,
      onDashboard
    };
  }

  private async performOAuthLogin(): Promise<void> {
    await this.authPage.clickLogin();
    
    // Handle OAuth redirect and authentication
    await this.authPage.waitForAuthRedirect();
    
    // Wait for authentication to complete
    await this.waitHelper.waitForUrlToMatch(/dashboard/);
  }

  private async isUserAuthenticated(): Promise<boolean> {
    try {
      // Check for authentication indicators
      const currentUrl = this.page.url();
      return currentUrl.includes('/dashboard') || 
             currentUrl.includes('/auth/callback');
    } catch {
      return false;
    }
  }
}
```

### Test Implementation

```typescript
// tests/Login.spec.ts
import { test, expect } from '@playwright/test';
import { AuthSteps } from '../steps/AuthSteps';

test.describe('Fairstone Gateway Authentication Tests', () => {
  let authSteps: AuthSteps;

  test.beforeEach(async ({ page }) => {
    authSteps = new AuthSteps(page);
  });

  test('should authenticate user and access dashboard', async () => {
    await authSteps.authenticateUser();
    
    const authState = await authSteps.getAuthenticationState();
    expect(authState.isAuthenticated).toBe(true);
    expect(authState.onDashboard).toBe(true);
    expect(authState.currentUrl).toMatch(/dashboard/);
  });

  test('should maintain authentication state across page refresh', async () => {
    await authSteps.authenticateUser();
    
    // Refresh the page
    await authSteps.getPage().reload();
    
    // Verify authentication is maintained
    const authState = await authSteps.getAuthenticationState();
    expect(authState.isAuthenticated).toBe(true);
  });

  test('should handle authentication errors gracefully', async () => {
    // Test error scenarios
    await expect(async () => {
      await authSteps.authenticateWithInvalidCredentials();
    }).rejects.toThrow('Authentication failed');
  });
});
```

## Authentication

### OAuth 2.0 Integration

The project uses Microsoft Azure AD for OAuth 2.0 authentication:

**Authentication Flow:**
1. Navigate to authentication page
2. Click login button to initiate OAuth flow
3. Redirect to Microsoft Azure AD login
4. Handle authentication callback
5. Verify dashboard access

**Session Management:**
```typescript
// utils/saveAuthSession.ts
import { Page } from '@playwright/test';

export class AuthSessionManager {
  public static async saveAuthSession(page: Page): Promise<void> {
    // Save authentication state for reuse
    const storageState = await page.context().storageState();
    await page.context().storageState({ 
      path: 'auth-session.json' 
    });
  }

  public static async loadAuthSession(page: Page): Promise<void> {
    // Load saved authentication state
    try {
      await page.context().storageState({ 
        path: 'auth-session.json' 
      });
    } catch (error) {
      console.log('No saved auth session found');
    }
  }
}
```

### Authentication Helper Usage

```typescript
import { AuthenticationHelper } from '@framework/helpers/AuthenticationHelper';

const authHelper = new AuthenticationHelper(page);

// OAuth authentication
await authHelper.authenticateWithOAuth();

// Microsoft OAuth specific
await authHelper.authenticateWithMicrosoft();

// Check authentication status
const isAuthenticated = await authHelper.isAuthenticated();
```

## Debugging

### Debug Mode

```bash
# Run tests in debug mode with browser visible
npm run test:debug

# Run specific test in debug mode
npm run test:debug -- tests/Login.spec.ts

# Enable verbose logging
DEBUG=pw:api npm run test:debug
```

### Debugging Techniques

1. **Use page.pause() for manual inspection:**
   ```typescript
   await page.pause(); // Pauses execution for manual debugging
   ```

2. **Enable trace collection:**
   ```bash
   ENABLE_TRACE=true npm run test:dev
   ```

3. **Take screenshots at specific points:**
   ```typescript
   await page.screenshot({ path: 'debug-screenshot.png' });
   ```

4. **Add console logging:**
   ```typescript
   console.log('Current URL:', page.url());
   console.log('Page title:', await page.title());
   ```

### Common Debugging Scenarios

**Authentication Issues:**
```typescript
// Debug authentication state
const authState = await authSteps.getAuthenticationState();
console.log('Authentication state:', authState);

// Check current URL and page content
console.log('Current URL:', page.url());
console.log('Page content:', await page.content());
```

**Element Not Found Issues:**
```typescript
// Debug element visibility
const element = page.locator('[data-testid="login-button"]');
console.log('Element visible:', await element.isVisible());
console.log('Element count:', await element.count());
```

**Timing Issues:**
```typescript
// Add explicit waits for debugging
await page.waitForTimeout(5000);
await page.waitForLoadState('networkidle');
```

## Test Reports

### Report Generation

After running tests, comprehensive reports are generated:

**HTML Report:**
```bash
# Generate and open HTML report
npm run report

# Or manually open
open test-results/html-report/index.html
```

**Report Locations:**
- **HTML Report**: `test-results/html-report/index.html` - Interactive report with screenshots and traces
- **JUnit Report**: `test-results/junit-report.xml` - XML format for CI/CD integration
- **JSON Report**: `test-results/test-results.json` - Structured data for custom processing
- **Screenshots**: `test-results/artifacts/` - Screenshots on failures
- **Videos**: `test-results/artifacts/` - Video recordings of test execution
- **Traces**: `test-results/artifacts/` - Detailed execution traces

### Report Analysis

**HTML Report Features:**
- Test execution timeline
- Screenshots and videos on failures
- Detailed error messages and stack traces
- Performance metrics
- Test retry information

**CI/CD Integration:**
```yaml
# Example GitHub Actions integration
- name: Run tests
  run: npm run test:ci

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: test-results
    path: projects/gateway-ui/test-results/
```

## Performance

### Test Execution Optimization

**Execution Times:**
- **Single test**: 30-60 seconds
- **Full test suite**: 5-10 minutes
- **Parallel execution**: 2-5 minutes (with 4 workers)

**Performance Tips:**
1. **Use saved authentication sessions:**
   ```bash
   npm run save-auth
   ```

2. **Enable parallel execution:**
   ```bash
   npm run test:qa -- --workers=4
   ```

3. **Use headless mode for CI:**
   ```bash
   HEADLESS=true npm run test:qa
   ```

4. **Optimize wait strategies:**
   ```typescript
   // Use specific waits instead of arbitrary delays
   await this.waitHelper.waitForElement(locator);
   // Instead of: await page.waitForTimeout(5000);
   ```

### Performance Monitoring

```typescript
// Monitor test execution performance
export class TestPerformanceMonitor {
  private startTime: number;

  public startTest(testName: string): void {
    this.startTime = Date.now();
    console.log(`Starting test: ${testName}`);
  }

  public endTest(testName: string): void {
    const duration = Date.now() - this.startTime;
    console.log(`Test ${testName} completed in ${duration}ms`);
  }
}
```

## Maintenance

### Adding New Tests

1. **Create page objects for new pages:**
   ```typescript
   // pages/NewPage.ts
   export class NewPage extends BasePage {
     // Implementation
   }
   ```

2. **Implement step classes for complex workflows:**
   ```typescript
   // steps/NewSteps.ts
   export class NewSteps extends BaseSteps {
     // Implementation
   }
   ```

3. **Write test specifications:**
   ```typescript
   // tests/NewFeature.spec.ts
   test.describe('New Feature Tests', () => {
     // Test implementations
   });
   ```

4. **Update documentation:**
   - Add test scenarios to this README
   - Update configuration if needed
   - Add troubleshooting notes

### Framework Updates

When the framework is updated:

1. **Review framework changelog**
2. **Update imports if necessary**
3. **Test existing functionality**
4. **Update project-specific code as needed**
5. **Update documentation**

### Code Quality Maintenance

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## Troubleshooting

### Common Issues

#### Authentication Failures

**Problem**: Tests fail during OAuth authentication
**Solutions:**
1. Verify environment configuration
2. Check Microsoft Azure AD credentials
3. Clear browser storage and retry
4. Verify network connectivity

```typescript
// Debug authentication
const authState = await authSteps.getAuthenticationState();
console.log('Auth state:', authState);

// Clear storage and retry
await page.context().clearCookies();
await page.evaluate(() => localStorage.clear());
```

#### Element Not Found

**Problem**: Tests fail with element not found errors
**Solutions:**
1. Verify locator strategies
2. Add appropriate wait conditions
3. Check for dynamic content loading
4. Use more robust locator fallbacks

```typescript
// Debug element location
const element = page.locator('[data-testid="element"]');
console.log('Element visible:', await element.isVisible());
console.log('Element count:', await element.count());

// Use wait conditions
await this.waitHelper.waitForElement(element);
```

#### Timing Issues

**Problem**: Tests are flaky due to timing
**Solutions:**
1. Replace fixed waits with conditional waits
2. Wait for specific conditions
3. Use framework wait helpers
4. Check for loading indicators

```typescript
// Good: Conditional wait
await this.waitHelper.waitForElementToBeHidden(loadingSpinner);

// Avoid: Fixed timeout
// await page.waitForTimeout(5000);
```

#### Environment Issues

**Problem**: Tests fail in specific environments
**Solutions:**
1. Verify environment configuration
2. Check BASE_URL settings
3. Validate network connectivity
4. Review environment-specific credentials

```bash
# Verify environment configuration
npm run test:config

# Check environment variables
echo $BASE_URL
echo $NODE_ENV
```

### Getting Help

1. **Check test reports** for detailed error information
2. **Review framework documentation** for helper usage
3. **Use debug mode** to inspect test execution
4. **Check console logs** for additional context
5. **Contact the automation team** for complex issues

### Error Recovery

```typescript
// Implement retry logic for flaky operations
public async performActionWithRetry<T>(
  action: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(`Attempt ${attempt} failed, retrying...`);
      await this.page.waitForTimeout(1000 * attempt);
    }
  }
  throw new Error('Max retries exceeded');
}
```

## Contributing

### Development Guidelines

1. **Follow established patterns** for page objects and steps
2. **Write descriptive test names** and comments
3. **Add proper error handling** and assertions
4. **Update documentation** for new features
5. **Test changes thoroughly** before committing

### Code Standards

```typescript
// Good: Descriptive method names
public async authenticateUserAndVerifyDashboard(): Promise<void> {
  await this.authenticateUser();
  await this.verifyDashboardAccess();
}

// Good: Proper error handling
public async performLogin(): Promise<void> {
  try {
    await this.authPage.clickLogin();
    await this.waitForAuthRedirect();
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
}

// Good: Clear assertions
expect(authState.isAuthenticated).toBe(true);
expect(authState.currentUrl).toMatch(/dashboard/);
```

### Pull Request Process

1. **Create feature branch** from main
2. **Implement changes** following coding standards
3. **Add or update tests** as needed
4. **Update documentation** if required
5. **Submit pull request** with clear description

---

**Gateway UI Test Project - Professional Test Automation for Fairstone Gateway**