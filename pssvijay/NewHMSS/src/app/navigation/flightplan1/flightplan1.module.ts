import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flightplan1Component } from './flightplan1.component';
import { Flightplan1RoutingModule } from './flightplan1.routing'
@NgModule({
  imports: [
    CommonModule,FormsModule,RouterModule,Flightplan1RoutingModule
  ],
  declarations: [Flightplan1Component]
})
export class Flightplan1Module { }
