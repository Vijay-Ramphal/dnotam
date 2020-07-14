import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesModule } from './messages/messages.module';
import { MessagesComponent } from './messages/messages.component';
import { CommandsComponent } from './commands/commands.component';
import { MessageqstatusComponent } from './messageqstatus/messageqstatus.component';
import { RoutemonitorComponent } from './routemonitor/routemonitor.component';
import { AsbsModule } from './asbs/asbs.module';
import { AsbsComponent } from './asbs/asbs.component';
import { MessageqstatusModule } from './messageqstatus/messageqstatus.module';
const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'messages', loadChildren : './messages/messages.module#MessagesModule' },
      { path: 'commands', component: CommandsComponent },
      { path: 'routemonitor', component: RoutemonitorComponent },
      { path: 'messageqstatus', loadChildren : './messageqstatus/messageqstatus.module#MessageqstatusModule' },
      { path: 'asbs', loadChildren : './asbs/asbs.module#AsbsModule' },
      //{ path: 'flightplan1', loadChildren : './flightplan1/flightplan1.module#Flightplan1Module' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class NavigationRoutingModule { }
