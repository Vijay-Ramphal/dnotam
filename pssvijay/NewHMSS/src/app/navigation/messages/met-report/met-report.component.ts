import { Component,Input, OnInit, ComponentFactoryResolver, ComponentRef, ComponentFactory } from '@angular/core';
import { AppService} from '../../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import {
// 	MatAutocompleteModule,
// 	MatButtonModule,
// 	MatButtonToggleModule,
// 	MatCardModule,
// 	MatCheckboxModule,
// 	MatChipsModule,
// 	MatDatepickerModule,
// 	MatDialogModule,
// 	MatDividerModule,
// 	MatExpansionModule,
// 	MatGridListModule,
// 	MatIconModule,
// 	MatInputModule,
// 	MatListModule,
// 	MatMenuModule,
// 	MatNativeDateModule,
// 	MatPaginatorModule,
// 	MatProgressBarModule,
// 	MatProgressSpinnerModule,
// 	MatRadioModule,
// 	MatRippleModule,
// 	MatSelectModule,
// 	MatSidenavModule,
// 	MatSliderModule,
// 	MatSlideToggleModule,
// 	MatSnackBarModule,
// 	MatSortModule,
// 	MatStepperModule,
// 	MatTableModule,
// 	MatTabsModule,
// 	MatToolbarModule,
// 	MatTooltipModule,
// 	MatPaginator,
// } from '@angular/material';


/*declare interface RouteInfo {
	path: string;
	title: string;
	class: string;
}
export const MessageROUTES: RouteInfo[] = [
	{ path: 'notam', title: 'NOTAM', class: '' },
	{ path: 'snowtam', title: 'SNOWTAM', class: '' },
	{ path: 'ashtam', title: 'ASHTAM', class: '' }
];*/

@Component({
	selector: 'app-met-report',
	templateUrl: './met-report.component.html',
	styleUrls: ['./met-report.component.css']
  })

export class MetReportComponent {

 
  value:any;
  originIndi;
  originIndicator:string = '';
  sendTotalMessageUrl = "api/v1/aftn/message";
  //sequenceUrl = "api/v1/aftn/bka/sequenceNum";
  /*totalHeader: any = [];
  totalFinalHeader: any = [];
  draftMsgBody;
   msgBody;*/

   notamFirUrl    = "/api/v1/notam/fir";
   notamCode23Url = "/api/v1/notam/code23";
   notamUrl       = "/api/v1/notam/";
  tab:string="";
  tab2: any;



  constructor(public serviceObject: AppService) {
    this.channelPrefix = this.serviceObject.getChannelPrefix();
    this.originIndi = this.serviceObject.getOriginIndicator();
    console.log("originIndicator:   "+this.originIndi);
  }



/*********************************   SNOWTAM   *************************************/




  show1:boolean = true;
  show2:boolean = false;
  show3:boolean = false;
  showIt1:boolean = false;
  showIt2:boolean = false;
  showIt3:boolean = false;
  optional:boolean = false;
  date = new Date();
  yrs = this.date.getFullYear();
  mns = this.date.getMonth() + 1;
  days = this.date.getDate();
  hours = this.date.getHours();
  minutes = this.date.getMinutes();
  snhdr1:string = 'SW';aerodrome:string='';dtntm:string='';
  apron:string='';nxtObsrv:string='';remarks:string='';snowtamno:string=''; 
  runway1:string='';runwaylen1:string='';runwaywidt1:string='';deposition1:string='';
  mdepth1:string='';friction1:string='';csnow1:string='';rlight1:string='';
  fcplanned1:string='';fcexpected1:string='';taxiway1:string='';taxisnow1:string='';  
  runway2:string='';runwaylen2:string='';runwaywidt2:string='';deposition2:string='';
  mdepth2:string='';friction2:string='';csnow2:string='';rlight2:string='';
  fcplanned2:string='';fcexpected2:string='';taxiway2:string='';taxisnow2:string='';   
  runway3:string='';runwaylen3:string='';runwaywidt3:string='';deposition3:string='';
  mdepth3:string='';friction3:string='';csnow3:string='';rlight3:string='';
  fcplanned3:string='';fcexpected3:string='';taxiway3:string='';taxisnow3:string='';
  serialno1:string='';serialno2:string='';locInd:string='';dtObserv:string='';optgroup:string='COR';  
  result:string = '';


  helpInfoMessage:string = '';


  fin:any =[];  

  target1:any = ["OMAD","SVAC","SVCH","SVAD","LGAG","OMAM","OTBK","OTBH","LGAX","LGBL","SVAN","LGAD","SVAB","SKAP","LGRX","SVAA","SVAS","DNAS","EGEI","NCAT","SVBS","SVBL","SVFM","EPKG","OBBB","OBBS","OBKH","LTFD"
              ,"SVBC","SVBI","SVBM","SVBB","SVBO","TNCB","SVBZ","SKBU","SKBN","SVCI","SVCD","SVCL","SVCN","SVCC","SVCS","SVCO","SVCZ","SKGO","SVCP","NZCG","SVQM","SVCA","LGSA","MWCB","CYCK","SVCB","SVPI","MRCU","EKCN"
              ,"SVCR","SKCV","SVUR","SVCU","SVRB","TNCF","TNCC","LGTT","VRMD","OMDW","SVLL","SVED","SVRS","SVEM","SVJI","SVVG","LGEL","SVEZ","NZEV","EDTF","SVFT","VRMR","SKGB","SVGU","SVGD","SVGT","SVGI","SVQJ","EKHM"
              ,"SVQF","LSPK","SVQL"];
  target2:any = ["AA","AB","AC","AD","BA","BB","BC","BD","CA","CB","CC","CD"];

  showElement(event: any) 
  {
    switch (event.target.value) 
    {
      case 'one':
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        break;
      case 'two':
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        break;
      case 'three':
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        break;
      default:
        console.log("ERROR");
        break;
    }
  }

  changeVisual(event:any)
  {
    var r1 = document.getElementById("r1");
    var r2 = document.getElementById("r2");
    var r3 = document.getElementById("r3");

    if(event.target.value == "one")
    {
      r1.style.borderBottom = "none";
      r2.style.border = "1px solid rgb(209, 198, 198)";
      r3.style.border = "1px solid rgb(209, 198, 198)";
    }
    else if(event.target.value == "two")
    {
      r1.style.border = "1px solid rgb(209, 198, 198)";
      r2.style.borderBottom = "none";
      r3.style.border = "1px solid rgb(209, 198, 198)";
    }
    else if(event.target.value == "three")
    {
      r1.style.border = "1px solid rgb(209, 198, 198)";
      r2.style.border = "1px solid rgb(209, 198, 198)";
      r3.style.borderBottom = "none";
    }
  }

  optgrp(event:any)
  {
    switch(event.target.value)
    {
      case 'new':
        this.optional = false;
        break;
      case 'modify':
        this.optional = true;
        break;
    }
  }

  clearAll()
  {
    this.snowtamno='';this.aerodrome='';this.dtntm='';
    this.apron='';this.nxtObsrv='';this.remarks='';
    this.runway1='';this.runwaylen1='';this.runwaywidt1='';this.deposition1='';
    this.mdepth1='';this.friction1='';this.csnow1='';this.rlight1='';
    this.fcplanned1='';this.fcexpected1='';this.taxiway1='';this.taxisnow1='';
    this.runway2='';this.runwaylen2='';this.runwaywidt2='';this.deposition2='';
    this.mdepth2='';this.friction2='';this.csnow2='';this.rlight2='';
    this.fcplanned2='';this.fcexpected2='';this.taxiway2='';this.taxisnow2='';
    this.runway3='';this.runwaylen3='';this.runwaywidt3='';this.deposition3='';
    this.mdepth3='';this.friction3='';this.csnow3='';this.rlight3='';
    this.fcplanned3='';this.fcexpected3='';this.taxiway3='';this.taxisnow3='';
    this.helpInfoMessage='';this.serialno1='';this.serialno2='';this.locInd='';this.dtObserv='';
  }

  

