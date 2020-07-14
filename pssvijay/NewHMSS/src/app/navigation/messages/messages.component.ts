import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, } from '@angular/core';
import { AppService } from '../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AtsmessageComponent } from './atsmessage/atsmessage.component';
import { NotamComponent } from './notam/notam.component';
import { ComposemessageComponent } from './composemessage/composemessage.component';
import { MetReportComponent } from './met-report/met-report.component';
import { InboxComponent } from './inbox/inbox.component';
import { IntboxComponent } from './intbox/intbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { MiscellaneousComponent } from './miscellaneous/miscellaneous.component';
import { MessageRetrivalComponent } from './messageretrival/messageretrival.component';
import { CommonModule } from '@angular/common';
import{MeteorologicalComponent}from './meteorological/meteorological.component'

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}
export const MessageROUTES: RouteInfo[] = [
	{ path: 'inbox', title: 'Inbox', icon: 'dashboard', class: '' },
	{ path: 'outbox', title: 'Outbox', icon: 'message', class: '' },
	{ path: 'composemessage', title: 'Compose', icon: 'control_point', class: '' },
	{ path: 'atsmessage', title: 'ATS-Message', icon: 'phonelink', class: '' },
	{ path: 'messageretrival', title: 'MSG-Retrival', icon: 'queue', class: '' },
	{ path: 'MET', title: 'NOTAM', icon: 'dashboard', class: '' },
	{ path: 'meteorological', title: 'Meteorological', icon: 'cloud', class: '' },
	{ path: 'miscellaneous', title: 'Miscellaneous', icon: 'queue', class: '' }
	// { path: 'intbox', title: 'Intbox', icon: 'dashboard', class: '' },
];

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	menuItems: any[];
	inboxurl = 'api/v1/command/inbox';
	outboxurl = 'api/v1/command/outbox';
	compose: boolean = true;
	fplan: boolean = true;
	notam: boolean = true;
	role: string = "";
	componentRef_: any;
	constructor(public serviceObject: AppService, private componentResolver: ComponentFactoryResolver) {
		// this.serviceObject.role$.subscribe(
		// 	(role) => {
		// 		this.role = role;
				this.role = this.serviceObject.getRole();
				this.menuItems = MessageROUTES.filter(menuItem => menuItem);
			//});
	}

	@ViewChild('template', { read: ViewContainerRef }) container: ViewContainerRef;


	inboxcount: number;
	outboxcount: number;
	getInboxData() {
		this.serviceObject.setGetOperation(this.inboxurl)
			.subscribe(data => {
				this.inboxcount = data.content.length;
				Observable.interval(60000).subscribe(() => {
					this.infetchData(this.inboxurl);
				})
			}),
			(ResponseError => {
				console.log(ResponseError._body);
			});
	}
	getOutboxData() {
		this.serviceObject.setGetOperation(this.outboxurl)
			.subscribe(data => {
				this.outboxcount = data.content.length;
				Observable.interval(60000).subscribe(() => {
					this.outfetchData(this.outboxurl);
				})
			}),
			(ResponseError => {
				console.log(ResponseError._body);
			});
	}

	ngOnInit() {
		this.getInboxData();
		this.getOutboxData();
		this.role = this.serviceObject.getRole();
		console.log(this.role);
		//this.getRole();
	}

	infetchData(url) {
		this.serviceObject.setGetOperation(url)
			.subscribe(data => {
				this.inboxcount = data.content.length;
			}),
			(ResponseError => {
				console.log(ResponseError._body);
			});
	}
	outfetchData(url): any {
		this.serviceObject.setGetOperation(url)
			.subscribe(data => {
				this.outboxcount = data.content.length;
			}),
			(ResponseError => {
				console.log(ResponseError._body);
			});
	}
	getRole() {
		this.container.clear();
		this.role = this.serviceObject.getRole();
		if (this.role == "SUPERVISOR") {
			const componentFactory = this.componentResolver.resolveComponentFactory(ComposemessageComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
		}
		else if (this.role == "ATSBOOKING") {
			const componentFactory = this.componentResolver.resolveComponentFactory(AtsmessageComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
		}
		else {
			const componentFactory = this.componentResolver.resolveComponentFactory(NotamComponent);
			this.componentRef_ = this.container.createComponent(componentFactory);
		}
		// if (this.role == "SUPERVISOR") {
		// 	this.fplan = true;
		// 	this.compose = false;
		// 	this.notam = true;
		// }
		// else if (this.role == "ATSBOOKING") {
		// 	this.fplan = false;
		// 	this.compose = true;
		// 	this.notam = true;
		// }
		// else {
		// 	this.fplan = true;
		// 	this.compose = true;
		// 	this.notam = false;
		// }
	}
}
