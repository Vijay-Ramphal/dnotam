import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages.component';
import { InboxComponent } from './inbox/inbox.component';
import { IntboxComponent } from './intbox/intbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { MetReportComponent } from './met-report/met-report.component';
import { METModule } from './met-report/met-report.module';
import { AtsmessageComponent } from './atsmessage/atsmessage.component';
import { ComposemessageComponent } from './composemessage/composemessage.component';
import { NotamComponent } from './notam/notam.component';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { MessageRetrivalComponent } from './messageretrival/messageretrival.component';
import {MeteorologicalComponent}from './meteorological/meteorological.component';
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
    component: MessagesComponent,
    children: [
      { path: 'inbox', component: InboxComponent },
      { path: 'outbox', component: OutboxComponent },
      { path: 'atsmessage', component: AtsmessageComponent },
      { path: 'composemessage', component: ComposemessageComponent },
      { path: 'MET', component: MetReportComponent },//loadChildren: './met-report/met-report.module#METModule'
      { path: 'miscellaneous', component: MiscellaneousComponent },
      { path: 'messageretrival', component: MessageRetrivalComponent },
      { path: 'intbox', component: IntboxComponent },
      { path:'meteorological', component:MeteorologicalComponent}
    ]
  }
];

@NgModule({
  imports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    CommonModule,
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
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
   
  
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class MessagesRoutingModule { }