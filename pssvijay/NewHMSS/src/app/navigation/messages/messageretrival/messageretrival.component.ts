import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-messageretrival',
  templateUrl: './messageretrival.component.html',
  styleUrls: ['./messageretrival.component.css']
})
export class MessageRetrivalComponent {

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
  indraftMsg = "";
  i: Number = 1;
  totalMsg: string = '';
  printData: string = "";

  totalHeader: string = '';
  totalFinalHeader: any = [];
  draftMsgBody;
  msgBody;
  partMessage: any;
  draftMsgParts: any = [];
  draftMsg:Array<any> = [];

  constructor(private serviceObj: AppService) {
    for (var i = -10; i <= 100; i++) {
      this.yr.push(this.yrs + i);
    }
    //this.getMessages();
  }

  priority: string = ''; incoming: boolean; outgoing: boolean; msgRad: string = ''; chPrefix: string = ''; aiGet: string = ''; ioGet: string = ''; msgNoFrm: string = '';
  msgNoTo: string = ''; skip1Frm: string = ''; skip1To: string = ''; fillTmFrm: string = ''; fillTmTo: string = ''; skip2Frm: string = ''; skip2To: string = '';
  rxTmFrm: string = ''; rxTmTo: string = ''; skip3Frm: string = ''; skip3To: string = ''; txTmFrm: string = '';
  txTmTo: string = ''; skip4Frm: string = ''; skip4To: string = ''; msgType: boolean; optionAnd: boolean; optionOr: boolean;
  daysFrm: string = ''; daysTo: string = ''; monthsFrm: string = ''; monthsTo: string = ''; yearsFrm: string = ''; yearsTo: string = '';
  getStr1: string = ''; getStr2: string = ''; getStr3: string = ''; dateofBirth: string = ''; dateofBirth1: string = ''; msgSelect: string = '';

  visibility = 'visible';
  show = false;
  hidden = false;


  onDisplay() {
    this.totalMsg = this.msgRad + " " + this.daysFrm + this.monthsFrm + this.yearsFrm + " " + this.daysTo + this.monthsTo + this.yearsTo + " " + this.priority + " " + this.chPrefix + " " + this.aiGet + " "
      + this.ioGet + " " + this.msgNoFrm + " " + this.msgNoTo + " " + this.skip1Frm + " " + this.skip1To + " " + this.fillTmFrm + " " + this.fillTmTo + " " + this.skip2Frm
      + " " + this.skip2To + " " + this.rxTmFrm + " " + this.rxTmTo + " " + this.skip3Frm + " " + this.skip3To + " " + this.txTmFrm + " " + this.txTmTo + " " + this.skip4Frm
      + " " + this.skip4To + " " + this.msgType + " " + this.messageQuery + " " + this.getStr1 + " " + this.msgSelect + " " + this.getStr2 + " " + this.getStr3;
    console.log(this.totalMsg.toUpperCase());
  }


  onpages1how() {

  }

  onpageshow() {
    this.visibility = this.visibility == "visible" ? "hidden" : "visible";
  }

  clear() {
    this.incoming = false; this.outgoing = false; this.priority = ""; this.chPrefix = ''; this.aiGet = ''; this.ioGet = ''; this.msgNoFrm = ''; this.msgNoTo = ''; this.skip1Frm = '';
    this.skip1To = ''; this.fillTmFrm = ''; this.fillTmTo = ''; this.skip2Frm = ''; this.skip2To = ''; this.rxTmFrm = ''; this.rxTmTo = ''; this.skip3Frm = '';
    this.skip3To = ''; this.txTmFrm = ''; this.txTmTo = ''; this.skip4Frm = ''; this.skip4To = ''; this.msgType = false; this.optionAnd = false; this.optionOr = false; this.msgSelect = '';
    this.daysFrm = ""; this.daysTo = ""; this.monthsFrm = ""; this.monthsTo = ""; this.yearsFrm = ""; this.yearsTo = ""; this.messageQuery = ""; this.getStr1 = ''; this.getStr2 = ''; this.getStr3 = '';
  }

  dateOnly(event: any) {
   
    ///^(3[01]|[12][0-9]|0[1-9])(2[0-3]|[01]?[0-9])([0-5]?[0-9])$/;
    ///^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$/;
    let nums = String.fromCharCode(event.charCode);
    const pattern = /^((0[1-9]|1[0-9]|2[0-9]|3[0 1])(0[0-9]|1[0-9]|2[0-4])([0-9]){2})$/i;   console.log(nums);
    if (!pattern.test(nums) ) {
     event.preventDefault();return false;
    }else{alert("format wrong");}
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
    this.msgSelect = "";
    if (this.optionAnd) {
      this.msgSelect = "And";
    }
    else if (this.optionOr) {
      this.msgSelect = "Or";
    }
    else {
      this.msgSelect = "";
    }

    this.draftMsg = [{
      "originDateFrom": this.dateofBirth,
      "originDateTo": this.dateofBirth1,
      "channelPrefix": this.chPrefix,
      "priority": this.priority,
      "destinationIndicator": this.aiGet,
      "originIndicator": this.ioGet,
      "msgNo": { "from": this.msgNoFrm, "to": this.msgNoTo, "skipFrom": this.skip1Frm, "skipTo": this.skip1To },
      "msgText1": this.getStr1,
      "msgText2": this.getStr2,
      "op": this.msgSelect,
      "filingTime": { "from": this.fillTmFrm, "to": this.fillTmTo, "skipFrom": this.skip2Frm, "skipTo": this.skip2To },
      "MessageType": this.msgType
    }];

    if (this.incoming) {
      this.draftMsg.push({
        "rxTime": { "from": this.rxTmFrm, "to": this.rxTmTo, "skipFrom": this.skip3Frm, "skipTo": this.skip3To },
      });
    }
    else if (this.outgoing) {
      this.draftMsg.push({
        "txTime": { "from": this.txTmFrm, "to": this.txTmTo, "skipFrom": this.skip4Frm, "skipTo": this.skip4To },
      });
    }
    else {
      this.draftMsg = [""];
    }

   this.totalFinalHeader = JSON.stringify(this.draftMsg);
    console.log(this.draftMsg);
    
        this.serviceObj.setGetOperation(this.msgurl + "?page=" + this.page)
          .subscribe(data => {
            this.msgList = data.content;
            this.msgcount = this.msgList.length;
            this.pages = new Array(data.totalPages);
            console.log(this.msgcount);
            console.log(this.msgList);
            this.show = !this.show;
          });
  }

  getMsgData() {
    this.sendMessage();
    //	this.splitMessage(this.draftMsg.toUpperCase(), this.draftMsg.trim().length);
    //	return this.draftMsgParts;
  }

  /*splitMessage(draftMessage, msglength) { 
        var result;var start = 0; var step = 1000; var end = step;
 
        result = draftMessage.substring(start, end);
      	
        let partMessage =  result .toUpperCase();
        this.draftMsgParts.push(partMessage);
  	
  }*/

  sendMessage() {
  }

  // postRetrievalMsg()
  // {
  //   this.sendMessage();
  // }



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
