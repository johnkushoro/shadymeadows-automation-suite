"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDataGenerator = void 0;
const faker_1 = require("@faker-js/faker");
/**
 * Professional Test Data Generator
 * Provides comprehensive test data generation for various testing scenarios
 */
class TestDataGenerator {
    /**
     * Generate random user data
     */
    static generateUser() {
        return {
            firstName: faker_1.faker.person.firstName(),
            lastName: faker_1.faker.person.lastName(),
            email: faker_1.faker.internet.email(),
            username: faker_1.faker.internet.userName(),
            password: faker_1.faker.internet.password({ length: 12, memorable: true }),
            phone: faker_1.faker.phone.number(),
            dateOfBirth: faker_1.faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
            address: {
                street: faker_1.faker.location.streetAddress(),
                city: faker_1.faker.location.city(),
                state: faker_1.faker.location.state(),
                zipCode: faker_1.faker.location.zipCode(),
                country: faker_1.faker.location.country()
            },
            company: {
                name: faker_1.faker.company.name(),
                jobTitle: faker_1.faker.person.jobTitle(),
                department: faker_1.faker.commerce.department()
            }
        };
    }
    /**
     * Generate random business data
     */
    static generateBusiness() {
        return {
            name: faker_1.faker.company.name(),
            email: faker_1.faker.internet.email(),
            phone: faker_1.faker.phone.number(),
            website: faker_1.faker.internet.url(),
            industry: faker_1.faker.commerce.department(),
            description: faker_1.faker.company.catchPhrase(),
            address: {
                street: faker_1.faker.location.streetAddress(),
                city: faker_1.faker.location.city(),
                state: faker_1.faker.location.state(),
                zipCode: faker_1.faker.location.zipCode(),
                country: faker_1.faker.location.country()
            },
            taxId: faker_1.faker.finance.accountNumber(),
            registrationNumber: faker_1.faker.finance.accountNumber()
        };
    }
    /**
     * Generate random product data
     */
    static generateProduct() {
        return {
            name: faker_1.faker.commerce.productName(),
            description: faker_1.faker.commerce.productDescription(),
            price: parseFloat(faker_1.faker.commerce.price()),
            category: faker_1.faker.commerce.department(),
            sku: faker_1.faker.string.alphanumeric(8).toUpperCase(),
            barcode: faker_1.faker.string.numeric(12),
            weight: faker_1.faker.number.float({ min: 0.1, max: 50, fractionDigits: 2 }),
            dimensions: {
                length: faker_1.faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
                width: faker_1.faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
                height: faker_1.faker.number.float({ min: 1, max: 100, fractionDigits: 1 })
            },
            inStock: faker_1.faker.datatype.boolean(),
            stockQuantity: faker_1.faker.number.int({ min: 0, max: 1000 })
        };
    }
    /**
     * Generate random financial data
     */
    static generateFinancialData() {
        return {
            accountNumber: faker_1.faker.finance.accountNumber(),
            routingNumber: faker_1.faker.finance.routingNumber(),
            creditCardNumber: faker_1.faker.finance.creditCardNumber(),
            creditCardCVV: faker_1.faker.finance.creditCardCVV(),
            iban: faker_1.faker.finance.iban(),
            bic: faker_1.faker.finance.bic(),
            amount: parseFloat(faker_1.faker.finance.amount()),
            currency: faker_1.faker.finance.currencyCode(),
            transactionType: faker_1.faker.helpers.arrayElement(['debit', 'credit', 'transfer']),
            transactionId: faker_1.faker.string.uuid()
        };
    }
    /**
     * Generate random date ranges
     */
    static generateDateRange() {
        const startDate = faker_1.faker.date.past();
        const endDate = faker_1.faker.date.future({ refDate: startDate });
        return {
            startDate,
            endDate,
            duration: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) // days
        };
    }
    /**
     * Generate random form data
     */
    static generateFormData() {
        return {
            textField: faker_1.faker.lorem.sentence(),
            email: faker_1.faker.internet.email(),
            number: faker_1.faker.number.int({ min: 1, max: 1000 }),
            decimal: faker_1.faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
            date: faker_1.faker.date.recent(),
            time: faker_1.faker.date.recent().toTimeString().split(' ')[0],
            url: faker_1.faker.internet.url(),
            color: faker_1.faker.internet.color(),
            file: faker_1.faker.system.fileName(),
            checkbox: faker_1.faker.datatype.boolean(),
            radio: faker_1.faker.helpers.arrayElement(['option1', 'option2', 'option3']),
            select: faker_1.faker.helpers.arrayElement(['value1', 'value2', 'value3']),
            textarea: faker_1.faker.lorem.paragraphs(2)
        };
    }
    /**
     * Generate test credentials
     */
    static generateCredentials() {
        return {
            valid: {
                username: 'testuser@example.com',
                password: 'ValidPassword123!'
            },
            invalid: {
                username: faker_1.faker.internet.email(),
                password: 'wrongpassword'
            },
            weak: {
                username: faker_1.faker.internet.email(),
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
    static generateFileData() {
        return {
            image: {
                name: `${faker_1.faker.lorem.word()}.jpg`,
                type: 'image/jpeg',
                size: faker_1.faker.number.int({ min: 1024, max: 5242880 }) // 1KB to 5MB
            },
            document: {
                name: `${faker_1.faker.lorem.word()}.pdf`,
                type: 'application/pdf',
                size: faker_1.faker.number.int({ min: 10240, max: 10485760 }) // 10KB to 10MB
            },
            video: {
                name: `${faker_1.faker.lorem.word()}.mp4`,
                type: 'video/mp4',
                size: faker_1.faker.number.int({ min: 1048576, max: 104857600 }) // 1MB to 100MB
            }
        };
    }
    /**
     * Generate random API data
     */
    static generateApiData() {
        return {
            endpoint: faker_1.faker.internet.url(),
            method: faker_1.faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${faker_1.faker.string.alphanumeric(32)}`,
                'User-Agent': faker_1.faker.internet.userAgent()
            },
            payload: {
                id: faker_1.faker.string.uuid(),
                name: faker_1.faker.lorem.words(3),
                value: faker_1.faker.lorem.sentence(),
                timestamp: faker_1.faker.date.recent().toISOString()
            },
            statusCode: faker_1.faker.helpers.arrayElement([200, 201, 400, 401, 403, 404, 500])
        };
    }
    /**
     * Generate random search terms
     */
    static generateSearchTerms() {
        return {
            valid: faker_1.faker.lorem.words(faker_1.faker.number.int({ min: 1, max: 3 })),
            empty: '',
            special: '!@#$%^&*()',
            numeric: faker_1.faker.string.numeric(5),
            long: faker_1.faker.lorem.words(20),
            sql: "'; DROP TABLE users; --",
            xss: '<script>alert("xss")</script>'
        };
    }
    /**
     * Generate random test scenarios
     */
    static generateTestScenarios() {
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
    static generatePerformanceData() {
        return {
            users: faker_1.faker.number.int({ min: 1, max: 1000 }),
            duration: faker_1.faker.number.int({ min: 60, max: 3600 }), // seconds
            rampUp: faker_1.faker.number.int({ min: 10, max: 300 }), // seconds
            thinkTime: faker_1.faker.number.int({ min: 1, max: 10 }), // seconds
            iterations: faker_1.faker.number.int({ min: 1, max: 100 })
        };
    }
    /**
     * Generate custom data based on pattern
     */
    static generateCustomData(pattern) {
        return pattern
            .replace(/\{firstName\}/g, faker_1.faker.person.firstName())
            .replace(/\{lastName\}/g, faker_1.faker.person.lastName())
            .replace(/\{email\}/g, faker_1.faker.internet.email())
            .replace(/\{phone\}/g, faker_1.faker.phone.number())
            .replace(/\{date\}/g, faker_1.faker.date.recent().toISOString().split('T')[0])
            .replace(/\{number\}/g, faker_1.faker.number.int({ min: 1, max: 1000 }).toString())
            .replace(/\{uuid\}/g, faker_1.faker.string.uuid())
            .replace(/\{word\}/g, faker_1.faker.lorem.word())
            .replace(/\{sentence\}/g, faker_1.faker.lorem.sentence());
    }
    /**
     * Generate data for specific locales
     */
    static generateLocalizedData(locale = 'en') {
        // Create a new faker instance with specific locale
        const localFaker = faker_1.faker;
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
    static generateBulkData(count, generator) {
        return Array.from({ length: count }, () => generator());
    }
    /**
     * Generate unique test data (no duplicates)
     */
    static generateUniqueData(count, generator, uniqueKey) {
        const data = [];
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
exports.TestDataGenerator = TestDataGenerator;
//# sourceMappingURL=TestDataGenerator.js.map