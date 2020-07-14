import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TransmitQComponent } from './transmit-q/transmit-q.component';
import { ErrorQComponent } from './error-q/error-q.component';
import { SuspendQComponent } from './suspend-q/suspend-q.component';
import { RejectQComponent } from './reject-q/reject-q.component';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const MessageqstatusROUTES: RouteInfo[] = [
  { path: 'transmit', title: 'transmit', icon: 'dashboard', class: '' },
  { path: 'suspend', title: 'suspend', icon: 'message', class: '' },
  { path: 'reject', title: 'reject', icon: 'control_point', class: '' },
  { path: 'errorq', title: 'errorq', icon: 'queue', class: '' },
];
@Component({
  selector: 'app-messageqstatus',
  templateUrl: './messageqstatus.component.html',
  styleUrls: ['./messageqstatus.component.css']
})
export class MessageqstatusComponent implements OnInit {
  menuItems: any[];
  constructor() { }
  ngOnInit() {
    this.menuItems = MessageqstatusROUTES.filter(menuItem => menuItem);
  }
}