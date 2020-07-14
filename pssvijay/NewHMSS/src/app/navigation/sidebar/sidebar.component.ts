import { Component, AfterViewInit } from '@angular/core';
import { AppService } from '../../app.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const AdminROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'messages', title: 'Messages', icon: 'message', class: '' },
    { path: 'commands', title: 'Commands', icon: 'control_point', class: '' },
    { path: 'routemonitor', title: 'Circuit Monitor', icon: 'phonelink', class: '' },
    { path: 'messageqstatus', title: 'SYS Q Status', icon: 'queue', class: '' },
    { path: 'flightplan', title: 'Flight Plan', icon: 'flight', class: '' },
    { path: 'asbs', title: 'ASBS', icon: 'flight', class: '' },
];

export const SupervisorROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'messages', title: 'Messages', icon: 'message', class: '' },
    { path: 'commands', title: 'Commands', icon: 'control_point', class: '' },
    { path: 'routemonitor', title: 'Circuit Monitor', icon: 'phonelink', class: '' },
    { path: 'messageqstatus', title: 'SYS Q Status', icon: 'queue', class: '' },
    { path: 'asbs', title: 'ASBS', icon: 'flight', class: '' },
];

export const ATSROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'messages', title: 'Messages', icon: 'message', class: '' },
    { path: 'commands', title: 'Commands', icon: 'control_point', class: '' },
    { path: 'asbs', title: 'ASBS', icon: 'flight', class: '' },
];

export const OtherRoutes: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'messages', title: 'Messages', icon: 'message', class: '' },
    { path: 'commands', title: 'Commands', icon: 'control_point', class: '' },
    { path: 'routemonitor', title: 'Circuit Monitor', icon: 'phonelink', class: '' },
    { path: 'messageqstatus', title: 'SYS Q Status', icon: 'queue', class: '' },
    { path: 'asbs', title: 'ASBS', icon: 'flight', class: '' },
    
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    //menuItems: any[] = SupervisorROUTES.filter(menuItem => menuItem);
    menuItems: any[] ;
    role: string = "";
    currentActiveRoute: string = '';
    constructor(public serviceObject: AppService) {
        this.role = this.serviceObject.getRole();
        // this.serviceObject.login$.subscribe(
        //     (login) => {
        //         if (login) {
        //             this.serviceObject.role$.subscribe(
        //                 (role) => {
        //                     this.role = role;
                            if (this.role == "SUPERVISOR")
                                this.menuItems = SupervisorROUTES.filter(menuItem => menuItem);
                            else if (this.role == "ATSBOOKING")
                                this.menuItems = ATSROUTES.filter(menuItem => menuItem);
                            else
                                this.menuItems = OtherRoutes.filter(menuItem => menuItem);
            //             });
            //     }
            // });
    }

  
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
