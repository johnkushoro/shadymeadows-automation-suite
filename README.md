# Gateway UI Test Automation

A professional, enterprise-grade UI test automation solution built with Playwright and TypeScript. This project demonstrates a clean, reusable framework architecture that can be easily adapted for any web application testing needs.

## 🏗️ Project Architecture

This project follows a **monorepo structure** with a **reusable framework** approach:

```
gateway-ui-test-automation/
├── framework/                     # 🎯 Reusable Test Automation Framework
│   ├── src/
│   │   ├── config/               # Environment and configuration management
│   │   ├── core/                 # Base classes and core functionality
│   │   ├── helpers/              # Action, assertion, wait, and auth helpers
│   │   ├── types/                # TypeScript type definitions
│   │   ├── utils/                # Test utilities and data generation
│   │   └── index.ts              # Framework exports
│   ├── package.json              # Framework dependencies
│   ├── tsconfig.json             # Framework TypeScript config
│   └── README.md                 # Framework documentation
├── projects/
│   └── gateway-ui/               # 🚀 Gateway UI Test Project
│       ├── pages/                # Page Object Model implementations
│       ├── steps/                # Business logic and test steps
│       ├── tests/                # Test specifications
│       ├── utils/                # Project-specific utilities
│       ├── playwright.config.ts  # Project Playwright configuration
│       ├── tsconfig.json         # Project TypeScript configuration
│       └── package.json          # Project dependencies
├── .env.development              # Development environment variables
├── .env.qa                       # QA environment variables
├── .env.production               # Production environment variables
├── playwright.config.ts          # Root Playwright configuration
├── tsconfig.json                 # Root TypeScript configuration
└── README.md                     # This file
```

## 🌟 Key Features

### ✅ **Professional Framework Design**
- **Self-contained**: No code duplication, everything in the framework
- **Reusable**: Easy to adapt for new projects and applications
- **Type-safe**: Full TypeScript support with strict typing
- **Modular**: Clean separation of concerns with helper classes

### ✅ **Comprehensive Test Helpers**
- **ActionHelper**: User interactions (click, type, drag, etc.)
- **AssertionHelper**: Test verifications and assertions
- **WaitHelper**: Smart waiting strategies and conditions
- **AuthenticationHelper**: OAuth, SAML, and basic auth flows
- **ElementHelper**: Element utilities and operations
- **LocatorHelper**: Advanced locator strategies

### ✅ **Advanced Configuration Management**
- **Environment-specific configs**: Development, QA, Production
- **Dynamic browser selection**: Chrome, Firefox, Edge, Safari
- **Flexible test execution**: Headless/headed, parallel/sequential
- **Comprehensive reporting**: HTML, JUnit, JSON reports

### ✅ **Test Data & Utilities**
- **TestDataGenerator**: Dynamic test data using faker.js
- **UITestUtils**: Screenshot, accessibility, performance utilities
- **Session Management**: Authentication session persistence

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **npm or yarn**
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gateway-ui-test-automation
   ```

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **Install framework dependencies:**
   ```bash
   cd framework
   npm install
   cd ..
   ```

4. **Install project dependencies:**
   ```bash
   cd projects/gateway-ui
   npm install
   cd ../..
   ```

5. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Tests

#### Development Mode (Headed, Slow)
```bash
# Run all tests in development mode
npm run test:dev

# Run specific test file
npm run test:dev -- tests/Login.spec.ts

# Run tests in specific project
cd projects/gateway-ui
npm run test:dev
```

#### QA Mode (Headless, Fast)
```bash
# Run all tests in QA mode
npm run test:qa

# Run with specific browser
BROWSER=firefox npm run test:qa

# Run with parallel execution
npm run test:qa -- --workers=4
```

#### Production Mode (Headless, Retries)
```bash
# Run all tests in production mode
npm run test:prod

# Run with maximum stability
npm run test:prod -- --retries=3
```

## 🎯 Framework Usage Examples

### Creating a New Page Object

```typescript
// projects/gateway-ui/pages/DashboardPage.ts
import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page, '/dashboard');
  }

  get locators() {
    return {
      welcomeMessage: this.page.locator('[data-testid="welcome"]'),
      userMenu: this.page.locator('[data-testid="user-menu"]'),
      logoutButton: this.page.locator('[data-testid="logout"]')
    };
  }

  async getUserName(): Promise<string> {
    return await this.locators.welcomeMessage.textContent() || '';
  }

  async logout(): Promise<void> {
    await this.actionHelper.click(this.locators.userMenu);
    await this.actionHelper.click(this.locators.logoutButton);
  }
}
```

### Creating Step Classes

```typescript
// projects/gateway-ui/steps/DashboardSteps.ts
import { Page } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { AssertionHelper } from '@framework/helpers/AssertionHelper';

export class DashboardSteps {
  private dashboardPage: DashboardPage;
  private assertionHelper: AssertionHelper;

  constructor(private page: Page) {
    this.dashboardPage = new DashboardPage(page);
    this.assertionHelper = new AssertionHelper(page);
  }

