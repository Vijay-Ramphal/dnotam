import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AppService } from '../../../app.service';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-suspend-q',
  templateUrl: './suspend-q.component.html',
  styleUrls: ['./suspend-q.component.css']
})
export class SuspendQComponent implements OnInit {
  suspendQurl = 'api/v1/command/suspendQ';
  killurl = "api/v1/command/q/kill";
  suspendPages: number[];
  suspendPage: number = 0;
  public suspendQList: any = [];
  suspendQPagedItems: any[];
  SQisChecked = false;
  SQMsg;
  setClickedRow: Function;
  threeQkillID: number;
  suspendQCount: number;
  selectedRow: Number;

  constructor(public serviceObject: AppService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }
  ngOnInit() {
    this.getSuspendQData();
    this.selectedRow = undefined;
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

  suspendQBoxChanged(selectedMessage) {
    var msg = <HTMLInputElement>document.getElementById('SQcomment');
    this.SQMsg = selectedMessage.messageText;
    // else{
    // 	this.SQMsg="";
    // }
  }
}
