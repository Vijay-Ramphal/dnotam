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
  MatAutocompleteModule,  MatButtonModule,  MatButtonToggleModule,  MatCardModule,  MatCheckboxModule,  MatChipsModule,  MatDatepickerModule,
  MatDialogModule,  MatDividerModule,  MatExpansionModule,  MatGridListModule,  MatIconModule,  MatListModule,  MatMenuModule,  MatNativeDateModule,
  MatPaginatorModule,  MatProgressBarModule,  MatProgressSpinnerModule,  MatRadioModule,  MatRippleModule,  MatSelectModule,  MatSidenavModule,
  MatSliderModule,  MatSlideToggleModule,  MatSnackBarModule,  MatSortModule,  MatStepperModule,  MatTableModule,  MatTabsModule,  MatToolbarModule, 
   MatTooltipModule,  MatPaginator,
} from '@angular/material';
import { empty } from '../../../../../node_modules/rxjs/observable/empty';
@Component({
  selector: 'app-narrowroute-brief',
  templateUrl: './narrowroute-brief.component.html',
  styleUrls: ['./narrowroute-brief.component.css']
})
export class NarrowrouteBriefComponent implements OnInit {
  msgurl = 'api/v1/command/inbox';
  briefingurl = 'api/v1/asbs/briefingid';
  
  /*p = new Date();
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
  Departure:string="";
  Destination:string="";
  FL:string="";
  Route:string="";
  Routewidth:number;
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
  AltAerodrome1: string = ""; AltAerodrome2: string = ""; AltAerodrome3: string = ""; AltAerodrome4: string = ""; AltAerodrome5: string = "";
  AltAerodrome6: string = ""; AltAerodrome7: string = ""; AltAerodrome8: string = ""; 
  aerodromeList: string = "";
  FIRlist:string="";
  ACFIR1:string=""; ACFIR2:string="";  ACFIR3:string="";  ACFIR4:string="";  ACFIR5:string=""; ACFIR6:string="";  ACFIR7:string=""; ACFIR8:string="";
  Records: any = [];
  totalMsg: any;
  
  constructor(private serviceObj: AppService) {
    
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
  
  
  /*onSubmit() {
    this.totalMsg = this.msgRad+" "+this.daysFrm+this.monthsFrm+this.yearsFrm+" "+this.daysTo+this.monthsTo+this.yearsTo+" "+this.priority+" "+this.chPrefix+" "+this.aiGet+" "
    +this.ioGet+" "+this.msgNoFrm+" "+this.msgNoTo+" "+this.skip1Frm+" "+this.skip1To+" "+this.fillTmFrm+" "+this.fillTmTo+" "+this.skip2Frm
    +" "+this.skip2To+" "+this.rxTmFrm+" "+this.rxTmTo+" "+this.skip3Frm+" "+this.skip3To+" "+this.txTmFrm+" "+this.txTmTo+" "+this.skip4Frm
    +" "+this.skip4To+" "+this.msgType+" "+this.msgText+" "+this.messageQuery+" "+this.getStr1+" "+this.getStr2+" "+this.getStr3;
  
    console.log(this.totalMsg.toUpperCase());
  }*/
  onSubmit() {
    this.rules= (this.ruleIFR) ? "IFR" : (this.ruleVFR) ? "VFR" : (this.ruleIFRVFR) ? "IFR/VFR" : "";
    this.briefingContent =   (this.notam) ? "NOTAM" : (this.snowtam) ? "SNOWTAM" : (this.ashtam) ? "ASHTAM" : "NONE" ;
    this.aerodromeList = "";

    this.aerodromeList = this.AltAerodrome1 + " , " + this.AltAerodrome2 + " , " + this.AltAerodrome3 + " , " + this.AltAerodrome4 + " , " + this.AltAerodrome5 + " , " +
      this.AltAerodrome6 + " , " + this.AltAerodrome7 + " , " + this.AltAerodrome8;

    this.FIRlist="";
    this.FIRlist=this.ACFIR1 + " , " + this.ACFIR2 +" , "+ this.ACFIR3 +" , "+ this.ACFIR4 +" ,"+ this.ACFIR5 +" , "+ this.ACFIR6 +" , "+this.ACFIR7 +" , "+ this.ACFIR8;
this.show=true;
    this.totalMsg = {
      "\"validFrom\"": this.fromDate,
      "\"validTo\"": this.toDate,
      "\"traffic\"": (this.ruleIFR) ? "IFR" : (this.ruleVFR) ? "VFR" : (this.ruleIFRVFR) ? "IFR/VFR" : "",
      "\"scope\"": this.scope ? "M" : "",
      "\"series\"": this.series ? "G" : "",
      "\"aerodrome\"": this.aerodromeList,
      "\"FIR\"":this.FIRlist
    }
    console.log(this.totalMsg);
    this.getMessages();
  }
  clear() {
    this.briefingID = "";
    this.fromDate = null;
    this.toDate = null;
    this.Departure="";
    this.Destination="";
    this.FL="";
    this.Route="";
    this.Routewidth=null;
    this.notam = false;
    this.snowtam = false;
    this.ashtam = false;
    this.scope = false;
    this.series = false;
    this.ruleIFR = false;
    this.ruleVFR = false;
    this.ruleIFRVFR = false;
    this.AltAerodrome1 = ""; this.AltAerodrome2 = ""; this.AltAerodrome3 = ""; this.AltAerodrome4 = ""; this.AltAerodrome5 = "";
    this.AltAerodrome6 = ""; this.AltAerodrome7 = ""; this.AltAerodrome8 = ""; this.ACFIR1 = ""; this.ACFIR2 = "";
    this.ACFIR3 = ""; this.ACFIR4 = ""; this.ACFIR5 = ""; this.ACFIR6 = "";this.ACFIR7="";this.ACFIR8="";
    this.aerodromeList = "";
    this.FIRlist="";
    this.totalMsg = "";
    this.show=false
    //this.briefingContent ="";
    //this.rules = "";
  }

 /* onpages1how()
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
    if ((DIElementId.value.length > 0) && (DIElementId.value.length < 4)) {
      DIElementId.focus(); DIElementId.style.border = "1px solid red";
    }
    else {
      DIElementId.style.border = "";
    }
  }
  routeWidth(ElementId){
    
    var DIElementId =<HTMLInputElement>document.getElementById(ElementId) ;
    console.log(DIElementId.value)
    if((parseInt(DIElementId.value)< 5)||(parseInt(DIElementId.value) > 30)){
      console.log(DIElementId.value + "radius");  
      DIElementId.focus(  );DIElementId.style.border = "1px solid red";
     
    }
    else{
      
      DIElementId.style.border="";
    }

  }
  
  /*setPage(i, event: any) {
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
  
 /* getMessages() {
    this.serviceObj.setGetOperation(this.msgurl + "?page=" + this.page)
      .subscribe(data => {
        this.msgList = data.content;
        this.msgcount = this.msgList.length;
        this.pages = new Array(data.totalPages);
        console.log(this.msgcount);
        console.log(this.msgList);
      });
  }*/ 
  /*checkAll(ev) {
    this.msgList.forEach(x => x.state = ev.target.checked);
    if (ev.target.checked) {
      this.inBoxChanged(this.msgList[0]);
    }
    else
      this.indraftMsg = "";
  }
  
  unCheckAll() {
    this.msgList.forEach(x => x.state = false);
  }
  
  isAllChecked() {
    return this.msgList.every(_ => _.state);
  }*/
  
  /*inBoxChanged(inboxItem) {
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
  }*/
  
  
  
  }
  
  