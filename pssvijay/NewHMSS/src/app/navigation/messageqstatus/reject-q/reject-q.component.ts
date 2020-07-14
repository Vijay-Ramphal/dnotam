import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AppService } from '../../../app.service';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-reject-q',
  templateUrl: './reject-q.component.html',
  styleUrls: ['./reject-q.component.css']
})
export class RejectQComponent implements OnInit {

  rejectQurl = 'api/v1/command/rejectQ';
  killurl = "api/v1/command/q/kill";
  rejectPages: number[];
  rejectPage: number = 0;
  public rejectQList: any = [];
  rejectQPagedItems: any[];
  RQisChecked = false;
  RQMsg;
  setClickedRow: Function;
  threeQkillID: number;
  rejectQCount: number;
  selectedRow: Number;

  constructor(public serviceObject: AppService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  ngOnInit() {
    this.getRejectQData();
    this.selectedRow = undefined;
  }

  getRejectQData() {
    this.serviceObject.setGetOperation(this.rejectQurl + "?page=" + this.rejectPage)
      .subscribe(ResponseText => {
        this.rejectQList = ResponseText.content;
        //alert(JSON.stringify(this.outBoxList));	
        this.rejectPages = new Array(ResponseText.totalPages);
        console.log(this.rejectQList);
        this.rejectQCount = ResponseText.numberOfElements;
      },
      ResponseError => {
        //alert("Error: "+JSON.stringify(ResponseError._body));
      }
      );
  }

  rejectQBoxChanged(selectedMessage) {
    var msg = <HTMLInputElement>document.getElementById('RQcomment');
    this.RQMsg = selectedMessage.messageText;
    // else{
    // 	this.SQMsg="";
    // }
  }
}
