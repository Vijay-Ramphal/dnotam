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
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,MatCheckboxModule,MatChipsModule,
  MatDatepickerModule,MatDialogModule,MatDividerModule,MatExpansionModule,MatGridListModule,MatIconModule,
  MatInputModule,MatListModule,MatMenuModule,MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,
  MatProgressSpinnerModule,MatRadioModule, MatRippleModule, MatSelectModule,MatSidenavModule,MatSliderModule,
  MatSlideToggleModule,MatSnackBarModule,MatSortModule,MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,MatPaginator,
} from '@angular/material';
@Component({
  selector: 'app-point-brief',
  templateUrl: './point-brief.component.html',
  styleUrls: ['./point-brief.component.css']
})
export class PointBriefComponent implements OnInit {

 
 /* p = new Date();
  dd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  mn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  options = ["SS", "DD", "FF", "GG", "KK"];
  messageQuery: string = "";
  yrs = this.p.getFullYear();
  yr = [];
  public msgList: Array<any> = [];
  
  msgcount: number;
  pages: number[];
  page: number = 0;
  recMsg: string = "";
  indraftMsg="";
  i: Number = 1;
  totalMsg:string='';*/

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
  Radius:Number;
  Origin:string="";

  msgurl = 'api/v1/command/inbox';
  briefingurl = 'api/v1/asbs/briefingid';

  constructor(private serviceObj: AppService) {
    //for (var i = -10; i <= 100; i++) {
     // this.yr.push(this.yrs + i);
    //}
    //this.getMessages();
  }
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
  
  /*priority: string = ''; msgRad: boolean ; chPrefix: string = ''; aiGet: string = ''; ioGet: string = ''; msgNoFrm: string = '';
  msgNoTo: string = ''; skip1Frm: string = ''; skip1To: string = ''; fillTmFrm: string = ''; fillTmTo: string = ''; skip2Frm: string = ''; skip2To: string = '';
  rxTmFrm: string = ''; rxTmTo: string = ''; skip3Frm: string = ''; skip3To: string = ''; txTmFrm: string = '';
  txTmTo: string = ''; skip4Frm: string = ''; skip4To: string = ''; msgType: boolean ; msgText: boolean;
  daysFrm: string = ''; daysTo: string = ''; monthsFrm: string = ''; monthsTo: string = ''; yearsFrm: string = ''; yearsTo: string = '';
   getStr1: string = ''; getStr2: string = ''; getStr3: string = '';*/
  
  
  
