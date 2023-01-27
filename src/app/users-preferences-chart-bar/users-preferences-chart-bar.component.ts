import { Component, OnInit } from '@angular/core';
import { colorByName } from '../data/color.domain';
import { UserPreferenceAggreagatedService } from '../services/user-preferences-aggregated.service';
import { UserPreferenceService } from '../services/user-preference.service';

@Component({
  selector: 'app-users-preferences-chart-bar',
  templateUrl: './users-preferences-chart-bar.component.html',
  styleUrls: ['./users-preferences-chart-bar.component.scss']
})
export class StackedBarChartComponent implements OnInit {
  results: any[] = [];
  scheme = { domain: {} } as unknown as string;
  readonly yAxisLabel = 'Count';
  readonly xAxisLabel = 'Age Group';
  readonly legendTitle = 'Colors';
  constructor(
    private userPreferenceServiceAggreagated: UserPreferenceAggreagatedService,
    private userPreferenceService: UserPreferenceService) {
  }

  ngOnInit(): void {
    this.updateChart();

    this.userPreferenceService.onChange$.subscribe(() => {
      this.updateChart();
    })
  }

  private updateChart() {
    Object.assign(this, { results: [] });

    this.userPreferenceServiceAggreagated.listGroupedByAgeGroup().subscribe(results => {
      Object.assign(this, { results });

      let domain: { [index: string]: string } = {};
      results.forEach(item => {
        item.series.forEach(serie => {
          if (!domain[serie.name]) {
            domain[serie.name] = colorByName[serie.name];
          }
        })
      })
      this.scheme = { domain: Object.values(domain) } as unknown as string;
    })
  }
}