  async verifyUserLoggedIn(expectedUserName: string): Promise<void> {
    await this.dashboardPage.navigate();
    const userName = await this.dashboardPage.getUserName();
    
    if (!userName.includes(expectedUserName)) {
      throw new Error(`Expected user ${expectedUserName}, but got ${userName}`);
    }
  }
}
```

### Writing Tests

```typescript
// projects/gateway-ui/tests/Dashboard.spec.ts
import { test } from '@playwright/test';
import { DashboardSteps } from '../steps/DashboardSteps';
import { LoginSteps } from '../steps/LoginSteps';

test.describe('Dashboard Tests', () => {
  let dashboardSteps: DashboardSteps;
  let loginSteps: LoginSteps;

  test.beforeEach(async ({ page }) => {
    dashboardSteps = new DashboardSteps(page);
    loginSteps = new LoginSteps(page);
  });

  test('should display user dashboard after login', async () => {
    // Login first
    await loginSteps.loginSuccessfully(
      'user@example.com', 
      'password123'
    );
    
    // Verify dashboard
    await dashboardSteps.verifyUserLoggedIn('John Doe');
  });
});
```

## 🔧 Configuration

### Environment Variables

Create environment-specific `.env` files:

```bash
# .env.development
NODE_ENV=development
BASE_URL=http://localhost:3000
BROWSER=chromium
HEADLESS=false
SLOW_MO=500
ENABLE_TRACE=true
ENABLE_SCREENSHOTS=true

# .env.qa
NODE_ENV=qa
BASE_URL=https://qa-gateway.example.com
BROWSER=chromium
HEADLESS=true
ENABLE_TRACE=true
ENABLE_VIDEO=true

# .env.production
NODE_ENV=production
BASE_URL=https://gateway.example.com
BROWSER=chromium
HEADLESS=true
ENABLE_SCREENSHOTS=true
ENABLE_VIDEO=false
```

### Browser Selection

```bash
# Run with different browsers
BROWSER=chromium npm run test
BROWSER=firefox npm run test
BROWSER=webkit npm run test
BROWSER=edge npm run test
```

### Parallel Execution

```bash
# Run tests in parallel
npm run test -- --workers=4

# Run tests sequentially
npm run test -- --workers=1
```

## 📊 Reporting

The framework generates comprehensive test reports:

- **HTML Report**: Interactive report with screenshots and traces
- **JUnit Report**: XML format for CI/CD integration
- **JSON Report**: Structured data for custom processing

Reports are generated in:
- `projects/gateway-ui/test-results/html-report/`
- `projects/gateway-ui/test-results/junit-report.xml`
- `projects/gateway-ui/test-results/test-results.json`

## 🔄 Creating New Projects

To create a new test project using this framework:

1. **Create project directory:**
   ```bash
   mkdir projects/my-new-app
   cd projects/my-new-app
   ```

2. **Copy configuration files:**
   ```bash
   cp ../gateway-ui/package.json .
   cp ../gateway-ui/playwright.config.ts .
   cp ../gateway-ui/tsconfig.json .
   ```

3. **Update configurations** for your application
4. **Create your page objects** in `pages/`
5. **Create your step classes** in `steps/`
6. **Write your tests** in `tests/`

## 🧪 Testing Strategy

### Test Pyramid Approach
- **Unit Tests**: Framework components (helpers, utilities)
- **Integration Tests**: Page object interactions
- **E2E Tests**: Complete user workflows

### Test Categories
- **Smoke Tests**: Critical path verification
- **Regression Tests**: Full feature coverage
- **Cross-browser Tests**: Multi-browser compatibility
- **Performance Tests**: Load time and responsiveness

## 🛠️ Development Workflow

### Adding New Features

1. **Framework Changes**: Add to `framework/src/`
2. **Project Implementation**: Use in `projects/gateway-ui/`
3. **Testing**: Verify with real tests
4. **Documentation**: Update README and comments

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Code style enforcement
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks

## 📈 CI/CD Integration

### GitHub Actions Example

```yaml
name: UI Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm install
          cd framework && npm install
          cd ../projects/gateway-ui && npm install
      
      - name: Install Playwright
        run: npx playwright install
      
      - name: Run tests
        run: npm run test:qa
        env:
          BASE_URL: ${{ secrets.QA_BASE_URL }}
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: projects/gateway-ui/test-results/
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Submit a pull request**

### Coding Standards

- Use **TypeScript** with strict mode
- Follow **Page Object Model** pattern
- Write **descriptive test names**
- Add **comprehensive comments**
- Use **meaningful variable names**
- Implement **proper error handling**

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Automation Best Practices](https://playwright.dev/docs/best-practices)

## 🆘 Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**
   - Check environment variables
   - Verify browser versions
   - Review timing issues

2. **Slow test execution**
   - Enable parallel execution
   - Optimize wait strategies
   - Review test data setup

3. **Flaky tests**
   - Improve wait conditions
   - Add retry mechanisms
   - Review element locators

### Getting Help

1. Check the framework documentation
2. Review existing test implementations
3. Search for similar issues in the codebase
4. Contact the automation team

---

## 📄 License

This project is proprietary to Fairstone and is intended for internal use only.

---

**Built with ❤️ by the Fairstone Automation Team**

*Happy Testing! 🎉*