  getIndi(event:any)
  {
    let x;
    if(event.target.id == 'serialno')
    {
      this.checkIndi(this.serialno1, x=1, this.target2);
    }
    else if(event.target.id == 'locInd')
    {
      this.checkIndi(this.locInd, x=2, this.target1);
    }
    else if(event.target.id == 'aerodrome')
    {
      this.checkIndi(this.aerodrome, x=3, this.target1);
    }
  }

  checkIndi(nme,x,targ)
  {
    var _this = this;
    let count:number = 0;
    this.fin.splice(0,(this.fin.length));
    if(nme != '')
    {
      var ttl1:string = '',ttl2:string = '';
      for(let tg in targ)
      {
         ttl1 = targ[tg];
         for(let i = 0; i < nme.length; i++)
         {
           ttl2 += ttl1[i];                      
         }
           if(ttl2 == nme.toUpperCase())
           {
            this.fin.push(targ[tg]);
           }else if(ttl2 != nme.toUpperCase())
             {
                count++;
                  for(let j = 0; j < this.fin.length; j++)
                  {
                    if(this.fin[j] == targ[tg])
                    {
                      this.fin.splice(j,1);
                    }
                  }
                  if(count == targ.length && ((nme[2]!= "x" && nme[2]!= "X") && nme[2] != undefined))
                  {
                    console.log("Inside");
                    if( (nme[3] != "X" && nme[3] != "x") && nme[3] != undefined)
                    {
                      console.log("Inside2");
                      alert("Not validcode");
                      count = 0;
                    }
                  }else if(count == targ.length && nme[2] == undefined && nme[3] == undefined)
                  {
                    alert("Not validcode Inside");
                  }
              }
         ttl2 = '';
      }
        var cnt = 0;
        for(let i = 0; i < this.fin.length; i++)
        {
          for(let j = 0; j < this.fin.length; j++)
          {
            if(this.fin[i] == this.fin[j])
            {
              cnt++;
              if(cnt > 1)
              {
               this.fin[j] = '';
               }
            }
            if( j == this.fin.length-1){cnt = 0;}
          }
        }
        if(x == 1){this.showIt1 = true;}
        else if(x == 2){this.showIt2 = true;}
        else if(x == 3){this.showIt3 = true;}
      count = 0;
        for(let j in this.fin)
        {
          if(this.fin[j] == '')
          {
            this.fin.splice(parseInt(j),1);
          }
        }
        this.autoFocus();
    }else
    {
      if(x == 1){this.showIt1 = false;}
      else if(x == 2){this.showIt2 = false;}
      else if(x == 3){this.showIt3 = false;}
       this.clearAuto2();
    }
  }

  clearAuto2()
  {
    this.fin.splice(0,(this.fin.length));
  }

  autoClick1(f:any)
  {
    this.serialno1 = f;
    this.showIt1 = false;
    this.autoFocus();
  }
  autoClick2(f:any)
  {
    this.locInd = f;
    this.aerodrome = this.locInd;
    this.showIt2 = false;
  }
  autoClick3(f:any)
  {
    this.aerodrome = f;
    this.showIt3 = false;
  }

  autoFocus()
  {
    if(this.serialno1.length == 2){document.getElementById("serialno2").focus();}
  }

  clear1()
  {
    this.showIt1 = false;
  }

  clear2()
  {
    this.showIt2 = false;
  }

  clear3()
 {
   this.showIt3 = false;
 }

 getDtnTm(event:any)
  {
    //console.log(typeof(event.target.id));
    if(event.target.id == 'dtObsv')
    {
      console.log("ion");
      this.checkDtnTm(this.dtObserv);
    }
    else if(event.target.id == 'dtntm')
    {
      this.checkDtnTm(this.dtntm);
    }
  }

  checkDtnTm(nme)
  {
    this.date = new Date();
    this.yrs = this.date.getFullYear();
    this.mns = this.date.getMonth() + 1;
    this.days = this.date.getDate();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();

    let mn:string  = nme[0] + nme[1];
    let day:string = nme[2] + nme[3];
    let hrs:string = nme[4] + nme[5];
    let min:string = nme[6] + nme[7];

    if(nme[1] != undefined)
    {
      if(parseInt(mn) > 12 || parseInt(mn) < 0)
      {
        alert("Months should be lees than 12 and greater than 0");
      }
    }
    if(nme[3] != undefined)
    {
      if(parseInt(mn) == 1 || parseInt(mn) == 3|| parseInt(mn) == 5 || parseInt(mn) == 7 || parseInt(mn) == 8 || parseInt(mn) == 10 || parseInt(mn) == 12)
      {
        if(parseInt(day) > 31)
        {
          alert("Maximum no of days is 31");
        }
      }
      else if(parseInt(mn) == 4 || parseInt(mn) == 6|| parseInt(mn) == 9 || parseInt(mn) == 11)
      {
        if(parseInt(day) > 30)
        {
          alert("Maximum no of days is 30");
        }
      }
      else if(parseInt(mn) == 2)
      {
        if((this.yrs%400) == 0)
        {
          if(parseInt(day) > 29)
            {
              alert("Maximum no of days is 29");
            }
        }
        else if((this.yrs%100) != 0 && (this.yrs%4) == 0)
        {
          if(parseInt(day) > 29)
            {
              alert("Maximum no of days is 29");
            }
        }
        else
        {
          if(parseInt(day) > 28)
            {
              alert("Maximum no of days is 28");
            }
        }
      }
      if((parseInt(mn) < this.mns && parseInt(day) != 1))
      {
        alert("Day is not valid");
      }
      if(parseInt(mn) == this.mns && parseInt(day) > this.days)
      {
        alert("Cannot type Future Date");
      }
    }
    if(nme[5] != undefined)
    {
      if(parseInt(mn) == this.mns && parseInt(day) == this.days)
      {
        if(parseInt(hrs) > this.hours)
        {
          alert("Cannot type future time");
        }
      }
      else
      {
        if(parseInt(hrs) > 23)
        {
          alert("Hours should be between 0 and 23");
        }
      }
     }
     if(nme[7] != undefined)
     {
       console.log(this.minutes);
      if(parseInt(mn) == this.mns && parseInt(day) == this.days && parseInt(hrs) == this.hours)
      {
        if(parseInt(min) > this.minutes)
        {
          alert("Cannot type future time");
        }
      }
      else
      {
        if(parseInt(min) > 59)
        {
          alert("Hours should be between 0 and 59");
        }
      }
    }
  }

  assignVals1()
  {
    if(this.serialno2.length == 4)
    {
      this.snowtamno = this.serialno2;
    }
  }

  assignVals2()
  {
    if(this.locInd.length == 4)
    {
      this.aerodrome = this.locInd;
    }
  }

  assignVals3()
  {
    if(this.dtObserv.length == 8)
    {
      this.dtntm = this.dtObserv;
    }
  }

  onDisplay()
  {
    this.result = " "+this.snhdr1+this.serialno1+this.serialno2+"     "+this.locInd+"     "+this.dtObserv+
    "     ";
    
    if(this.optional == true)
    {
      this.result += this.optgroup;
    }

    this.result += "\n"+" SNOWTAM "+this.snowtamno+"\n"+"       A)"+this.aerodrome+"       B)"+this.dtntm;

    if(this.runway1 != '' && this.runway1 != undefined)
    {
      this.result += "\n"+"       C)"+this.runway1+"       D)"+this.runwaylen1+"       E)"+this.runwaywidt1+"       F)"+this.deposition1+
      "\n"+"       G)"+this.mdepth1+"       H)"+this.friction1+"       J)"+this.csnow1+"       K)"+this.rlight1+
      "\n"+"       L)"+this.fcplanned1+"       M)"+this.fcexpected1+"       N)"+this.taxiway1+"       P)"+this.taxisnow1;
    }

    if(this.runway2 != '' && this.runway2 != undefined)
    {
      this.result += "\n"+"       C)"+this.runway2+"       D)"+this.runwaylen2+"      E)"+this.runwaywidt2+"       F)"+this.deposition2+
      "\n"+"       G)"+this.mdepth2+"       H)"+this.friction2+"       J)"+this.csnow2+"       K)"+this.rlight2+
      "\n"+"       L)"+this.fcplanned2+"       M)"+this.fcexpected2+"       N)"+this.taxiway2+"       P)"+this.taxisnow2;
    }
    
    if(this.runway3 != '' && this.runway3 != undefined)
    {
      this.result += "\n"+"       C)"+this.runway3+"       D)"+this.runwaylen3+"       E)"+this.runwaywidt3+"       F)"+this.deposition3+
      "\n"+"      G)"+this.mdepth3+"       H)"+this.friction3+"       J)"+this.csnow3+"       K)"+this.rlight3+
      "\n"+"       L)"+this.fcplanned3+"       M)"+this.fcexpected3+"       N)"+this.taxiway3+"       P)"+this.taxisnow3;
    }
    this.result += "\n"+"       R)"+this.apron+"       S)"+this.nxtObsrv+"\n"+"       T)"+this.remarks;
  }

