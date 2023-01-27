import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})
export class DataService implements InMemoryDbService {
    createDb() {
        const userPreferences: User[] = [
            { id: 0, firstName: "Maria", lastName: "Paz", age: 5, colorName: "Pink" },
            { id: 0, firstName: "Gabriela", lastName: "Souza", age: 5, colorName: "Pink" },
            { id: 0, firstName: "Caroline", lastName: "Santos", age: 12, colorName: "Red" },
            { id: 0, firstName: "Gael", lastName: "Figueiredo", age: 15, colorName: "Green" },
            { id: 0, firstName: "Raquel", lastName: "Luz", age: 18, colorName: "Yellow" },
            { id: 0, firstName: "Severino", lastName: "Cardoso", age: 22, colorName: "Black" },
            { id: 0, firstName: "Murilo", lastName: "Porto", age: 37, colorName: "Gray" },
            { id: 0, firstName: "Ruan", lastName: "Monteiro", age: 42, colorName: "Purple" },
            { id: 0, firstName: "Elisa", lastName: "Bernardes", age: 65, colorName: "White" },
            { id: 0, firstName: "Agatha", lastName: "Peixoto", age: 82, colorName: "Orange" },
            { id: 0, firstName: "Ilda", lastName: "Peixoto", age: 81, colorName: "Orange" },
            { id: 0, firstName: "Cora", lastName: "Peixoto", age: 100, colorName: "Orange" }
        ];

        let id = 0;
        userPreferences.forEach(u => { u.id = ++id; });

        return { userPreferences };
    }

    // Overrides the genId method
    genId(userPreferences: User[]): number {
        const maxId = userPreferences.length > 0 ? Math.max(...userPreferences.map(userPreference => userPreference.id)) : 0;
        return maxId + 1;
    }
}