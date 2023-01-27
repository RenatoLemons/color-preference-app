import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersPreferencesComponent } from './users-preferences/users-preferences.component';
import { UserPreferenceDetailComponent } from './user-preference-detail/user-preference-detail.component';
import { DataService } from './data/data.services';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { StackedBarChartComponent } from './users-preferences-chart-bar/users-preferences-chart-bar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ColorIconComponent } from './drop-icon/drop-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersPreferencesComponent,
    UserPreferenceDetailComponent,
    NavBarComponent,
    HomeComponent,
    StackedBarChartComponent,
    ColorIconComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(DataService, { dataEncapsulation: false }),
    FlexLayoutModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
