import { Component, ViewChild } from '@angular/core';
import { Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppService } from '../../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatPaginator
} from '@angular/material';
import { empty } from '../../../../../node_modules/rxjs/observable/empty';

@Component({
  selector: 'app-aerodrome-brief',
  templateUrl: './aerodrome-brief.component.html',
  styleUrls: ['./aerodrome-brief.component.css']
})
export class AerodromeBriefComponent implements OnInit {

  msgurl = 'api/v1/asbs/notam/areabrief';
  briefingurl = 'api/v1/asbs/briefingid';

  briefingID: string = "";
  fromDate: Date;
  toDate: Date;
  notam: boolean = false;
  snowtam: boolean = false;
  ashtam: boolean = false;
  scope: boolean = false;
  series: boolean = false;
  ruleIFR: boolean = false;
  ruleVFR: boolean = false;
  rules : string = "";
  ruleIFRVFR: boolean = false;
  briefingContent : string = "";
  aerodrome1: string = ""; aerodrome2: string = ""; aerodrome3: string = ""; aerodrome4: string = ""; aerodrome5: string = "";
  aerodrome6: string = ""; aerodrome7: string = ""; aerodrome8: string = ""; aerodrome9: string = ""; aerodrome10: string = "";
  aerodrome11: string = ""; aerodrome12: string = ""; aerodrome13: string = ""; aerodrome14: string = "";
  aerodromeList: string = "";
  Records: any = [];
  totalMsg: any;

  visibility= 'visible';
  show=false;
  hidden=false;
  

  constructor(private serviceObj: AppService) { }
  ngOnInit() {
    
    this.clear();
    this.serviceObj.setGetOperation(this.briefingurl)
      .subscribe(data => {
        console.log(data);
        this.briefingID = data;
      }),
      (ResponseError => {
        console.log("Respone Text Failure" + ResponseError);
      });
  }

  alphaOnly(event: any) {
		const pattern = /[a-zA-Z]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
	}

  
	checkLength(ElementId) {
		var DIElementId = <HTMLInputElement>document.getElementById(ElementId);
		if ((DIElementId.value.length > 0) && (DIElementId.value.length < 8)) {
			DIElementId.focus(); DIElementId.style.border = "1px solid red";
		}
		else {
			DIElementId.style.border = "";
		}
  }
  

  onSubmit() {
    this.rules= (this.ruleIFR) ? "IFR" : (this.ruleVFR) ? "VFR" : (this.ruleIFRVFR) ? "IFR/VFR" : "";
    this.briefingContent =   (this.notam) ? "NOTAM" : (this.snowtam) ? "SNOWTAM" : (this.ashtam) ? "ASHTAM" : "NONE" ;
    this.aerodromeList = "";

    this.aerodromeList = this.aerodrome1 + " , " + this.aerodrome2 + " , " + this.aerodrome3 + " , " + this.aerodrome4 + " , " + this.aerodrome5 + " , " +
      this.aerodrome6 + " , " + this.aerodrome7 + " , " + this.aerodrome8 + " , " + this.aerodrome9 + " , " + this.aerodrome10 + " , " +
      this.aerodrome11 + " , " + this.aerodrome12 + " , " + this.aerodrome13 + " , " + this.aerodrome14;
      this.show=true;
    this.totalMsg = {
      "\"validFrom\"": this.fromDate,
      "\"validTo\"": this.toDate,
      "\"traffic\"": (this.ruleIFR) ? "IFR" : (this.ruleVFR) ? "VFR" : (this.ruleIFRVFR) ? "IFR/VFR" : "",
      "\"scope\"": this.scope ? "M" : "",
      "\"series\"": this.series ? "G" : "",
      "\"aerodrome\"": this.aerodromeList
    }
    console.log(this.totalMsg);
    this.getMessages();
  }

  clear() {
    this.briefingID = "";
    this.fromDate = null;
    this.toDate = null;
    this.notam = false;
    this.snowtam = false;
    this.ashtam = false;
    this.scope = false;
    this.series = false;
    this.ruleIFR = false;
    this.ruleVFR = false;
    this.ruleIFRVFR = false;
    this.aerodrome1 = ""; this.aerodrome2 = ""; this.aerodrome3 = ""; this.aerodrome4 = ""; this.aerodrome5 = "";
    this.aerodrome6 = ""; this.aerodrome7 = ""; this.aerodrome8 = ""; this.aerodrome9 = ""; this.aerodrome10 = "";
    this.aerodrome11 = ""; this.aerodrome12 = ""; this.aerodrome13 = ""; this.aerodrome14 = "";
    this.aerodromeList = "";
    this.totalMsg = "";
    this.show=false;
    //this.briefingContent ="";
    //this.rules = "";
  }

  getMessages() {
    this.serviceObj.setPostOperation(this.msgurl, this.totalMsg)
      .subscribe(data => {
        this.show = !this.show;
        console.log(data.content);
        this.Records = data.content;
        //this.clear();
      }),
      (ResponseError => {
        console.log("Respone Text Failure" + ResponseError);
        //this.clear();
      });
  }
}
