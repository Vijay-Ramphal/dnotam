import { Component, ViewChild, OnInit } from '@angular/core';
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
  selector: 'app-transmit-q',
  templateUrl: './transmit-q.component.html',
  styleUrls: ['./transmit-q.component.css']
})
export class TransmitQComponent implements OnInit {

  rejectQurl = 'api/v1/command/rejectQ';
  suspendQurl = 'api/v1/command/suspendQ';
  errorQurl = "api/v1/command/errorQ";
  killurl = "api/v1/command/q/kill";
  messageurl = "api/v1/aftn/message";
  responseText: string = '';
  inboxpagesize;
  outboxpagesize;
  public routeStatus: any = [];
  data: string = '';
  url = 'api/v1/command/';
  current: string;
  response: string;
  jsondata1: any = [];
  errorPages: number[];
  errorPage: number = 0;
  rejectPages: number[];
  rejectPage: number = 0;
  suspendPages: number[];
  suspendPage: number = 0;
  public rejectQList: any = [];
  public suspendQList: any = [];
  public errorQList: any = [];
  constructor(public serviceObject: AppService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }
  RQisChecked = false;
  SQisChecked = false;
  EQisChecked = false;
  pager: any = {};
  kumar1: any = [];
  pagedItems: any[];
  rejectQPagedItems: any[];
  suspendQPagedItems: any[];
  errorQPagedItems: any[];
  routeMessagesItems: any[];
  RQMsg;
  SQMsg;
  EQMsg: any = [];
  EQDMsg: any = [];
  selectedAll: any;
  selectedRow: Number;
  setClickedRow: Function;
  indraftMsg: string = "";
  selectedRoute: string = "";
  killTransmitMessage: any;
  threeQkillID: number;
  transmitQCount: number;
  errorQCount: number;
  rejectQCount: number;
  suspendQCount: number;
  transmitPageIndex: number = 0;


  ngOnInit() {
    this.getRejectQData();
    this.getSuspendQData();
    this.getErrorQData();
    //this.setPage(1);
    this.selectedRow = undefined;
    this.getTransmitQData();
  }
  getRejectQData() {
    this.serviceObject.setGetOperation(this.rejectQurl + "?page=" + this.rejectPage)
      .subscribe(ResponseText => {
        this.rejectQList = ResponseText.content;
        this.rejectQCount = ResponseText.numberOfElements;
        this.rejectPages = new Array(ResponseText.totalPages);
        console.log(this.rejectQList);
        // alert(this.inboxpagesize);
        // this.pager = this.getPager(this.inboxpagesize, 1, 5);
        // this.inBoxPagedItems = this.inBoxList.slice(this.pager.startIndex, this.pager.endIndex + 1);
      },
      ResponseError => {
        ////alert("Error: "+JSON.stringify(ResponseError._body));
      }
      );
  }
  getSuspendQData() {
    this.serviceObject.setGetOperation(this.suspendQurl + "?page=" + this.suspendPage)
      .subscribe(ResponseText => {
        this.suspendQList = ResponseText.content;
        //alert(JSON.stringify(this.outBoxList));	
        this.suspendPages = new Array(ResponseText.totalPages);
        console.log(this.suspendQList);
        this.suspendQCount = ResponseText.numberOfElements;
      },
      ResponseError => {
        //alert("Error: "+JSON.stringify(ResponseError._body));
      }
      );
  }
  getErrorQData() {
    this.serviceObject.setGetOperation(this.errorQurl + "?page=" + this.errorPage)
      .subscribe(ResponseText => {
        this.errorQList = ResponseText.content;
        //alert(JSON.stringify(this.inBoxList));
        this.errorPages = new Array(ResponseText.totalPages);
        this.errorQCount = ResponseText.numberOfElements;
        console.log(this.errorQList);
        // alert(this.inboxpagesize);
        // this.pager = this.getPager(this.inboxpagesize, 1, 5);
        // this.inBoxPagedItems = this.inBoxList.slice(this.pager.startIndex, this.pager.endIndex + 1);		
      },
      ResponseError => {
        ////alert("Error: "+JSON.stringify(ResponseError._body));
      }
      );
  }

  getTransmitQData() {
    this.serviceObject.setPostOperation(this.url, "RSTS-ALL")
      .subscribe(data => {
        var jsondata = JSON.parse(data.response);
        this.routeStatus = jsondata.VALUES;
        this.transmitQCount = 0;
        for (var i = 1; i < this.routeStatus.length; i++) {
          this.transmitQCount = this.transmitQCount + parseInt(this.routeStatus[i][1]);
        }
      },
      ResponseError => {
        //alert("Error: "+JSON.stringify(ResponseError._body));
      }
      );
  }

  routeSelect(row) {
    this.selectedRoute = row[0];
    this.data = "DMSG-" + this.selectedRoute + "?page=" + this.transmitPageIndex + "&size=20";
    this.serviceObject.setGetOperation(this.url + "transmitQ/fetch/" + this.data)
      .subscribe(data => {
        var length = data.messages.totalElements;
        alert(length);
        this.routeMessagesItems = [];
        for (var i = 0; i < length; i++) {
          console.log(JSON.parse(data.messages.content[i]));
          this.routeMessagesItems.push(JSON.parse(data.messages.content[i]));
        }
        console.log(this.routeMessagesItems);
      },
      ResponseError => {
        //alert("Error: "+JSON.stringify(ResponseError._body));
      });
  }

