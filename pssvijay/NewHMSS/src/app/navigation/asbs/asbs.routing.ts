import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AsbsComponent } from './asbs.component';
 import { AreaBriefComponent } from './area-brief/area-brief.component';
 import { RouteBriefComponent } from './route-brief/route-brief.component';
 import { NarrowrouteBriefComponent } from './narrowroute-brief/narrowroute-brief.component';
 import { PointBriefComponent } from './point-brief/point-brief.component';
 import { AerodromeBriefComponent } from './aerodrome-brief/aerodrome-brief.component';// import { AsbsComponent } from './asbs/asbs.component';
import {CdkTableModule} from '@angular/cdk/table';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AsbsComponent,
    children: [
      { path: 'area-brief', component: AreaBriefComponent },
      { path: 'route-brief', component: RouteBriefComponent },
      { path: 'narrowroute-brief', component: NarrowrouteBriefComponent },
      { path: 'point-brief', component: PointBriefComponent },
      { path: 'aerodrome-brief', component: AerodromeBriefComponent },
    ]
  }
];

@NgModule({
  imports: [
    CdkTableModule,  MatAutocompleteModule,  MatButtonModule,  MatButtonToggleModule,  MatCardModule,  MatCheckboxModule,   MatChipsModule,
    MatStepperModule, MatDatepickerModule,  MatDialogModule,  MatDividerModule,  MatExpansionModule,  MatGridListModule,  MatIconModule,
    CommonModule,  MatInputModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,
    MatRadioModule,  MatRippleModule,  MatSelectModule,  MatSidenavModule,  MatSliderModule,  MatSlideToggleModule,
    MatSnackBarModule,  MatSortModule,  MatTableModule,  MatTabsModule,  MatToolbarModule,  MatTooltipModule,
   
  
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AsbsRoutingModule { }