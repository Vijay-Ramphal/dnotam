import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AppService } from '../../../app.service';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-error-q',
  templateUrl: './error-q.component.html',
  styleUrls: ['./error-q.component.css']
})
export class ErrorQComponent implements OnInit {

  errorQurl = 'api/v1/command/errorQ';
  killurl = "api/v1/command/q/kill";
  errorPages: number[];
  errorPage: number = 0;
  public errorQList: any = [];
  errorQPagedItems: any[];
  EQisChecked = false;
  EQMsg;
  setClickedRow: Function;
  threeQkillID: number;
  errorQCount: number;
  selectedRow: Number;


  constructor(public serviceObject: AppService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  ngOnInit() {
    this.getErrorQData();
    this.selectedRow = undefined;
  }
  getErrorQData() {
    this.serviceObject.setGetOperation(this.errorQurl + "?page=" + this.errorPage)
      .subscribe(ResponseText => {
        this.errorQList = ResponseText.content;
        //alert(JSON.stringify(this.outBoxList));	
        this.errorPages = new Array(ResponseText.totalPages);
        console.log(this.errorQList);
        this.errorQCount = ResponseText.numberOfElements;
      },
      ResponseError => {
        //alert("Error: "+JSON.stringify(ResponseError._body));
      }
      );
  }

  errorQBoxChanged(selectedMessage) {
    var msg = <HTMLInputElement>document.getElementById('EQcomment');
    this.EQMsg = selectedMessage.messageText;
    // else{
    // 	this.SQMsg="";
    // }
  }


}