  transmitQBoxChanged(row) {
    this.killTransmitMessage = row;
    this.indraftMsg = row.AftnMessage;
  }

  setPage(i, event: any, queueName) {
    if (queueName == 'suspend') {
      event.preventDefault();
      if (i > 0 && i < this.suspendPages) {
        this.suspendPage = i;
        this.getSuspendQData();
      }
    }
  }
  selectAllInbox() {
    for (var i = 0; i < this.rejectQList.length; i++) {
      this.RQisChecked = true;
    }
  }
  selectAllsuspendq() {
    for (var i = 0; i < this.suspendQList.length; i++) {
      this.SQisChecked = true;
    }
  }
  selectAllInbox2() {
    for (var i = 0; i < this.errorQList.length; i++) {
      this.EQisChecked = true;
    }
  }
  DeselectAllInbox() {
    for (var i = 0; i < this.rejectQList.length; i++) {
      this.RQisChecked = false;
    }
    this.ngOnInit();
    this.RQMsg = "";
  }
  DeselectAllInbox1() {
    for (var i = 0; i < this.suspendQList.length; i++) {
      this.SQisChecked = false;
    }
    this.ngOnInit();
    this.SQMsg = "";
  }
  DeselectAllInbox2() {
    for (var i = 0; i < this.errorQList.length; i++) {
      this.EQisChecked = false;
    }
    this.ngOnInit();
    this.EQMsg = "";
  }
  getPager(totalItems, currentPage, pageSize) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    }
    else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = endPage + 1; // _.range(startPage, endPage + 1);
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  rejectQBoxChanged(selectedMessage) {
    this.threeQkillID = selectedMessage.id;
    var msg = <HTMLInputElement>document.getElementById('RQcomment');
    this.RQMsg = selectedMessage.messageText;
    // else{
    // 	this.RQMsg="";
    // }
  }
  suspendQBoxChanged(selectedMessage) {
    var msg = <HTMLInputElement>document.getElementById('SQcomment');
    this.SQMsg = selectedMessage.messageText;
    // else{
    // 	this.SQMsg="";
    // }
  }
  errorQBoxChanged(selectedMessage) {
    this.threeQkillID = selectedMessage.id;
    var msg = <HTMLInputElement>document.getElementById('EQcomment');
    var msg1 = <HTMLInputElement>document.getElementById('EQDcomment');
    this.EQMsg = selectedMessage.messageText;
    this.EQDMsg = selectedMessage.errorDesc;
    // else{
    // 	this.EQMsg="";
    // 	this.EQDMsg="";
    // }
  }

  edit() {
    var erroredit = <HTMLInputElement>document.getElementById('EQcomment');
    erroredit.disabled = false; erroredit.style.backgroundColor = '';
    var EQsub = <HTMLInputElement>document.getElementById('EQsub');
    EQsub.disabled = true;
  }

  submit() {
    var errorsubmit = <HTMLInputElement>document.getElementById('EQcomment');
    var edit = errorsubmit.value.toUpperCase();
    alert(edit);
    this.serviceObject.setPostOperation(this.messageurl, edit)
      .subscribe(data => {
        this.responseText = data.response;
        console.log(data.response);
        alert(data.response);
        //this.clear();
      }),
      (ResponseError => {
        console.log(ResponseError._body);
        //alert("Error: "+JSON.stringify(ResponseError._body));
      });
  }

  killMessage(queueName) {
    var killRecord = queueName + "-" + this.threeQkillID;
    console.log("Killing Record :" + killRecord);
    this.serviceObject.setPostOperation(this.killurl, killRecord)
      .subscribe(data => {
        console.log(data);
      }),
      (ResponseError => {
        console.log(ResponseError._body);
        //alert("Error: "+JSON.stringify(ResponseError._body));
      });

  }

  routeKillMessage() {
    var killRecord = "KMSG-" + this.selectedRoute + "-" + this.killTransmitMessage.MessagePriority + "-" + this.killTransmitMessage.MessageId;
    console.log("Killing Transmit Record :" + killRecord);
    this.serviceObject.setPostOperation(this.url + "transmitQ/kill", killRecord)
      .subscribe(data => {
        console.log(data);
      }),
      (ResponseError => {
        console.log(ResponseError._body);
        //alert("Error: "+JSON.stringify(ResponseError._body));
      });

  }
  routePagination(option) {
    alert("I AM here");
    if (this.transmitPageIndex > 0) {
      option === "next" ?
        (this.transmitPageIndex = this.transmitPageIndex + 1) :
        (this.transmitPageIndex = this.transmitPageIndex - 1);
      this.routeSelect(this.selectedRow)
    }
    else
      alert("Cannot Go to Previous");
  }

}

export interface Element {
  RouteName: string;
  PendingMessages: string;
  RouteStatus: string;
  DivertedRouteName: string;
}

export interface TQElement {
	aftnmessage: string;
	channelPrefix: string;
	channelSeqNo: number;
	destinationIndicators: string;
	id: number;
	messageLogTime: number;
	messageStatus: string;
	messageText: string;
	messageType: string;
	originDate: number;
	originIndicator: string;
	priority: string;
	transmissionStatus: boolean;
}