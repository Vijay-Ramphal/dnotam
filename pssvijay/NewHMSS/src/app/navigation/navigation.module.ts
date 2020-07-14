import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesModule } from './messages/messages.module';

import { CommandsComponent } from './commands/commands.component';
import { RoutemonitorComponent } from './routemonitor/routemonitor.component';
import { AsbsModule } from './asbs/asbs.module';
import { MessageqstatusModule } from './messageqstatus/messageqstatus.module';
import { NavigationRoutingModule } from './navigation.routing';
// import { AreaBriefComponent } from './ASBS/area-brief/area-brief.component';
// import { RouteBriefComponent } from './ASBS/route-brief/route-brief.component';
// import { NarrowrouteBriefComponent } from './ASBS/narrowroute-brief/narrowroute-brief.component';
// import { PointBriefComponent } from './ASBS/point-brief/point-brief.component';
// import { AerodromeBriefComponent } from './ASBS/aerodrome-brief/aerodrome-brief.component';
// import { AsbsComponent } from './asbs/asbs.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule, CommonModule,
    NavigationRoutingModule, 
    MessageqstatusModule,
    MessagesModule ,AsbsModule
    
  ],

  declarations: [NavbarComponent,
     SidebarComponent, 
     FooterComponent,
     NavigationComponent,
     DashboardComponent, 
     RoutemonitorComponent, 
     CommandsComponent]// AreaBriefComponent, RouteBriefComponent, NarrowrouteBriefComponent, PointBriefComponent, AerodromeBriefComponent, AsbsComponent, ],
   //exports:[SidebarComponent,NavbarComponent,FooterComponent]
})
export class NavigationModule { }
