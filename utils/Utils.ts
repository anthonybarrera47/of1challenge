export class Utils {
    static generateRandomEmail(): string {
        const timestamp = new Date().getTime();
        return `user${timestamp}@example.com`;
    }
}
