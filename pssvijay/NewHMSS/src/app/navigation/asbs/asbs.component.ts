import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { SlicePipe } from '@angular/common';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AerodromeBriefComponent } from './aerodrome-brief/aerodrome-brief.component';
import { AreaBriefComponent } from './area-brief/area-brief.component';
import { RouteBriefComponent } from './route-brief/route-brief.component';
import { PointBriefComponent } from './point-brief/point-brief.component';
import { AsbsRoutingModule } from './asbs.routing';
import { NarrowrouteBriefComponent } from './narrowroute-brief/narrowroute-brief.component';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const AsbsROUTES: RouteInfo[] = [
  { path: 'aerodrome-brief', title: 'AerodromeBrief', icon: 'dashboard', class: '' },
  { path: 'area-brief', title: 'AreaBrief', icon: 'message', class: '' },
  { path: 'route-brief', title: 'RouteBrief', icon: 'control_point', class: '' },
  { path: 'point-brief', title: 'PointBrief', icon: 'queue', class: '' },
  { path: 'narrowroute-brief', title: 'NarrowrouteBrief', icon: 'queue', class: '' },
];
@Component({
  selector: 'app-asbs',
  templateUrl: './asbs.component.html',
  styleUrls: ['./asbs.component.css']
})
export class AsbsComponent implements OnInit {

  menuItems: any[];
  constructor() { }
  ngOnInit() {
    this.menuItems = AsbsROUTES.filter(menuItem => menuItem);
  }
}