  helpMsgs: Array<any> =
  [
    {name:"serialno",value1:"SerialNumber", value:"geographical designator for States, e.g. LF = FRANCE, EG = United Kingdom"},
    {name:"serialno2",value1:"", value:"SNOWTAM serial number in a four-figuregroup"},
    {name:"locInd",value1:"LocationIndicator",value:"CCCC =four-letter location indicator of theaerodrome to which the SNOWTAM refers"},
    {name:"dtObsv",value1:"Date&Time of Observation",value:"MMYYGGgg =date/time of observation/ measure-ment, whereby: MM = month, e.g. January = 01,December = 12YY = day of the month GGgg = time in hours (GG) andminutes (gg) UTC"},
    {name:"snowtamno",value1:"",value:"SNOWTAM serial number in a four-figuregroup"},
    {name:"aerodrome",value1:"Aerodrome",value:"Aerodrome location indicator (four-letter location indicator)."},
    {name:"dtntm",value1:"Date&Time",value:"Eight-figure date/time group — giving time of observation as month, day, hour and minute in UTC; this item must always be completed."},
    {name:"runway1",value1:"RunwayDesignator",value:"Lower runway designator number."},
    {name:"runwaylen1",value1:"ClearedRunwayLength",value:"Cleared runway length in metres, if lessthan published length (see Item T on reporting on partof runway not cleared)."},
    {name:"runwaywidt1",value1:"ClearedRunwayWidth",value:"Cleared runway width in metres, if less than published width; if offset left or right of centre line,add “L” or “R”, as viewed from the threshold having the lower runway designation number."},
    {name:"deposition1",value1:"Depositions",value:"Deposit over total runway length as explainedin SNOWTAM Format. Suitable combinations of these numbers may be used to indicate varying conditions over runway segments. If more than one deposit is present on the same portion of the runway, they should be reported in sequence from the top to the bottom.Drifts, depths of deposit appreciably greater than the average values or other significant characteristics of the deposits may be reported under Item T in plainlanguage."},
    {name:"mdepth1",value1:"MeanDepth",value:"Mean depth in millimetres deposit for eachthird of total runway length, or “XX” if not measurable or operationally not significant; the assessment to be made to an accuracy of 20 mm for dry snow, 10 mm for wet snow and 3 mm for slush."},
    {name:"friction1",value1:"Friction",value:"if not available,estimated surface friction (single digit) in the order fromthe threshold having the lower runway designation number.type of friction measuring device used:BRD Brakemeter-Dynometer,GRT Grip tester,MUM Mu-meter,RFT Runway friction tester, SFH Surface friction tester (high-pressure tire), SFL Surface friction tester (low-pressure tire), SKH Skiddometer (high-pressure tire), SKL Skiddometer (low-pressure tire),TAP Tapley meter"},
    {name:"csnow1",value1:"CriticalSnowbanks",value:"If present insert height in centimetres and distance from edge of runway inmetres, followed by left (“L”) or right (“R”) side orboth sides (“LR”), as viewed from the thresholdhaving the lower runway designation number"},
    {name:"rlight1",value1:"Runwaylight",value:"If runway lights are obscured, insert “YES”followed by “L”, “R” or both “LR”, as viewed from the threshold having the lower runway designationnumber."},
    {name:"fcplanned1",value1:"FC planned",value:"When further clearance will be undertaken,enter length and width of runway or “TOTAL” if runway will be cleared to full dimensions"},
    {name:"fcexpected1",value1:" FC Expected",value:"Enter the anticipated time of completion in UTC."},
    {name:"taxiway1",value1:"Taxiway",value:"The code for Item F may be used to describetaxiway conditions; enter “NO” if no taxiways servingthe associated runway are available"},
    {name:"taxisnow1",value1:"TAxiwaysnowbanks",value:"If applicable, enter 'YES' followed by thelateral distance in metres."},
    {name:"nxtObsrv",value1:"NextObservation",value:"Enter the anticipated time of nextobservation/measurement in UTC."},
    {name:"apron",value1:"Apron",value:"The code for Item F may be used to describe apron conditions; enter “NO” if the apron is unusable."},
    {name:"remarks",value1:"Remarks",value:"always report on length of uncleared runway  and extent of runwaycontamination . Runway contamination — 10% — if less than 10% of  runway contaminated. Runway contamination — 25% — if 11-25% of runway contaminated Runway contamination — 50% — if 26-50% of runway contaminated Runway contamination — 100% — if 51-100% of runway contaminated."},
    {name:"optgroup",value:""}
  ];
  DispHelpMsg(identity:string)
  {
    this.helpInfoMessage = "";
    //console.log(this.helpMsgs.find((item:any) => item.name == identity));//
    let getHelpDat = this.helpMsgs.find((item:any) => item.name == identity );
    this.helpInfoMessage = getHelpDat.value;
    this.helpMessageHeader = getHelpDat.value1;
    
  }
  ClearHelp()
  {
    this.helpInfoMessage='';
    this.helpMessageHeader="";
  }




  /**********************************   ASHTAM   **********************************************/




  serialNo1:string = "VA";serialNo2:string = "";serialNo3:string = "";
  locInd1:string = "";dtIssue:string = "";optGrp:string = "COR";
  ashtam:string = "";fir1:string = "";eruption:string = "";volcano:string = "";
  latLong:string = "";colorCode1:string = "";ashXtnt:string = "";
  ashCloud:string = "";airRoutes:string = "";altRoutes:string = "";
  srcInfo:string = "";remarks1:string = "";mDisplay:string = "";
  sshow1:boolean = false;
  sshowIt1:boolean = false;
  sshowIt2:boolean = false;
  sshowIt3:boolean = false;
  ffin:any = [];

  OptGrp(event:any)
  {
    switch(event.target.value)
    {
      case "new":
      this.sshow1 = false;
      break;
      case "modfy":
      this.sshow1 = true;
      break;
    }
  }

  AllClear()
  {
    this.serialNo2 = "";this.serialNo3 = "";this.locInd1 = "";this.dtIssue = "";
    this.ashtam = "";this.fir1 = "";this.eruption = "";this.volcano = "";
    this.latLong = "";this.colorCode1 = "";this.ashXtnt = "";this.ashCloud = "";
    this.airRoutes = "";this.altRoutes = "";this.srcInfo = "";this.remarks = "";
    this.helpInfoMessage = "";this.mDisplay = "";this.sshow1 = false;
  }

  getIndi1(event:any)
  {
    let x;
    if(event.target.id == 'serialNo2')
    {
      this.checkIndi1(this.serialNo2, x=1, this.target2);
    }
    else if(event.target.id == 'locInd1')
    {
      this.checkIndi1(this.locInd1, x=2, this.target1);
    }
    else if(event.target.id == 'fir1')
    {
      this.checkIndi1(this.fir1, x=3, this.target1);
    }
  }

