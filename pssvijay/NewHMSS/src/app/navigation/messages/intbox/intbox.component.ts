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
  MatPaginator,
} from '@angular/material';

@Component({
  selector: 'app-intbox',
  templateUrl: './intbox.component.html',
  styleUrls: ['./intbox.component.css']
})

export class IntboxComponent implements OnInit {
  //   selection = new SelectionModel<Element>(false, []);
  //   inboxurl = 'api/v1/command/inbox';
  // 	messageurl = "api/v1/aftn/message";
  // 	inboxdeleteurl = 'api/v1/command/inbox/delete/';
  // 	public inBoxList: Element[] = [];
  // 	indraftMsg: string;
  // 	inboxcount: number;
  // 	pages: number[];
  // 	page: number = 0;
  //   displayedColumns = ['select', 'channelPrefix', 'channelSeqNo', 'priority', 'originIndicator'];
  // 	dataSource;

  //   constructor(private serviceObject: AppService) {
  // 		this.getInboxData();
  //   }

  //   getInboxData() {
  // 		this.serviceObject.setGetOperation(this.inboxurl + "?page=" + this.page)
  // 			.subscribe(data => {
  //         this.dataSource = new MatTableDataSource<Element>(data.content);
  // 				this.inboxcount = data.content.length;
  // 				this.pages = new Array(data.totalPages);
  // 				Observable.interval(60000).subscribe(() => {
  // 					this.fetchData();
  // 				})
  // 			}),
  // 			(ResponseError => {
  // 				console.log(ResponseError._body);
  // 				alert("Error: " + JSON.stringify(ResponseError._body));
  // 			});
  // 	}
  // 	fetchData() {

  // 		this.serviceObject.setGetOperation(this.inboxurl + "?page=" + this.page)
  // 			.subscribe(data => {
  //         this.dataSource = new MatTableDataSource<Element>(data.content);
  // 				this.inboxcount = data.content.length;
  // 				this.pages = new Array(data.totalPages);
  // 			}),
  // 			(ResponseError => {
  // 				console.log(ResponseError._body);
  // 				alert("Error: " + JSON.stringify(ResponseError._body));
  // 			});
  //   }

  //   isAllSelected() {
  //     const numSelected = this.selection.selected.length;
  //     const numRows = this.dataSource.data.length;
  //     return numSelected === numRows;
  //   }

  //   masterToggle() {
  //     this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  //   }
  //   selectionChanged(row)
  //   {
  //     this.indraftMsg = row.aftnMessage;
  //     console.log(row);
  //   }
  // }

  // export interface Element {
  //   aftnMessage : string;
  //   channelPrefix : string;
  //   channelSeqNo : number;
  //   destinationIndiacator : string;
  //   id : number;
  //   messaageStatus : string;
  //   messageLogTime : number;
  //   messageText : string;
  //   originDate : number;
  //   originIndicator : string;
  //   priority : string;
  //   state : boolean;
  // }
//   display = 'none';
//   constructor() { }

//   selectAI: any[] = [
//     {key:'D1', value:""},
//     {key:'D2', value:""},
//     {key:'D3', value:""},
//     {key:'D4', value:""},
//     {key:'D5', value:""},
//     {key:'D6', value:""},
//     {key:'D7', value:""},
//     {key:'D8', value:""},
//     {key:'D9', value:""},
//     {key:'D10', value:""},
//     {key:'D11', value:""},
//     {key:'D12', value:""},
//     {key:'D13', value:""},
//     {key:'D14', value:""},
//     {key:'D15', value:""},
//     {key:'D16', value:""},
//     {key:'D17', value:""},
//     {key:'D18', value:""},
//     {key:'D19', value:""},
//     {key:'D20', value:""},
//     {key:'D21', value:""},
//   ];

//   ngOnInit() {

//   }

//   openModal() {
//     this.display = 'block';
//   }

//   onCloseHandled() {
//     this.display = 'none';
//   }

// }
p = new Date();
dd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
mn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
options = ["SS", "DD", "FF", "GG", "KK"];
messageQuery: string = "";
yrs = this.p.getFullYear();
yr = [];
public msgList: Array<any> = [];
msgurl = 'api/v1/command/inbox';
msgcount: number;
pages: number[];
page: number = 0;
recMsg: string = "";
indraftMsg="";
i: Number = 1;
totalMsg:string='';

constructor(private serviceObj: AppService) {
  for (var i = -10; i <= 100; i++) {
    this.yr.push(this.yrs + i);
  }
  this.getMessages();
}

priority: string = ''; msgRad: boolean ; chPrefix: string = ''; aiGet: string = ''; ioGet: string = ''; msgNoFrm: string = '';
msgNoTo: string = ''; skip1Frm: string = ''; skip1To: string = ''; fillTmFrm: string = ''; fillTmTo: string = ''; skip2Frm: string = ''; skip2To: string = '';
rxTmFrm: string = ''; rxTmTo: string = ''; skip3Frm: string = ''; skip3To: string = ''; txTmFrm: string = '';
txTmTo: string = ''; skip4Frm: string = ''; skip4To: string = ''; msgType: boolean ; msgText: boolean;
daysFrm: string = ''; daysTo: string = ''; monthsFrm: string = ''; monthsTo: string = ''; yearsFrm: string = ''; yearsTo: string = '';
 getStr1: string = ''; getStr2: string = ''; getStr3: string = '';



 visibility= 'visible';
show=false;
hidden=false;


onSubmit() {
  this.totalMsg = this.msgRad+" "+this.daysFrm+this.monthsFrm+this.yearsFrm+" "+this.daysTo+this.monthsTo+this.yearsTo+" "+this.priority+" "+this.chPrefix+" "+this.aiGet+" "
  +this.ioGet+" "+this.msgNoFrm+" "+this.msgNoTo+" "+this.skip1Frm+" "+this.skip1To+" "+this.fillTmFrm+" "+this.fillTmTo+" "+this.skip2Frm
  +" "+this.skip2To+" "+this.rxTmFrm+" "+this.rxTmTo+" "+this.skip3Frm+" "+this.skip3To+" "+this.txTmFrm+" "+this.txTmTo+" "+this.skip4Frm
  +" "+this.skip4To+" "+this.msgType+" "+this.msgText+" "+this.messageQuery+" "+this.getStr1+" "+this.getStr2+" "+this.getStr3;

  console.log(this.totalMsg.toUpperCase());
}

ngOnInit(){};



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
}

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

setPage(i, event: any) {
  event.preventDefault();
  if (i > 0 && i < this.pages) {
    this.page = i;
    this.getMessages();
  }
}

getMessages() {
  this.serviceObj.setGetOperation(this.msgurl + "?page=" + this.page)
    .subscribe(data => {
      this.msgList = data.content;
      this.msgcount = this.msgList.length;
      this.pages = new Array(data.totalPages);
      console.log(this.msgcount);
      console.log(this.msgList);
    });
}








checkAll(ev) {
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



}

