import { faker } from '@faker-js/faker';

/**
 * Random test data generation utility
 * @author Pramod Dutta - The Testing Academy
 */
export class DataGenerator {
    /**
     * Generate random email
     */
    static email(domain?: string): string {
        return domain
            ? `${faker.string.alphanumeric(10)}@${domain}`
            : faker.internet.email();
    }

    /**
     * Generate random password
     */
    static password(length: number = 12): string {
        return faker.internet.password({ length, memorable: false });
    }

    /**
     * Generate random first name
     */
    static firstName(): string {
        return faker.person.firstName();
    }

    /**
     * Generate random last name
     */
    static lastName(): string {
        return faker.person.lastName();
    }

    /**
     * Generate random full name
     */
    static fullName(): string {
        return faker.person.fullName();
    }

    /**
     * Generate random phone number
     */
    static phone(): string {
        return faker.phone.number();
    }

    /**
     * Generate random address
     */
    static address(): {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    } {
        return {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        };
    }

    /**
     * Generate random alphanumeric string
     */
    static alphanumeric(length: number = 10): string {
        return faker.string.alphanumeric(length);
    }

    /**
     * Generate random UUID
     */
    static uuid(): string {
        return faker.string.uuid();
    }

    /**
     * Generate random number within range
     */
    static number(min: number = 1, max: number = 100): number {
        return faker.number.int({ min, max });
    }

    /**
     * Generate random boolean
     */
    static boolean(): boolean {
        return faker.datatype.boolean();
    }

    /**
     * Generate random date within range
     */
    static date(from?: Date, to?: Date): Date {
        return faker.date.between({ from: from || new Date('2020-01-01'), to: to || new Date() });
    }

    /**
     * Generate dummy credit card
     */
    static creditCard(): {
        number: string;
        cvv: string;
        expiry: string;
    } {
        return {
            number: faker.finance.creditCardNumber(),
            cvv: faker.finance.creditCardCVV(),
            expiry: `${faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0')}/${faker.number.int({ min: 25, max: 30 })}`
        };
    }

    /**
     * Generate invalid email formats for negative testing
     */
    static invalidEmail(): string {
        const invalidFormats = [
            'no-at-sign.com',
            '@no-local-part.com',
            'multiple@@at.com',
            'no.domain@',
            'spaces in@email.com',
            'special!chars@email.com'
        ];
        return invalidFormats[Math.floor(Math.random() * invalidFormats.length)];
    }
}