  checkIndi1(nme,x,targ)
  {
    var _this = this;
    let count:number = 0;
    this.ffin.splice(0,(this.ffin.length));
    if(nme != '')
    {
      var ttl1:string = '',ttl2:string = '';
      for(let tg in targ)
      {
         ttl1 = targ[tg];
         for(let i = 0; i < nme.length; i++)
         {
           ttl2 += ttl1[i];                      
         }
           if(ttl2 == nme.toUpperCase())
           {
            this.ffin.push(targ[tg]);
           }else if(ttl2 != nme.toUpperCase())
             {
                count++;
                  for(let j = 0; j < this.ffin.length; j++)
                  {
                    if(this.ffin[j] == targ[tg])
                    {
                      this.ffin.splice(j,1);
                    }
                  }
                  if(count == targ.length && ((nme[2]!= "x" && nme[2]!= "X") && nme[2] != undefined))
                  {
                    console.log("Inside");
                    if( (nme[3] != "X" && nme[3] != "x") && nme[3] != undefined)
                    {
                      console.log("Inside2");
                      alert("Not validcode");
                      count = 0;
                    }
                  }else if(count == targ.length && nme[2] == undefined && nme[3] == undefined)
                  {
                    alert("Not validcode Inside");
                  }
              }
         ttl2 = '';
      }
        var cnt = 0;
        for(let i = 0; i < this.ffin.length; i++)
        {
          for(let j = 0; j < this.ffin.length; j++)
          {
            if(this.ffin[i] == this.ffin[j])
            {
              cnt++;
              if(cnt > 1)
              {
               this.ffin[j] = '';
               }
            }
            if( j == this.ffin.length-1){cnt = 0;}
          }
        }
        if(x == 1){this.sshowIt1 = true;}
        else if(x == 2){this.sshowIt2 = true;}
        else if(x == 3){this.sshowIt3 = true;}
      count = 0;
        for(let j in this.ffin)
        {
          if(this.ffin[j] == '')
          {
            this.ffin.splice(parseInt(j),1);
          }
        }
    }else
    {
      if(x == 1){this.sshowIt1 = false;}
      else if(x == 2){this.sshowIt2 = false;}
      else if(x == 3){this.sshowIt3 = false;}
       this.clearAuto();
    }
  }

  autoClick11(f:any)
  {
    this.serialNo2 = f;
    this.sshowIt1 = false;
  }

  autoClick12(f:any)
  {
    this.locInd1 = f;
    this.sshowIt2 = false;
  }

  autoClick13(f:any)
  {
    this.fir1 = f;
    this.sshowIt3 = false;
  }

  clearAuto()
  {
    this.ffin.splice(0,(this.ffin.length));
  }

  helpMsgs1: Array<any> =
  [
    {name:"serialNo2",value1:"SERIALNO",value:"geographical designator for States, e.g. NZ = New Zealand"},
    {name:"serialNo3",value1:"SerialNumber",value:"ASHTAM serial number in a four-figure group."},
    {name:"locInd1",value1:"locationIndicator",value:"four-letter location indicator of the flight information region concerned"},
    {name:"dtIssue",value1:"Date&Time of Issue",value:"date/time of report, whereby:  MM = month, e.g. January = 01, December = 12 YY = day of the month GGgg = time in hours (GG) and minutes (gg) UTC;"},
    {name:"",value:""},
    {name:"fir1", value1:"Fir Effected",value:"Flight information region affected, plain- language equivalent of the location indicator given in the abbreviated heading, in this example “Auckland  Oceanic FIR”."},
    {name:"eruption",value1:"Date&Time of Eruption",value:"Date and time (UTC) of first eruption"},
    {name:"volcano",value1:"Volcano Name&number",value:"Name of volcano, and number of volcano as listed in the ICAO Manual on Volcanic Ash, Radioactive Material and Toxic Chemical Clouds"},
    {name:"latLong",value1:"Latitude&Longitude",value:"Latitude/Longitude of the volcano in whole degrees or radial and distance of volcano from NAVAID"},
    {name:"colorCode1",value1:"ColorCode",value:"<RED-Alert>:-Volcano dangerous, eruption likely, with ash plume/cloud expected to rise  above FL 250.<ORANGE Alert>:-Volcano dangerous, eruption likely but ash plume/cloud not expected to reach FL 250.<YELLOW Alert>:-Volcanic activity has decreased significantly, volcano not currently considered dangerous but caution should be exercised.<GREEN Alert>:-Volcanic activity considered to have ceased and volcano reverted to its normal state."},
    {name:"ashXtnt",value1:"ExtentOfVolconicAsh",value:"If volcanic ash cloud of operational significance is reported, indicate the horizontal extent and  base/top of the ash cloud using latitude/longitude (in whole degrees) and altitudes in thousands of metres (feet) and/or  radial and distance from source volcano. Information  initially may be based only on special air-report, but  subsequent information may be more detailed based on advice from the responsible meteorological watch office and/or volcanic ash advisory centre."},
    {name:"ashCloud",value1:"MovementofAshClouds",value:"Indicate forecast direction of movement of the ash cloud at selected levels based on advice from the  responsible meteorological watch office and/or volcanic ash advisory centre."},
    {name:"airRoutes",value1:"Air Routes&Flight Levels Affected",value:"Indicate air routes and portions of air routes  and flight levels affected, or expected to become affected."},
    {name:"altRoutes",value1:"AirSpaceClouser&AlternativeRoute",value:"Indicate closure of airspace, air routes or portions of air routes, and availability of alternative routes."},
    {name:"srcInfo",value1:"SourceInformation",value:"Source of the information, e.g. “special  air-report” or “vulcanological agency”, etc. The source of  information should always be indicated, whether an eruption has actually occurred or ash cloud reported, or not."},
    {name:"remarks",value1:"Remarks",value:"Include in plain language any operationally significant information additional to the  foregoing."},
    {name:"optGrp",value:""}
  ];

  DispHelpMsg1(identity:string)
  {
    this.helpInfoMessage = "";
    //console.log(this.helpMsgs.find((item:any) => item.name == identity));//
    let getHelpDat = this.helpMsgs1.find((item:any) => item.name == identity );
    this.helpInfoMessage = getHelpDat.value;
    this.helpMessageHeader = getHelpDat.value1;
  }

  ClearHelp1()
  {
    this.helpInfoMessage ='';
    this.helpMessageHeader = "";
  }





  /**********************************   NOTAM   ***************************************/




  selectedElement: any = '';
  startMsgType = "ZCZC";
  channelPrefix: string = '';
  priority = "SS";
  fillingTime = new Date();
  fileList: any = '';
  messageurl = "api/v1/aftn/message";
  sequenceUrl = "api/v1/aftn/bka/sequenceNum";
  groupIndicatorUrl = "api/v1/command/gi";
  drafturl = "api/v1/aftn/draft/";
  responseText: string = '';
  draftName: string = '';
  draftMsg: string = '';
  displaypopup: string = "";
  printData: string = "";
  displayData: string = '';
  index: number = 0;
  msgDraft: any;
  keyWords = ["ZCZC", "CZC", "ZCZ", "NNNN"];
  partitionedAI: any = [];
  draftMsgParts: any = [];
  total: number;
  
