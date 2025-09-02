/**
 * Professional Test Data Generator
 * Provides comprehensive test data generation for various testing scenarios
 */
export declare class TestDataGenerator {
    /**
     * Generate random user data
     */
    static generateUser(): {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
        phone: string;
        dateOfBirth: Date;
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        company: {
            name: string;
            jobTitle: string;
            department: string;
        };
    };
    /**
     * Generate random business data
     */
    static generateBusiness(): {
        name: string;
        email: string;
        phone: string;
        website: string;
        industry: string;
        description: string;
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId: string;
        registrationNumber: string;
    };
    /**
     * Generate random product data
     */
    static generateProduct(): {
        name: string;
        description: string;
        price: number;
        category: string;
        sku: string;
        barcode: string;
        weight: number;
        dimensions: {
            length: number;
            width: number;
            height: number;
        };
        inStock: boolean;
        stockQuantity: number;
    };
    /**
     * Generate random financial data
     */
    static generateFinancialData(): {
        accountNumber: string;
        routingNumber: string;
        creditCardNumber: string;
        creditCardCVV: string;
        iban: string;
        bic: string;
        amount: number;
        currency: string;
        transactionType: "debit" | "credit" | "transfer";
        transactionId: string;
    };
    /**
     * Generate random date ranges
     */
    static generateDateRange(): {
        startDate: Date;
        endDate: Date;
        duration: number;
    };
    /**
     * Generate random form data
     */
    static generateFormData(): {
        textField: string;
        email: string;
        number: number;
        decimal: number;
        date: Date;
        time: string;
        url: string;
        color: string;
        file: string;
        checkbox: boolean;
        radio: "option1" | "option2" | "option3";
        select: "value1" | "value2" | "value3";
        textarea: string;
    };
    /**
     * Generate test credentials
     */
    static generateCredentials(): {
        valid: {
            username: string;
            password: string;
        };
        invalid: {
            username: string;
            password: string;
        };
        weak: {
            username: string;
            password: string;
        };
        empty: {
            username: string;
            password: string;
        };
    };
    /**
     * Generate random file data
     */
    static generateFileData(): {
        image: {
            name: string;
            type: string;
            size: number;
        };
        document: {
            name: string;
            type: string;
            size: number;
        };
        video: {
            name: string;
            type: string;
            size: number;
        };
    };
    /**
     * Generate random API data
     */
    static generateApiData(): {
        endpoint: string;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        headers: {
            'Content-Type': string;
            Authorization: string;
            'User-Agent': string;
        };
        payload: {
            id: string;
            name: string;
            value: string;
            timestamp: string;
        };
        statusCode: 200 | 201 | 400 | 401 | 403 | 404 | 500;
    };
    /**
     * Generate random search terms
     */
    static generateSearchTerms(): {
        valid: string;
        empty: string;
        special: string;
        numeric: string;
        long: string;
        sql: string;
        xss: string;
    };
    /**
     * Generate random test scenarios
     */
    static generateTestScenarios(): {
        positive: {
            description: string;
            data: {
                textField: string;
                email: string;
                number: number;
                decimal: number;
                date: Date;
                time: string;
                url: string;
                color: string;
                file: string;
                checkbox: boolean;
                radio: "option1" | "option2" | "option3";
                select: "value1" | "value2" | "value3";
                textarea: string;
            };
            expectedResult: string;
        };
        negative: {
            description: string;
            data: {
                email: string;
                textField: string;
                number: number;
                decimal: number;
                date: Date;
                time: string;
                url: string;
                color: string;
                file: string;
                checkbox: boolean;
                radio: "option1" | "option2" | "option3";
                select: "value1" | "value2" | "value3";
                textarea: string;
            };
            expectedResult: string;
        };
        boundary: {
            description: string;
            data: {
                minValue: number;
                maxValue: number;
                emptyString: string;
                longString: string;
            };
            expectedResult: string;
        };
    };
    /**
     * Generate random performance test data
     */
    static generatePerformanceData(): {
        users: number;
        duration: number;
        rampUp: number;
        thinkTime: number;
        iterations: number;
    };
    /**
     * Generate custom data based on pattern
     */
    static generateCustomData(pattern: string): string;
    /**
     * Generate data for specific locales
     */
    static generateLocalizedData(locale?: string): {
        name: string;
        address: string;
        city: string;
        phone: string;
        currency: string;
        date: string;
    };
    /**
     * Generate bulk test data
     */
    static generateBulkData(count: number, generator: () => any): any[];
    /**
     * Generate unique test data (no duplicates)
     */
    static generateUniqueData(count: number, generator: () => any, uniqueKey: string): any[];
}
//# sourceMappingURL=TestDataGenerator.d.ts.map