import { faker } from '@faker-js/faker';

/**
 * Professional Test Data Generator
 * Provides comprehensive test data generation for various testing scenarios
 */
export class TestDataGenerator {
  
  /**
   * Generate random user data
   */
  public static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password({ length: 12, memorable: true }),
      phone: faker.phone.number(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      },
      company: {
        name: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department()
      }
    };
  }

  /**
   * Generate random business data
   */
  public static generateBusiness() {
    return {
      name: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      industry: faker.commerce.department(),
      description: faker.company.catchPhrase(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      },
      taxId: faker.finance.accountNumber(),
      registrationNumber: faker.finance.accountNumber()
    };
  }

  /**
   * Generate random product data
   */
  public static generateProduct() {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
      barcode: faker.string.numeric(12),
      weight: faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
      dimensions: {
        length: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
        width: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
        height: faker.number.float({ min: 1, max: 100, fractionDigits: 1 })
      },
      inStock: faker.datatype.boolean(),
      stockQuantity: faker.number.int({ min: 0, max: 1000 })
    };
  }

  /**
   * Generate random financial data
   */
  public static generateFinancialData() {
    return {
      accountNumber: faker.finance.accountNumber(),
      routingNumber: faker.finance.routingNumber(),
      creditCardNumber: faker.finance.creditCardNumber(),
      creditCardCVV: faker.finance.creditCardCVV(),
      iban: faker.finance.iban(),
      bic: faker.finance.bic(),
      amount: parseFloat(faker.finance.amount()),
      currency: faker.finance.currencyCode(),
      transactionType: faker.helpers.arrayElement(['debit', 'credit', 'transfer']),
      transactionId: faker.string.uuid()
    };
  }

  /**
   * Generate random date ranges
   */
  public static generateDateRange() {
    const startDate = faker.date.past();
    const endDate = faker.date.future({ refDate: startDate });
    
    return {
      startDate,
      endDate,
      duration: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) // days
    };
  }

  /**
   * Generate random form data
   */
  public static generateFormData() {
    return {
      textField: faker.lorem.sentence(),
      email: faker.internet.email(),
      number: faker.number.int({ min: 1, max: 1000 }),
      decimal: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
      date: faker.date.recent(),
      time: faker.date.recent().toTimeString().split(' ')[0],
      url: faker.internet.url(),
      color: faker.internet.color(),
      file: faker.system.fileName(),
      checkbox: faker.datatype.boolean(),
      radio: faker.helpers.arrayElement(['option1', 'option2', 'option3']),
      select: faker.helpers.arrayElement(['value1', 'value2', 'value3']),
      textarea: faker.lorem.paragraphs(2)
    };
  }

  /**
   * Generate test credentials
   */
  public static generateCredentials() {
    return {
      valid: {
        username: 'testuser@example.com',
        password: 'ValidPassword123!'
      },
      invalid: {
        username: faker.internet.email(),
        password: 'wrongpassword'
      },
      weak: {
        username: faker.internet.email(),
        password: '123'
      },
      empty: {
        username: '',
        password: ''
      }
    };
  }

  /**
   * Generate random file data
   */
  public static generateFileData() {
    return {
      image: {
        name: `${faker.lorem.word()}.jpg`,
        type: 'image/jpeg',
        size: faker.number.int({ min: 1024, max: 5242880 }) // 1KB to 5MB
      },
      document: {
        name: `${faker.lorem.word()}.pdf`,
        type: 'application/pdf',
        size: faker.number.int({ min: 10240, max: 10485760 }) // 10KB to 10MB
      },
      video: {
        name: `${faker.lorem.word()}.mp4`,
        type: 'video/mp4',
        size: faker.number.int({ min: 1048576, max: 104857600 }) // 1MB to 100MB
      }
    };
  }

  /**
   * Generate random API data
   */
  public static generateApiData() {
    return {
      endpoint: faker.internet.url(),
      method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${faker.string.alphanumeric(32)}`,
        'User-Agent': faker.internet.userAgent()
      },
      payload: {
        id: faker.string.uuid(),
        name: faker.lorem.words(3),
        value: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString()
      },
      statusCode: faker.helpers.arrayElement([200, 201, 400, 401, 403, 404, 500])
    };
  }

  /**
   * Generate random search terms
   */
  public static generateSearchTerms() {
    return {
      valid: faker.lorem.words(faker.number.int({ min: 1, max: 3 })),
      empty: '',
      special: '!@#$%^&*()',
      numeric: faker.string.numeric(5),
      long: faker.lorem.words(20),
      sql: "'; DROP TABLE users; --",
      xss: '<script>alert("xss")</script>'
    };
  }

  /**
   * Generate random test scenarios
   */
  public static generateTestScenarios() {
    return {
      positive: {
        description: 'Valid data entry and successful operation',
        data: this.generateFormData(),
        expectedResult: 'success'
      },
      negative: {
        description: 'Invalid data entry should show error',
        data: { ...this.generateFormData(), email: 'invalid-email' },
        expectedResult: 'error'
      },
      boundary: {
        description: 'Test with boundary values',
        data: {
          minValue: 0,
          maxValue: 999999,
          emptyString: '',
          longString: 'a'.repeat(1000)
        },
        expectedResult: 'validation'
      }
    };
  }

  /**
   * Generate random performance test data
   */
  public static generatePerformanceData() {
    return {
      users: faker.number.int({ min: 1, max: 1000 }),
      duration: faker.number.int({ min: 60, max: 3600 }), // seconds
      rampUp: faker.number.int({ min: 10, max: 300 }), // seconds
      thinkTime: faker.number.int({ min: 1, max: 10 }), // seconds
      iterations: faker.number.int({ min: 1, max: 100 })
    };
  }

  /**
   * Generate custom data based on pattern
   */
  public static generateCustomData(pattern: string): string {
    return pattern
      .replace(/\{firstName\}/g, faker.person.firstName())
      .replace(/\{lastName\}/g, faker.person.lastName())
      .replace(/\{email\}/g, faker.internet.email())
      .replace(/\{phone\}/g, faker.phone.number())
      .replace(/\{date\}/g, faker.date.recent().toISOString().split('T')[0])
      .replace(/\{number\}/g, faker.number.int({ min: 1, max: 1000 }).toString())
      .replace(/\{uuid\}/g, faker.string.uuid())
      .replace(/\{word\}/g, faker.lorem.word())
      .replace(/\{sentence\}/g, faker.lorem.sentence());
  }

  /**
   * Generate data for specific locales
   */
  public static generateLocalizedData(locale: string = 'en') {
    // Create a new faker instance with specific locale
    const localFaker = faker;
    
    const data = {
      name: localFaker.person.fullName(),
      address: localFaker.location.streetAddress(),
      city: localFaker.location.city(),
      phone: localFaker.phone.number(),
      currency: localFaker.finance.currencyCode(),
      date: localFaker.date.recent().toLocaleDateString(locale)
    };
    
    return data;
  }

  /**
   * Generate bulk test data
   */
  public static generateBulkData(count: number, generator: () => any): any[] {
    return Array.from({ length: count }, () => generator());
  }

  /**
   * Generate unique test data (no duplicates)
   */
  public static generateUniqueData(count: number, generator: () => any, uniqueKey: string): any[] {
    const data: any[] = [];
    const seen = new Set();
    
    while (data.length < count) {
      const item = generator();
      const key = item[uniqueKey];
      
      if (!seen.has(key)) {
        seen.add(key);
        data.push(item);
      }
    }
    
    return data;
  }
}