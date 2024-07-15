import * as fs from 'fs';
import * as path from 'path';

export class UserDataLoader {
    static loadAllUsersData(): any[] {
        const filePath = path.join(__dirname, '../data/users.json');

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const rawData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(rawData);
        return data.users;
    }
}
