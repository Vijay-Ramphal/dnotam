import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppService } from '../../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatStepperModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatPaginator,
} from '@angular/material';
import { isBoolean } from 'util';

@Component({
	selector: 'app-outbox',
	templateUrl: './outbox.component.html',
	styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {
	selection = new SelectionModel<Element>(false, []);
	outboxurl = 'api/v1/command/outbox';
	messageurl = "api/v1/aftn/message";
	outboxdeleteurl = 'api/v1/command/outbox';
	outdraftMsg: string;
	outboxCount: number;
	pages: number[];
	page: number = 0;
	displayedColumns = ['select', 'channelPrefix', 'channelSeqNo', 'priority', 'originIndicator'];
	dataSource;
	events: string[] = [];
  opened: boolean;
  
 
 
  
 

	constructor(private serviceObject: AppService) { }

	ngOnInit() {
		this.getOutboxData();
		
	}

	getOutboxData() {
		this.serviceObject.setGetOperation(this.outboxurl + "?page=" + this.page)
			.subscribe(data => {
				this.dataSource = new MatTableDataSource<Element>(data.content);
				this.outboxCount = data.content.length;
				this.pages = new Array(data.totalPages);
				console.log(data.content);
				Observable.interval(60000).subscribe(() => {
					this.fetchData();
				})
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}

	fetchData() {
		this.serviceObject.setGetOperation(this.outboxurl + "?page=" + this.page)
			.subscribe(data => {
				this.dataSource = new MatTableDataSource<Element>(data.content);
				this.outboxCount = data.content.length;
				this.pages = new Array(data.totalPages);
				// console.log(data.content);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}

	setPage(i, event: any) {
		event.preventDefault();
		if (i > 0 && i < this.pages) {
			this.page = i;
			this.getOutboxData();
		}
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}
	selectionChanged(row) {
		this.outdraftMsg = row.aftnmessage;
		console.log(row);
	
		
	}
	
	
}

export interface Element {
	aftnmessage: string;
	channelPrefix: string;
	channelSeqNo: number;
	destinationIndicators: string;
	id: number;
	messageLogTime: number;
	messageStatus: string;
	messageText: string;
	messageType: string;
	originDate: number;
	originIndicator: string;
	priority: string;
	transmissionStatus: boolean;
}
