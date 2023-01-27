import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, of } from 'rxjs';
import { ageGroupDomains } from '../data/age-group.domain';
import { ChartItem } from '../interfaces/chart-item';
import { ChartSource } from '../interfaces/chart-source';
import { UserPreferenceService } from './user-preference.service';

@Injectable({
    providedIn: 'root'
})
export class UserPreferenceAggreagatedService {
    constructor(private userPreferenceService: UserPreferenceService) { }

    listGroupedByAgeGroup(): Observable<ChartItem[]> {
        return this.userPreferenceService.list().pipe(map(userPreferences => {
            const items: ChartItem[] = [];

            userPreferences.forEach(userPreference => {
                const ageGroup = this.findAgeGroup(userPreference.age)!,
                    itens = items.filter(item => item.name === ageGroup.name);
                let item = itens.length ? itens[0] : undefined;

                if (!item) {
                    item = {
                        name: ageGroup.name,
                        series: []
                    };
                    items.push(item);
                }

                const series = item.series.filter(serie => serie.name === userPreference.colorName);
                let serie = series.length ? series[0] : undefined;

                if (!serie) {
                    serie = {
                        name: userPreference.colorName,
                        value: 0
                    }
                    item.series.push(serie);
                }

                serie.value++;
            })

            return items;
        }));
    }

    private findAgeGroup(age: number) {
        for (const ageGroupDomain of ageGroupDomains) {
            const greaterOrEqualStart = (ageGroupDomain.startAge == undefined || age >= ageGroupDomain.startAge),
                lessOrEqualEnd = (ageGroupDomain.endAge == undefined || age <= ageGroupDomain.endAge);
            if (greaterOrEqualStart && lessOrEqualEnd) {
                return ageGroupDomain;
            }
        }
        return undefined;
    }
}