  currentDateTime: string;
  sqnNo: string;
  sequenceNo: any;
  DI1: string; DI2: string; DI3: string; DI4: string; DI5: string; DI6: string; DI7: string; DI8: string; DI9: string; DI10: string; DI11: string;
  DI12: string; DI13: string; DI14: string; DI15: string; DI16: string; DI17: string; DI18: string; DI19: string; DI20: string; DI21: string;
  OI23: any;
  validateAI: string = "";
  totalAI = new Set();
  groupIndicators: any = [];
  selectedAdressIndicators: any = [];
  notamn: string = ''; notamr1: string = ''; notamr2: string = ''; notamc1: string = ''; notamc2: string = '';
  NOTAMN: boolean; NOTAMR: boolean; NOTAMC: boolean;
  /*fir1:string='';fir2:string='';fir3:string='';fir4:string='';ntmcode1:string='Q';ntmcode2:string='';ntmcode3:string='';ntmcode4:string='';ntmcode5:string='';traffic1:string='';traffic2:string='';
  purpose1:string='';purpose2:string='';purpose3:string='';scope1:string='';scope2:string='';llimit1:string='';llimit2:string='';llimit3:string='';ulimit1:string='';ulimit2:string='';ulimit3:string='';
  codrad1:string='';codrad2:string='';codrad3:string='';codrad4:string='';codrad5:string='';codrad6:string='';codrad7:string='';codrad8:string='';codrad9:string='';codrad10:string='';codrad11:string='';
  codrad12:string='';codrad13:string='';codrad14:string='';*/locIndd: string = ''; validFrm: string = ''; validTo: string = ''; tmschd: string = ''; notamtxt: string = ''; llimbar: string = ''; ulimbar: string = '';
  totalMsg: string; ntm: string = ''; fir: string = ''; ntmcode1: string = 'Q'; ntmcode2: string = ''; ntmcode3: string = ''; traffic: string = '';
  purpose: string = ''; scope: string = ''; llimit: string = ''; ulimit: string = ''; codrad: string = '';
  findout: boolean = true;
  aftnMessage: any = '';
  helpMessageHeader: string = '';
  display = 'none';
  groupdisplay = 'none';
  selectAI: any[] = [
    { key: 'D1', value: "" },
    { key: 'D2', value: "" },
    { key: 'D3', value: "" },
    { key: 'D4', value: "" },
    { key: 'D5', value: "" },
    { key: 'D6', value: "" },
    { key: 'D7', value: "" },
    { key: 'D8', value: "" },
    { key: 'D9', value: "" },
    { key: 'D10', value: "" },
    { key: 'D11', value: "" },
    { key: 'D12', value: "" },
    { key: 'D13', value: "" },
    { key: 'D14', value: "" },
    { key: 'D15', value: "" },
    { key: 'D16', value: "" },
    { key: 'D17', value: "" },
    { key: 'D18', value: "" },
    { key: 'D19', value: "" },
    { key: 'D20', value: "" },
    { key: 'D21', value: "" },
  ];


  getSeqNumUrl = '/api/v1/notam/series/';
  freeTxt:string="";
  code23:any = [];

