import{ CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
//import { NavigationModule } from './navigation/navigation.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './app.service';
import { AppRoutingModule } from './app.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
//import { BrowserModule } from '@angular/platform-browser';
//import { MessageqstatusComponent } from './messageqstatus/messageqstatus.component';
import {MatPaginatorModule , MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatHeaderRowDef,

 
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  
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
  
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule} from '@angular/material';

//  import {MatTabsModule} from '@angular/material/tabs';
//  import {CdkTableModule} from '@angular/cdk/table';
// import {MatTableModule} from '@angular/material/table';
// import {MatFormFieldModule} from '@angular/material/form-field';

 //import {CdkTableModule} from '@angular/cdk/table';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    //MessageqstatusComponent
    
  ],
  imports: [
    CommonModule,//NavigationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,  MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    //BrowserModule,
    MatChipsModule,
    MatAutocompleteModule,
    //BrowserAnimationsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    
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
    
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule,MatTableModule,
    MatPaginatorModule,
   
    
    AppRoutingModule
    
    // MatTableModule,
    // CdkTableModule,
    // MatTabsModule,MatFormFieldModule
  ],
  providers: [AppService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
