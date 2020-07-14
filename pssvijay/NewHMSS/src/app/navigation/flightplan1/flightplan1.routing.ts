import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flightplan1Component } from "./flightplan1.component";

const routes: Routes = [
    { path: '', component: Flightplan1Component },]

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  
  exports: [RouterModule]
})


export class Flightplan1RoutingModule { }