  ngOnInit() {
    this.clear();
    this.getLatestSequenceNo();
    this.getCurrentDateTime();
    this.originIndicator = this.originIndi;
    //this.getNotamFirData();
    //this.getCode23Data();
    this.getNotamGenData();
    // this.getCurrentDateTime();
    // this.getLatestSequenceNo();
    this.getGroupIndicator();
    this.getTextFile();
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

  //********** Get Address Indicator***********/
  getAddressIndicators() {
    console.log(this.selectedElement);
    this.serviceObject.setGetOperation(this.groupIndicatorUrl + "//" + this.selectedElement)
      .subscribe(data => {
        this.selectedAdressIndicators = data;
        this.groupClear();
        for (let item = 0; item <= this.selectedAdressIndicators.length; item++) {
          this.selectAI[item].value = this.selectedAdressIndicators[item];
        }
        console.log(this.selectedAdressIndicators);
      }),
      (ResponseError => {
        console.log(ResponseError._body);
        alert("Error: " + JSON.stringify(ResponseError._body));
      });
  }
  getGroupIndicator() {
		this.serviceObject.setGetOperation(this.groupIndicatorUrl)
			.subscribe(data => {
				this.groupIndicators = (data.gi);
				console.log(this.groupIndicators);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}

  groupClear() {
    for (let item of this.selectAI) {
      item.value = "";
    }
  }

  onChange(name) {
    for (let item of this.fileList) {
      if (name == item.name)
        this.draftMsg = item.message;
    }
  }

  displayMessage() {
    if (this.getMsgData() != null) {
      this.display = 'block';
    }
    else
      this.display = 'none';
  }
  displayGroups() {
    this.groupClear();
    this.groupdisplay = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
    this.groupdisplay = 'none';
  }

  print() {
    if (this.getMsgData() != null) {
      var popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write('<html> <center><span style="font-size:12px;color:green"> </span></center><link rel="stylesheet" type="text/css" href="print.css" /> 	<body onload="window.print();window.close()"> <div class=" "  style="text-align:left;font-size:16px;rows:30px; cols:90px" >' + this.printData + '</div></body>');
      popupWin.document.write('</html>');
      popupWin.document.close();
    }
  }
/*********************************NOTAM HELP*************************************** */
 helpInformation: Array<any>=[
   {name:'notamn',value1:'NOTAM',  value:"Each NOTAM shall be allocated a series identified by a letter and a four-digit number followed by a stroke and a two-digit number for the year (e.g. A0023/03)."},
   {name:'fir',  value1:'FIR',  value:"ICAO location indicator of affected FIR or, if applicable to more than one FIR within a State, the first two letters of the ICAO location indicator of a State plus “XX”. The ICAO location indicators of the FIRs concerned shall then be listed in Item A) or indicator of State or non-governmental agency which is responsible for provision of a navigation service in more than one State"},
   {name:'ntmcode2',value1:'NOTAMcode',value:"If the subject is not listed in the NOTAM Code,insert “XX” as the 2nd and 3rd letters (e.g. QXXAK); ->When a NOTAM is issued containing a checklist of valid NOTAM, insert “KKKK” as the 2nd, 3rd, 4th and 5th  "},
   {name:'ntmcode3',value1:'NOTAMcode',value:"If the condition of the subject is not listed in the NOTAM Code,insert “XX” as the 4th and 5th letters (e.g. QFAXX);->When a NOTAM containing operationally significant information,insert “TT” as the 4th and 5th letters of the NOTAM Code;->When a NOTAM is issued containing a checklist of valid NOTAM, insert “KKKK” as the 2nd, 3rd, 4th and 5th letters;->for NOTAM Cancellations 4th and 5th Letters shall be used:->AK:RESUMED NORMAL OPERATION,AL:OPERATIVE (OR RE-OPERATIVE) SUBJECT TO PREVIOUSLY PUBLISHED LIMITATIONS/CONDITIONS,AO:OPERATIONAL,CC:COMPLETED,XX:PLAIN LANGUAGE"},
   {name:'traffic', value1:'TRAFFIC', value:"I = IFR V = VFR K = NOTAM is a checklist.Note:— Depending on the NOTAM subject and content, the qualifier field TRAFFIC may contain combined qualifiers"},
   {name:'purpose', value1:'PURPOSE', value:"N = NOTAM selected for the immediate attention of aircraft operators B = NOTAM selected for PIB entry O = NOTAM concerning flight operations M = Miscellaneous NOTAM; not subject for a briefing, but it is available on request K = NOTAM is a checklist."},
   {name:'scope',   value1:'SCOPE', value:"A = Aerodrome E = En-route  W = Nav warning K = NOTAM is a checklist"},
   {name:'llimit',  value1:'LOWERLIMIT', value:"LOWER and UPPER limits shall always be filled and shall only be expressed in flight levels (FL). In the case of navigation warnings and airspace restrictions, values entered shall be consistent with those provided under Items F) and G). If the subject does not contain specific height information, insert “000” for LOWER and “999” fo UPPER as default values."},
   {name:'ulimit',  value1:'UPPERLIMIT', value:"LOWER and UPPER limits shall always be filled and shall only be expressed in flight levels (FL). In the case of navigation warnings and airspace restrictions, values entered shall be consistent with those provided under Items F) and G). If the subject does not contain specific height information, insert “000” for LOWER and “999” fo UPPER as default values."},
   {name:'codrad',  value1:'COORDINATES,RADIUS', value:"The latitude and longitude accurate to one minute, as well as a three-digit distance figure giving the radius of influence in NM (e.g. 4700N01140E043). Coordinat present approximate centre of circle whose radius encompasses the whole area of influence and if the NOTAM affects the entire FIR/UIR or more than one FIR/UIR, enter the default value “999” for radius."},
   {name:'locInd',  value1:'LOCATIONid', value:"Insert the location indicator of the aerodrome of the aerodrome facility, airspace, or condition being reported on is located.If there is no available ICAO location indicator, use the ICAO nationality letter as given."},
   {name:'validFrm',value1:'VALID FROM',value:"For date-time group use a ten-figure group, giving year, month, day, hours and minutes in UTC. This entry is the date-time at which the NOTAMN comes into force. In the cases of NOTAMR and NOTAMC, the date-time group is the actual date and time of the NOTAM origination"},
   {name:'validTo', value1:'VALID TO',value:"With the exception of NOTAMC, a date-time group indicating duration of information shall be used unless the information is of a permanent nature in which case the abbreviation “PERM” is inserted instead. If the information on timing is uncertain, the approximate duration shall be indicated using a date-time group followed by the abbreviation “EST”. Any NOTAM which includes an “EST” shall be cancelled or replaced before the date-time specified in Item C)."},
   {name:'tmschd',  value1:'TIMESCHEDULE', value:"If the hazard, status of operation or condition of facilities being reported on will be active in accordance with a specific time and date schedule between the dates-times indicated in Items B) and C), insert such information under Item D). If Item D) exceeds 200 characters, consideration shall be given to providing such information in a separate, consecutive NOTAM."},
   {name:'notamtxt',value1:'NOTAMTEXT',value:"When NOTAM is selected for international distribution, English text shall be included for those parts expressed in plain language. This entry shall be clear and concise in order to provide a suitable PIB entry. In the case of NOTAMC, a subject reference and status message shall be included to enable accurate plausibility checks"},
   {name:'llimbar', value1:'LOWERLIMIT',value:"These items are normally applicable to navigation warnings or airspace restrictions and are usually part of the PIB entry. Insert both lower and upper height limits of activities or restrictions, clearly indicating reference datum and units of measurement."},
   {name:'ulimbar', value1:'UPPERLIMIT', value:"These items are normally applicable to navigation warnings or airspace restrictions and are usually part of the PIB entry. Insert both lower and upper height limits of activities or restrictions, clearly indicating reference datum and units of measurement"},
   
 ];


  emptyHelpDisplay() {
    this.helpInfoMessage = "";
    this.helpMessageHeader = "";
  }


  tabGroup: any[] = [{ name: 'FREETXT' }, { name: 'NOTAMN' }, { name: 'NOTAMR' }, { name: 'NOTAMC' }];
  clear() {
    this.sqnNo = ''; this.priority = ''; this.currentDateTime = ''; this.originIndicator = '';
    this.DI1 = ''; this.DI2 = ''; this.DI3 = ''; this.DI4 = ''; this.DI5 = ''; this.DI6 = ''; this.DI7 = '';
    this.DI8 = ''; this.DI9 = ''; this.DI10 = ''; this.DI11 = ''; this.DI12 = ''; this.DI13 = ''; this.DI14 = '';
    this.DI15 = ''; this.DI16 = ''; this.DI17 = ''; this.DI18 = ''; this.DI19 = ''; this.DI20 = ''; this.DI21 = '';
    /*this.fir1='';this.fir2='';this.fir3='';this.fir4='';this.ntmcode1='Q';this.ntmcode2='';this.ntmcode3='';this.ntmcode4='';this.ntmcode5='';this.traffic1='';this.traffic2='';this.purpose1='';this.purpose2='';
    this.purpose3='';this.scope1='';this.scope2='';this.llimit1='';this.llimit2='';this.llimit3='';this.ulimit1='';this.ulimit2='';this.ulimit3='';
    this.codrad1='';this.codrad2='';this.codrad3='';this.codrad4='';this.codrad5='';this.codrad6='';this.codrad7='';this.codrad8='';this.codrad9='';this.codrad10='';this.codrad11='';
    this.codrad12='';this.codrad13='';this.codrad14='';*/this.fir = ''; this.ntmcode1 = 'Q'; this.ntmcode2 = ''; this.ntmcode3 = ''; this.traffic = ''; this.purpose = ''; this.scope = ''; this.llimit = '';
    this.ulimit = ''; this.codrad = ''; this.notamn = ''; this.notamr1 = ''; this.notamr2 = ''; this.notamc1 = ''; this.notamc2 = ''; this.NOTAMN = false; this.NOTAMR = false; this.NOTAMC = false;
    /*.show1 = true; this.show2 = true; this.show3 = true;*/ this.locInd = ''; this.validFrm = ''; this.validTo = ''; this.tmschd = ''; this.notamtxt = ''; this.llimbar = ''; this.ulimbar = '';this.draftName = '';this.selectedElement = "";
  }


  submitGroupIndicator() {
    this.onCloseHandled();
    
    for (let obj of this.selectedAdressIndicators) {
      if (!this.totalAI.has(obj)) {
        if (this.DI1 == null || this.DI1 == "") { this.DI1 = obj; continue; }
        else if (this.DI2 == null || this.DI2 == "") { this.DI2 = obj; continue; }
        else if (this.DI3 == null || this.DI3 == "") { this.DI3 = obj; continue; }
        else if (this.DI4 == null || this.DI4 == "") { this.DI4 = obj; continue; }
        else if (this.DI5 == null || this.DI15 == "") { this.DI5 = obj; continue; }
        else if (this.DI6 == null || this.DI6 == "") { this.DI6 = obj; continue; }
        else if (this.DI7 == null || this.DI7 == "") { this.DI7 = obj; continue; }
        else if (this.DI8 == null || this.DI8 == "") { this.DI8 = obj; continue; }
        else if (this.DI9 == null || this.DI9 == "") { this.DI9 = obj; continue; }
        else if (this.DI10 == null || this.DI10 == "") { this.DI10 = obj; continue; }
        else if (this.DI11 == null || this.DI11 == "") { this.DI11 = obj; continue; }
        else if (this.DI12 == null || this.DI12 == "") { this.DI12 = obj; continue; }
        else if (this.DI13 == null || this.DI13 == "") { this.DI13 = obj; continue; }
        else if (this.DI14 == null || this.DI14 == "") { this.DI14 = obj; continue; }
        else if (this.DI15 == null || this.DI15 == "") { this.DI15 = obj; continue; }
        else if (this.DI16 == null || this.DI16 == "") { this.DI16 = obj; continue; }
        else if (this.DI17 == null || this.DI17 == "") { this.DI17 = obj; continue; }
        else if (this.DI18 == null || this.DI18 == "") { this.DI18 = obj; continue; }
        else if (this.DI19 == null || this.DI19 == "") { this.DI19 = obj; continue; }
        else if (this.DI20 == null || this.DI20 == "") { this.DI20 = obj; continue; }
        else if (this.DI21 == null || this.DI21 == "") { this.DI21 = obj; continue; }
        else { this.totalAI.add(obj); continue; }
      }
      else { continue; }
    }
  }




  checkForKeyWords(container) {
    var content = new String(container);
    for (let keyword of this.keyWords) {
      if (content.indexOf(keyword) != -1)
        return true;
    }
    return false;
  }

  alphOnly(event: any) {
    const pattern = /[a-zA-Z]/g;
    let v = String.fromCharCode(event.charCode);
    if (!pattern.test(v) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  numOnly(event: any) {
    const pattern = /[0-9]/g;
    let v = String.fromCharCode(event.charCode);
    if (!pattern.test(v) && event.charCode != '0') {
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

  alphaNumplus(event: any) {
    const pattern = /[a-zA-Z0-9/ ]/g;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  getntmcode() {

    if (this.notamn != '') {

      this.ntm = this.notamn + " NOTAMN";
    }
    else if (this.notamr1 != '' && this.notamr2 != '') {

      let k: any = '';
      let j: any = '';

      if ((this.notamr1[0] == this.notamr2[0] && this.notamr1.charCodeAt(0) >= 65 && this.notamr1.charCodeAt(0) <= 90) || (this.notamr1[0] == this.notamr2[0] && this.notamr1.charCodeAt(0) >= 97 && this.notamr1.charCodeAt(0) <= 122)) {

        for (let i = 1; i <= 4; i++) {
          k += this.notamr1[i];
        }

        let p: Number = parseInt(k);

        k = '';

        for (let i = 6; i <= 7; i++) {
          k += this.notamr1[i];
        }

        let l: Number = parseInt(k);

        for (let i = 1; i <= 4; i++) {
          j += this.notamr2[i];
        }

        let q: Number = parseInt(j);

        j = '';

        for (let i = 6; i <= 7; i++) {
          j += this.notamr2[i];
        }

        let m: Number = parseInt(j);

        if (p <= q) {
          alert("NOTAM Codes are incorrect for 2");
          this.findout = true;
        } else {
          this.findout = false;
        }

        if (m > l) {
          alert("NOTAM Codes are incorrect for 3");
          this.findout = true;
        } else {
          this.findout = false;
        }

      } else {
        alert("NOTAM Codes are incorrect for 1");
        this.findout = true;
      }

      this.ntm = this.notamr1 + " NOTAMR " + this.notamr2;
    }
    else if (this.notamc1 != '' && this.notamc2 != '') {

      let k: string = '';
      let j: string = '';

      if ((this.notamc1[0] == this.notamc2[0] && this.notamc1.charCodeAt(0) >= 65 && this.notamc1.charCodeAt(0) <= 90) || (this.notamc1[0] == this.notamc2[0] && this.notamc1.charCodeAt(0) >= 97 && this.notamc1.charCodeAt(0) <= 122)) {

        for (let i = 1; i <= 4; i++) {
          k += this.notamc1[i];
        }

        let p: Number = parseInt(k);

        k = '';

        for (let i = 6; i <= 7; i++) {
          k += this.notamc1[i];
        }

        let l: Number = parseInt(k);

        for (let i = 1; i <= 4; i++) {
          j += this.notamc2[i];
        }

        let q: Number = parseInt(j);

        j = '';

        for (let i = 6; i <= 7; i++) {
          j += this.notamc2[i];
        }

        let m: Number = parseInt(j);

        if (p <= q) {
          alert("NOTAM Codes are incorrect for 2");
          this.findout = true;
        } else {
          this.findout = false;
        }

        if (m > l) {
          alert("NOTAM Codes are incorrect for 3");
          this.findout = true;
        } else {
          this.findout = false;
        }

      } else {
        alert("NOTAM Codes are incorrect for 1");
        this.findout = true;
      }
      this.ntm = this.notamc1 + " NOTAMC " + this.notamc2;
    }
  }

  getCurrentDateTime() {
		this.currentDateTime = (this.fillingTime.getUTCDate() < 10 ? '0' : '') + this.fillingTime.getUTCDate() +
			(this.fillingTime.getUTCHours() < 10 ? '0' : '') + this.fillingTime.getUTCHours() +
			(this.fillingTime.getUTCMinutes() < 10 ? '0' : '') + this.fillingTime.getUTCMinutes();
  }
  
  getSequenceNumber()
  {
    this.serviceObject.setGetOperation(this.getSeqNumUrl+"/"+this.notamn[0])
    .subscribe(
      respData =>{
        console.log(respData);
      });
  }

  /*   notamFirUrl    = "/api/v1/notam/fir";
   notamCode23Url = "/api/v1/notam/code23";
   notamUrl       = "/api/v1/notam/";*/

  getNotamFirData()
  {
    this.serviceObject.setGetOperation(this.notamFirUrl)
    .subscribe(firResp => {
      console.log("firResp:   "+firResp);
    }),
    (ResponseError => {
      console.log(ResponseError._body);
    })
  }

  getCode23Data()
  {
    this.serviceObject.setGetOperation(this.notamCode23Url)
    .subscribe(code23Resp => {
      let jj = JSON.stringify(code23Resp);
      console.log(jj);
      for(let a in code23Resp)
      {
        this.code23.push(code23Resp[a].subjectId);
      }
      for(let b in this.code23)
      {
        console.log("final result:  "+this.code23[b]);
      }
    }),
    (ResponseError => {
      console.log(ResponseError._body);
    })
  }

  getNotamGenData()
  {
    console.log("inside");
    this.serviceObject.setGetOperation(this.notamUrl)
    .subscribe(genData => {
      console.log("Gen Data:   "+ genData);
    }),
    (ResponseError => {
      console.log("Gen Data Error:   "+ResponseError._body);
    })
  }

  getLatestSequenceNo() {
		this.serviceObject.setGetOperation(this.sequenceUrl)
			.subscribe(data => {
				this.sqnNo = data.sequenceNum;
        this.sequenceNo = Number(data.sequenceNum);
				console.log(data.sequenceNum);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				//alert("Error: "+JSON.stringify(ResponseError._body));
			});
	}

  getTotalIndicators()
  {
    this.totalHeader = this.DI1 + " " + this.DI2 + " " + this.DI3 + " " + this.DI4 + " " + this.DI5 + " " + this.DI6 + " " + this.DI7 + "\n" +
                       this.DI8 + " " + this.DI9 + " " + this.DI10 + " " + this.DI11 + " " + this.DI12 + " " + this.DI13 + " " + this.DI14 + "\n" +
                       this.DI15 + " " + this.DI16 + " " + this.DI17 + " " + this.DI18 + " " + this.DI19 + " " + this.DI19 + " " + this.DI20 + " " + this.DI21;
    
    this.totalHeader = this.totalHeader.toLocaleUpperCase().trim();

    if (this.totalHeader.length == 0) {
      alert("Please enter atleast one Address Indicator");
      return;
    }
    else {
      if (this.checkForKeyWords(this.totalHeader)) {
        alert("Please verify Addres Indiactor may contain " + this.keyWords);
        return;
      }
      if (this.checkForKeyWords(this.OI23)) {
        alert("Please verify Origin Indiactor may contain " + this.keyWords);
        return;
      }
      else
        return this.totalHeader;
    }
  }

  getcompleteAddressIndicators() {
		this.getTotalIndicators();
		this.partitionedAI = [];
		this.partitionedAI.push(this.totalHeader);
		var remstart = 0; var remstep = 21; var remend = remstart;
		var extraAI = "";
		var remtotal = Math.ceil(this.totalAI.size / remstep);
		for (let rotate = 1; rotate <= remtotal; rotate++) {
			rotate == remtotal ? remend = this.totalAI.size : remend = remend + remstep;
			for (; remstart < remend; remstart++) {
				if (remstart % 7 == 0)
					extraAI += "\n" + this.totalAI[remstart];
				else
					extraAI += " " + this.totalAI[remstart];
			}
			this.partitionedAI.push(extraAI);
			extraAI = "";
		}
  }
  
  getMsgData() {
		this.getcompleteAddressIndicators();
		this.sendMessage();
		if (this.partitionedAI.length > 0) {
			if (this.checkForKeyWords(this.draftMsg.toUpperCase())) {
				alert("Please verify the Message ,It may contain " + this.keyWords);
				return;
			}
			else {
				this.splitMessage(this.draftMsg.toUpperCase(), this.draftMsg.trim().length);
				return this.draftMsgParts;
			}
		}
		else {
			alert("Destination Indicators are null");
			return;
		}
  }
  
  splitMessage(draftMessage, msglength) {
		var start = 0; var step = 1000; var end = step; var result;
		this.total = Math.ceil(msglength / step);
		this.displayData = ""; this.printData = ""; var partMessage = "";
		this.getLatestSequenceNo();
		for (let splitAI of this.partitionedAI) {
			for (let part = 1; part <= this.total; part++) {
				result = draftMessage.substring(start, end);
				var headerPart1 = this.startMsgType + " " + this.channelPrefix + (this.sequenceNo < 10 ? '0' : '') + (this.sequenceNo < 100 ? '00' : '') + this.sequenceNo;
				var headerPart2 = this.priority + " " + splitAI;
				var headerPart3 = this.currentDateTime + " " + this.originIndicator;
				var headerPart4 = "// END PART 0" + (part == this.total ? (part + "/0" + part) : part) + " //";
				this.printData = this.printData + (headerPart1 + "<br>" + headerPart2 + "<br>" + headerPart3 + "<br>" + result + "<br><br><br><br><br>" + (this.total > 1 ? headerPart4 : '') + "<br><br>NNNN<br>").toUpperCase();
				partMessage = (headerPart1 + "\n" + headerPart2 + "\n" + headerPart3 + "\n" + result + "\n\n\n\n\n" + (this.total > 1 ? headerPart4 : '') + "\n\nNNNN\n").toUpperCase();
				this.draftMsgParts.push(partMessage);
				this.displayData = this.displayData + partMessage;
				start = end; end = end + step;
				this.sequenceNo = this.sequenceNo + 1;
			}
			start = 0; end = step;
		}
	}

  submit() {
    this.getMsgData();
    this.postFinalMessage();
  }
  listClick(newValue) {
		this.selectedItem = newValue;
    //this.clear();//
    console.log(this.selectedItem);
	}


  sendMessage()
  {
    console.log("Inside Send Message");
  
    this.draftMsg = '';
    switch(this.selectedItem)
    {
      case 'FREETXT':
       { this.draftMsg = "FREETXT" + "-" + this.freeTxt;
        break;}

      case 'NOTAMN':
       {this.draftMsg = this.notamn + " NOTAMN" + "\n" + "Q)" + this.fir + "/" + this.ntmcode1 + this.ntmcode2 + this.ntmcode3 +
                        "/" + this.traffic + "/" + this.purpose + "/" + this.scope + "/" + this.llimit + "/" + this.ulimit + "/" + this.codrad +
                        "\n" + "A)" + this.locInd + "\n" + "B)" + this.validFrm + "\n" + "C)" + this.validTo + "\n" + "D)" + this.tmschd +
                        "\n" + "E)" + this.notamtxt + "\n" + "F)" + this.llimbar + "\n" + "G)" + this.ulimbar;
        console.log("Draft:   "+this.draftMsg+"\n\n\n");
        console.log("JSON:   "+JSON.stringify(this.draftMsg));
        break;}

      case 'NOTAMR':
     { this.draftMsg = this.notamr1 + " NOTAMN" + this.notamr2 + "\n" + "Q)" + this.fir + "/" + this.ntmcode1 + this.ntmcode2 + this.ntmcode3 +
                        "/" + this.traffic + "/" + this.purpose + "/" + this.scope + "/" + this.llimit + "/" + this.ulimit + "/" + this.codrad +
                        "\n" + "A)" + this.locInd + "\n" + "B)" + this.validFrm + "\n" + "C)" + this.validTo + "\n" + "D)" + this.tmschd +
                        "\n" + "E)" + this.notamtxt + "\n" + "F)" + this.llimbar + "\n" + "G)" + this.ulimbar;
        console.log("Draft:   "+this.draftMsg+"\n\n\n");
        console.log("JSON:   "+JSON.stringify(this.draftMsg));
        break;}

      case 'NOTAMC':
      {this.draftMsg = this.notamc1 + " NOTAMC" + this.notamc2 + "\n" + "Q)" + this.fir + "/" + this.ntmcode1 + this.ntmcode2 + this.ntmcode3 +
                        "/" + this.traffic + "/" + this.purpose + "/" + this.scope + "/" + this.llimit + "/" + this.ulimit + "/" + this.codrad +
                        "\n" + "A)" + this.locInd + "\n" + "B)" + this.validFrm + "\n" + "C)" + this.validTo + "\n" + "D)" + this.tmschd +
                        "\n" + "E)" + this.notamtxt + "\n" + "F)" + this.llimbar + "\n" + "G)" + this.ulimbar;
        console.log("Draft:   "+this.draftMsg+"\n\n\n");
        console.log("JSON:   "+JSON.stringify(this.draftMsg));
        break;}

      case 'SNOWTAM':
     { this.draftMsg ="SW"+this.serialno1 + this.serialno2 + "\t" +this.locInd + "\t" + this.dtObserv +"\n" + 
                      "(" + "SNOWTAM" + this.snowtamno + "\n" + "A)" + this.aerodrome + "\t" + "B)" + this.dtntm + "\t" +
                      "C)" + this.runway1 + "\t" +"D)" + this.runwaylen1 + "\t" +"E)" + this.runwaywidt1 +"\t" + "F)" + this.deposition1 + 
                      "\t" +"G)" + this.mdepth1 +"\t" + "H)" + this.friction1 +"\t" + "J)" + this.csnow1 +"\t" + "K)" + this.rlight1 + "\t" +"L)" + 
                      this.fcplanned1 + "\t" +"M)" + this.fcexpected1 + "\t" +"N)" + this.fcexpected1 + "\t" +"p)" + this.taxisnow1 + "\n" + 
                      "R)" + this.apron + "S)" + this.nxtObsrv + "T)"  +  this.remarks + ")";
                      console.log("Draft:   "+this.draftMsg+"\n\n\n");
        console.log("JSON:   "+JSON.stringify(this.draftMsg));
       
        break;}

      case 'ASHTAM':
     { this.draftMsg = "VA" + this.serialNo2 + this.serialNo3 + "\t" + this.locInd1 + "\t" + this.dtIssue + "\n" +
      "ASHTAM" + this.ashtam + "A)" + this.fir1 + "B)" + this.eruption + "C)" + this.volcano + "D)" + this.latLong + 
      "E)" + this.colorCode1 + "F)" + this.ashXtnt + "G)" + this.ashCloud + "H)" + this.airRoutes + "I" + this.altRoutes + 
      "\n" + "J" + this.srcInfo + "\n" + "K" + this.remarks1;
      console.log("Draft:   "+this.draftMsg+"\n\n\n");
      console.log("JSON:   "+JSON.stringify(this.draftMsg));
        break;}
    }
  }
  selectedItem: string = '';
  totalHeader: string = '';
  totalFinalHeader: any = [];
  draftMsgBody;
  msgBody; 
  helpDisplay(textBoxName) {
		let selectedItem: any = this.helpInformation.find((item: any) => item.name == textBoxName);
		this.helpInfoMessage = selectedItem.value;
		this.helpMessageHeader = selectedItem.value1;
		//this.helpInfoMessage1=selectedItem.value;
	}

  
  postFinalMessage()
  {
    for (let i = 0; i < this.draftMsgParts.length; i++) {
      console.log(this.draftMsgParts[i]);
      this.serviceObject.setPostOperation(this.sendTotalMessageUrl, this.draftMsgParts[i])
        .subscribe(data => {
          this.responseText = data.response;
          ////alert(data.response);
          console.log(data.response);
          this.clear();
        }),
        (ResponseError => {
          console.log(ResponseError._body);
          //alert("Error: "+JSON.stringify(ResponseError._body));
        });
    }
  }
  onTextFileSave() {
		if (this.draftMsg.trim().length == 0) {
			//alert('Message can not be empty');
			return;
		}
		else if (this.draftName.trim().length == 0) {
			//alert("File Name can not be empty ");
			return;
		}
		else {
			var draft = { name: this.draftName.toUpperCase(), message: this.draftMsg.toUpperCase() };
			//alert(JSON.stringify(this.fileList));
			if (this.fileList != null) {
				for (let item of this.fileList) {
					if (this.draftName == item.name) {
						//alert("File with name already exists"+item.name);
						return;
					}
				}
			}
			let body = JSON.stringify(draft);
			this.serviceObject.setPostOperation(this.drafturl, body)
				.subscribe(data => {
					this.responseText = data;
					console.log(data);
					this.getTextFile();
					//this.clear();
				}),
				(ResponseError => {
					console.log(ResponseError._body);
					//alert("Error: "+JSON.stringify(ResponseError._body));
				});
		}
  }
  onTextFileDelete(fileToDelete) {
		var draft = this.drafturl + "/" + fileToDelete;
		this.serviceObject.setDeleteOperation(draft)
			.subscribe(data => {
				this.responseText = data.response;
				console.log(data.response);
				this.getTextFile();
				this.clear();
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				//alert("Error: "+JSON.stringify(ResponseError._body));
			});
	}

	getTextFile() {
		this.serviceObject.setGetOperation(this.drafturl)
			.subscribe(data => {
				this.fileList = data.content;
				console.log(this.fileList);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				//alert("Error: "+JSON.stringify(ResponseError._body));
			});
	}

}
