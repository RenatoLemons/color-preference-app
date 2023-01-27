import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../interfaces/user';
import { UserPreferenceService } from '../services/user-preference.service';
import { UserPreferenceDetailComponent } from '../user-preference-detail/user-preference-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  updating: boolean = true;
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatSort) sort = new MatSort();
  displayedColumns: string[] = ['firstName', 'age', 'color'];
  constructor(private userPreferenceService: UserPreferenceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateUsersPreferences();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addPreference() {
    const dialogRef = this.dialog.open(UserPreferenceDetailComponent, { data: {} });

    dialogRef.afterClosed().subscribe(saved => {
      if (saved) {
        this.updateUsersPreferences();
      }
    });
  }

  private updateUsersPreferences() {
    this.updating = true;
    this.userPreferenceService.list()
      .subscribe(usersPreferences => {
        this.dataSource.data = usersPreferences
        this.updating = false;
      });
  }
}
