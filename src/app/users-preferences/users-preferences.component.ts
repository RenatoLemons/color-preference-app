import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../interfaces/user';
import { UserPreferenceService } from '../services/user-preference.service';
import { UserPreferenceDetailComponent } from '../user-preference-detail/user-preference-detail.component';

@Component({
  selector: 'app-users-preferences',
  templateUrl: './users-preferences.component.html',
  styleUrls: ['./users-preferences.component.scss']
})
export class UsersPreferencesComponent implements OnInit, AfterViewInit {
  busy: boolean = true;
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'color', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort = new MatSort();
  constructor(private userPreferenceService: UserPreferenceService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUsersPreferences();
  }

  openPreference(userPreference?: User): void {
    const dialogRef = this.dialog.open(UserPreferenceDetailComponent, { data: userPreference || {} });

    dialogRef.afterClosed().subscribe(saved => {
      if (saved) {
        this.getUsersPreferences();
      }
    });
  }

  delete(userPreference: User): void {
    this.busy = true;
    this.userPreferenceService.delete(userPreference.id)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data!.filter(h => h !== userPreference);
        this.busy = false;
      });
  }

  private getUsersPreferences(): void {
    this.busy = true;
    this.userPreferenceService.list()
      .subscribe(usersPreferences => {
        this.dataSource.data = usersPreferences
        this.busy = false;
      });
  }
}
