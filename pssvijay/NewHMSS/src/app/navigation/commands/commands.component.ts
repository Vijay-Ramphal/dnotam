import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
	selector: 'app-commands',
	templateUrl: 'commands.component.html',
	styleUrls: ['./commands.component.css']
})

export class CommandsComponent {
	cmdResponse: any = [];
	response: string;
	current = "";
	currentGroup = "";
	url = 'api/v1/command/';
	url_new = 'api/v1/command/commands';
	responseText: string = '';
	data: string = '';
	completeDataBase: any[] = [];
	groupItems: any[] = [];
	selectedGroup: any[] = [];
	commandDesc: string = "";
	commandSyntax: string = "";
	displayInformation: boolean = true;
	responseError = "";
	p1: any = ''; p2: any = ''; p3: any = ''; p4: any = '';
	commandHistory: { command: string, header: Array<any>, body: Array<Array<any>> }[] = [];

	constructor(public serviceObject: AppService) { }
	ngOnInit() {
		this.clear();
		this.serviceObject.setGetOperation(this.url_new)
			.subscribe(ResponseText => {
				this.completeDataBase = ResponseText;
				for (let i = 0; i < this.completeDataBase.length; i++) {
					if (this.groupItems.indexOf(this.completeDataBase[i].commandGroup) === -1) {
						this.groupItems.push(this.completeDataBase[i].commandGroup);
					}console.log(this.groupItems)
				}
			}),
			(ResponseError => {
				console.log(ResponseError._body);
			});
	}

	onChangeGroup(cmdValue) {
		this.displayInformation = true;
		if (this.selectedGroup.length != 0) {
			this.selectedGroup = [];
		}
		for (let item of this.completeDataBase) {
			if (item.commandGroup == cmdValue) {
				this.selectedGroup.push(item);
			}
		}
		this.clear();
		this.current = '';
		var cmdval = <HTMLInputElement>document.getElementById('commandSelect'); cmdval.value = ""; 
	}
	onChange(cmdValue) {
		this.clear();
		this.current = cmdValue;
		let selectedItem: any = this.selectedGroup.find((item: any) => item.commandName == cmdValue);
		this.displayInformation = false;
		this.commandSyntax = selectedItem.commandSyntax;
		this.commandDesc = selectedItem.commandDesc;
		var paramsList = selectedItem.parameters.split(" ");console.log(paramsList);
		var cmdval = <HTMLInputElement>document.getElementById('txtval'); cmdval.hidden = false;
		for (let i = 1; i <= selectedItem.noOfParameters; i++) {
			var paramID = <HTMLInputElement>document.getElementById('p' + i);
			
			if (paramsList[i - 1].charAt(0) != '') {
				paramID.hidden = false; paramID.setAttribute('maxlength', paramsList[i - 1].charAt(1));
				if (paramsList[i - 1].charAt(0) == 'A')
					//paramID.setAttribute('onkeypress', 'return (event.charCode > 64 && event.charCode < 91 || window.event.charCode >= 64 && window.event.charCode <= 91 || event.charCode > 96 && event.charCode < 123 || window.event.charCode >= 96 && window.event.charCode <= 123)');
					paramID.setAttribute('onkeypress', ' return ((window.event.charCode >= 65 && window.event.charCode <= 90) || (window.event.charCode >= 95 && window.event.charCode <= 122))');
				else
					//paramID.setAttribute('onkeypress', 'return (event.charCode > 47 && event.charCode < 58 || window.event.charCode >= 47 && window.event.charCode <= 58)');
					paramID.setAttribute('onkeypress', 'return (event.charCode > 47 && event.charCode < 58 || window.event.charCode >= 47 && window.event.charCode <= 58)');
			}
		}

	}
	submit() {
		this.data = (this.current + (this.p1 == '' ? '' : '-' + this.p1) + (this.p2 == '' ? '' : '-' + this.p2) +
			(this.p3 == '' ? '' : '-' + this.p3) + (this.p4 == '' ? '' : '-' + this.p4)).toUpperCase();
		this.serviceObject.setPostOperation(this.url, this.data)
			.subscribe(
				(ResponseText => {
				console.log("Respone Text Success" + ResponseText.response);
				this.display(ResponseText.response);
				this.clear()
			}),
			(ResponseError => {
				console.log("Respone Text Failure" + ResponseError);
				this.display(ResponseError);
				this.clear();
			})
			);
			
	}

	clear() {
		this.currentGroup = '';
		this.displayInformation = true;
		var cmdval = <HTMLInputElement>document.getElementById('txtval'); cmdval.hidden = true;
		this.p1 = ''; this.p2 = ''; this.p3 = ''; this.p4 = '';
		var idp1 = <HTMLInputElement>document.getElementById('p1'); idp1.hidden = true;
		var idp2 = <HTMLInputElement>document.getElementById('p2'); idp2.hidden = true;
		var idp3 = <HTMLInputElement>document.getElementById('p3'); idp3.hidden = true;
		var idp4 = <HTMLInputElement>document.getElementById('p4'); idp4.hidden = true;
		this.current = '';
	}

	display(result) {
		var jsondata = JSON.parse(result);
		var tableHeader: any[] = [];
		var tableBody: any[] = [];
		if (jsondata.VALUES instanceof Array) {
			tableHeader = jsondata.VALUES[0];
			tableBody = jsondata.VALUES.slice(1);
		}
		else if (typeof (jsondata.VALUES) == "string") {
			tableHeader.push(jsondata.VALUES);
		}
		else if (String(jsondata.status) != "undefined") {
			tableHeader = ["Status", "Error", "Message"];
			tableBody = [[jsondata.status, jsondata.error, jsondata.message]];
		}
		else {
			var jsondata = JSON.parse(result._body);
			tableHeader = ["Status", "Message"];
			tableBody = [[result.status, jsondata.response]];
		}
		this.commandHistory.push({ "command": this.data, "header": tableHeader, "body": tableBody });
	}
}