   visibility= 'visible';
   show=false;
    hidden=false;

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
        "\"aerodrome\"": this.aerodromeList,
        "\"Radius\"": this.Radius,
        "\"Origin\"": this.Origin,
      }
      console.log(this.totalMsg);
      this.getMessages();
    }
  
    clear() {
      this.briefingID = "";
      this.fromDate = null;
      this.toDate = null;
      this.Radius=null;
      this.Origin="";
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
      //this.briefingContent ="";
      //this.rules = "";
      this.show=false;
    }
  
  
 /* onSubmit() {
    this.totalMsg = this.msgRad+" "+this.daysFrm+this.monthsFrm+this.yearsFrm+" "+this.daysTo+this.monthsTo+this.yearsTo+" "+this.priority+" "+this.chPrefix+" "+this.aiGet+" "
    +this.ioGet+" "+this.msgNoFrm+" "+this.msgNoTo+" "+this.skip1Frm+" "+this.skip1To+" "+this.fillTmFrm+" "+this.fillTmTo+" "+this.skip2Frm
    +" "+this.skip2To+" "+this.rxTmFrm+" "+this.rxTmTo+" "+this.skip3Frm+" "+this.skip3To+" "+this.txTmFrm+" "+this.txTmTo+" "+this.skip4Frm
    +" "+this.skip4To+" "+this.msgType+" "+this.msgText+" "+this.messageQuery+" "+this.getStr1+" "+this.getStr2+" "+this.getStr3;
  
    console.log(this.totalMsg.toUpperCase());
  }*/
  
  /*ngOnInit(){};
  
  
  
  onpages1how()
  {
  
    this.show = !this.show;
  
  }
  
  onpageshow()
  {
  
    this.visibility=this.visibility=="visible"? "hidden": "visible";
  
  }
  
  clear() {
    this.msgRad = false; this.priority = ""; this.chPrefix = ''; this.aiGet = ''; this.ioGet = ''; this.msgNoFrm = ''; this.msgNoTo = ''; this.skip1Frm = '';
    this.skip1To = ''; this.fillTmFrm = ''; this.fillTmTo = ''; this.skip2Frm = ''; this.skip2To = ''; this.rxTmFrm = ''; this.rxTmTo = ''; this.skip3Frm = '';
    this.skip3To = ''; this.txTmFrm = ''; this.txTmTo = ''; this.skip4Frm = ''; this.skip4To = ''; this.msgType = false; this.msgText = false;
     this.daysFrm = ""; this.daysTo = ""; this.monthsFrm = ""; this.monthsTo = ""; this.yearsFrm = ""; this.yearsTo = ""; this.messageQuery = ""; this.getStr1 = ''; this.getStr2 = ''; this.getStr3 = '';
  }*/
  
  dateOnly(event: any) {
    const pattern = /^[0-2][0-3][0-5][0-9][0-5][0-9]$/g;
    let nums = String.fromCharCode(event.charCode);
    if (!pattern.test(nums) && event.charCode != '0') {
      event.preventDefault();
    }
  }
  
  numOnly(event: any) {
    const pattern = /[0-9]/g;
    let nums = String.fromCharCode(event.charCode);
    if (!pattern.test(nums) && event.charCode != '0') {
      event.preventDefault();
    }
  }
  numOnly_radius(event: any) {
    const pattern = /[0-9]/g;
    let nums = String.fromCharCode(event.charCode);
    if (!pattern.test(nums) && event.charCode != '0') {
      event.preventDefault();
    }
  }
  
  alphaNum(event: any) {
    const pattern = /[a-zA-Z0-9 ]/g;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
    }
  }
  
  alphaOnly(event: any) {
    const pattern = /[a-zA-Z ]/g;
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
  radiusLength(ElementId){
    
    var DIElementId =<HTMLInputElement>document.getElementById(ElementId) ;
    console.log(DIElementId.value)
    if((parseInt(DIElementId.value)< 5)||(parseInt(DIElementId.value) > 99)){
      console.log(DIElementId.value + "radius");  
      DIElementId.focus();DIElementId.style.border = "1px solid red";
      
    }
    else{
      
      DIElementId.style.border="";
    }

  }
  
 /* setPage(i, event: any) {
    event.preventDefault();
    if (i > 0 && i < this.pages) {
      this.page = i;
      this.getMessages();
    }
  }*/
  
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
  
  
  /*checkAll(ev) {
    this.msgList.forEach(x => x.state = ev.target.checked);
    if (ev.target.checked) {
      this.inBoxChanged(this.msgList[0]);
    }
    else
      this.indraftMsg = "";
  }*/
  
  /*unCheckAll() {
    this.msgList.forEach(x => x.state = false);
  }
  
  isAllChecked() {
    return this.msgList.every(_ => _.state);
  }
  
  inBoxChanged(inboxItem) {
    let count: number = 0;
    for (let item of this.msgList) {
      if (item.state == true)
        count++;
    }
    if (inboxItem.state == false) {
      (count < 1) ? this.indraftMsg = inboxItem.aftnMessage : this.indraftMsg = "";
    }
    else if (inboxItem.state == true) {
      if ((count - 1) == 1) {
        for (let item of this.msgList) {
          if (item.state == true && item != inboxItem) {
            this.indraftMsg = item.aftnMessage;
          }
        }
      }
      else
        this.indraftMsg = "";
    }
    else
      this.indraftMsg = "";
  }
  */
  
  
  }
  
  