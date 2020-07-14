import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
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

@Component({
	selector: 'app-inbox',
	templateUrl: './inbox.component.html',
	styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {
	selection = new SelectionModel<Element>(false, []);
	inboxurl = 'api/v1/command/inbox';
	messageurl = "api/v1/aftn/message";
	inboxdeleteurl = 'api/v1/command/inbox/delete/';
	public inBoxList: Element[] = [];
	indraftMsg: string;
	inboxcount: number;
	pages: number[];
	page: number = 0;
	displayedColumns = ['select', 'channelPrefix', 'channelSeqNo', 'priority', 'originIndicator'];
	dataSource;

	constructor(private serviceObject: AppService) {}
	ngOnInit() {
		this.getInboxData();
	}

	getInboxData() {
		this.serviceObject.setGetOperation(this.inboxurl + "?page=" + this.page)
			.subscribe(data => {
				this.dataSource = new MatTableDataSource<Element>(data.content);
				this.inboxcount = data.content.length;
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

		this.serviceObject.setGetOperation(this.inboxurl + "?page=" + this.page)
			.subscribe(data => {
				this.dataSource = new MatTableDataSource<Element>(data.content);
				this.inboxcount = data.content.length;
				this.pages = new Array(data.totalPages);
				console.log(data.content);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
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
		this.indraftMsg = row.aftnMessage;
		console.log(row);
	}

	setPage(i, event: any) {
		event.preventDefault();
		if (i > 0 && i < this.pages) {
			this.page = i;
			this.getInboxData();
		}
	}

}

export interface Element {
	aftnMessage: string;
	channelPrefix: string;
	channelSeqNo: number;
	destinationIndiacator: string;
	id: number;
	messaageStatus: string;
	messageLogTime: number;
	messageText: string;
	originDate: number;
	originIndicator: string;
	priority: string;
	state: boolean;
}