import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { isNgTemplate, ReturnStatement } from '@angular/compiler';

@Component({
	selector: 'app-miscellaneous',
	templateUrl: './miscellaneous.component.html',
	styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent implements OnInit {

	constructor(public serviceObject: AppService)
	{

	}
	groupindicatorsaveurl = "api/v1/command/save";
	groupIndicatorUrl = "api/v1/command/gi";
	groupIndicators:any=[];
	selectedElement:string="";
	addressIndicators:any=[];
	indicatorsToAdd:any[] = [];
	totalIndicatorsToAdd: any = [];
 	draftName: string = '';
	 totalDraft:Object = '';
	 addressind:String = "";
	 responseText: string = '';
	 body:string = '';
	//  D1: string; D2: string; D3: string; D4: string; D5: string; D6: string; D7: string; D8: string; D9: string; D10: string; D11: string;
	// D12: string; D13: string; D14: string; D15: string; D16: string; D17: string; D18: string; D19: string; D20: string; D21: string;
	selectAI: any[] = [
		{ key: 'D1', value: "" },
		{ key: 'D2', value: "" },
		{ key: 'D3', value: "" },
		{ key: 'D4', value: "" },
		{ key: 'D5', value: "" },
		{ key: 'D6', value: "" },
		{ key: 'D7', value: "" },
		{ key: 'D8', value: "" },
		{ key: 'D9', value: "" },
		{ key: 'D10', value: "" },
		{ key: 'D11', value: "" },
		{ key: 'D12', value: "" },
		{ key: 'D13', value: "" },
		{ key: 'D14', value: "" },
		{ key: 'D15', value: "" },
		{ key: 'D16', value: "" },
		{ key: 'D17', value: "" },
		{ key: 'D18', value: "" },
		{ key: 'D19', value: "" },
		{ key: 'D20', value: "" },
		{ key: 'D21', value: "" },
	];

ngOnInit(){
this.getGroupIndicator();
}

	//****GetGroup Indicator */
	getGroupIndicator() {
		this.serviceObject.setGetOperation(this.groupIndicatorUrl)
			.subscribe(data => {
				this.groupIndicators = (data.gi);
				console.log(this.groupIndicators);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}
	getAddressIndicators(){	
		console.log(this.selectedElement);
		this.serviceObject.setGetOperation(this.groupIndicatorUrl + "//" + this.selectedElement)
			.subscribe(data => {
				this.addressIndicators = data;
				this.groupClear();
				for (let item = 0; item <= this.addressIndicators.length; item++) {
					this.selectAI[item].value = this.addressIndicators[item];
				}
				console.log(this.addressIndicators);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
	}
	groupClear() {
		for (let item of this.selectAI) {
			item.value = "";
		}
		
	}
	prepareBodyToAdd(){
		
		console.log(this.indicatorsToAdd);
			
		for( let item of this.selectAI){	
			if(item.value!=="")
			{
				this.indicatorsToAdd.push(item.value);
			}
			else if (item.value=="" ){
				this.indicatorsToAdd.push(item.value);
				this.indicatorsToAdd.pop();
			}else{
				return this.indicatorsToAdd; 
			}
		}console.log(this.indicatorsToAdd);
		
		if(this.selectedElement.length==0  ){
			alert("Please Name the GroupIndicator");
		}else if(this.indicatorsToAdd.length<=0){alert("please include atleast one AddressIndicator");}
		else if(this.indicatorsToAdd.length>0 && this.indicatorsToAdd.length<=21){
		this.totalDraft = {name:this.selectedElement, message:this.indicatorsToAdd};
		this.body = JSON.stringify(this.totalDraft);
		console.log("Body:  "+this.body);
		this.saveAddressIndicators();
		
		}else{return;}
		
	}
	saveAddressIndicators(){
		this.serviceObject.setPostOperation(this.groupindicatorsaveurl, this.body)
		.subscribe(data =>{
			this.responseText = data;
			console.log("Post Ops:   "+data.response);
		}),
		(ResponseError => {
			console.log("Post Operation:   "+ResponseError._body);
		});
		this.groupClear();this.selectedElement=" ";
		this.getGroupIndicator();
		this.indicatorsToAdd=[];
	}
	alphaOnly(event: any) {
		const pattern = /[a-zA-Z]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
	}
	checkLength(ElementId) {
		var DIElementId = <HTMLInputElement>document.getElementById(ElementId);
		if ((DIElementId.value.length > 0) && (DIElementId.value.length < 8)) {
			DIElementId.focus(); DIElementId.style.border = "1px solid red";
		}
		else {
			DIElementId.style.border = "";
		}
	}
}

// 	groupindicatorsaveurl = 'api/v1/command/save';
// 	groupindicatorupdateurl = "api/v1/aftn/update";
// 	//inboxpagesize: number;
// 	public outBoxList: Array<any> = [];
// 	outdraftMsg: string;
// 	outboxCount: number;
// 	pages: number[];
// 	page: number = 0;
// 	draftMsg: string = '';
	
// 	fileList: any = '';
// 	responseText: string = '';
// 	selectedElement:string=" ";
// 	DI1: string; DI2: string; DI3: string; DI4: string; DI5: string; DI6: string; DI7: string; DI8: string; DI9: string; DI10: string; DI11: string;
// 	DI12: string; DI13: string; DI14: string; DI15: string; DI16: string; DI17: string; DI18: string; DI19: string; DI20: string; DI21: string;
// 	groupIndicators: any = [];
// 	selectedAdressIndicators: any = [];
// 	//totalIndicators : Array<[string,Array<any>[]]>[] = [{'GroupName' : 'ABCEDFGH', 'AddressInd' : [{'A','B','C'}]},
// 	//{'GroupName' : 'ABCEDFGH', 'AddressInd' : [{'A','B','C'}]}];


// 	aa;
// 	indicatorsToAdd:any = [];
// 	totalIndicatorsToAdd: any = [];
// 	draftName: string = '';
// 	totalDraft:Object = '';
// 	body:string = '';


// 	constructor(private serviceObject: AppService){}

// 	alphaOnly(event: any) 
//   {
//     const pattern = /[a-zA-Z]/g;
//     let v = String.fromCharCode(event.charCode);
//     if (!pattern.test(v) && event.charCode != '0') 
//     {
//       event.preventDefault();
//     }
//   }

//   numOnly(event: any) 
//   {
//     const pattern = /[0-9]/g;
//     let v = String.fromCharCode(event.charCode);
//     if (!pattern.test(v) && event.charCode != '0') 
//     {
//       event.preventDefault();
//     }
//   }

//   alphaNum(event: any) 
//   {
//     const pattern = /[a-zA-Z0-9 ]/g;
//     let inputChar = String.fromCharCode(event.charCode);
//     if (!pattern.test(inputChar) && event.charCode != '0') 
//     {
//       event.preventDefault();
//     }
//   }

//   checkLength(ElementId) {
// 		var DIElementId = <HTMLInputElement>document.getElementById(ElementId);
// 		if ((DIElementId.value.length > 0) && (DIElementId.value.length < 8)) {
// 			DIElementId.focus(); DIElementId.style.border = "1px solid red";
// 		}
// 		else {
// 			DIElementId.style.border = "";
// 		}
// 	}

// 	prepareBodyToAdd()
	// {		
	//	this.indicatorsToAdd.push(this.DI1);this.indicatorsToAdd.push(this.DI2);this.indicatorsToAdd.push(this.DI3);
	// 	this.indicatorsToAdd.push(this.DI4);this.indicatorsToAdd.push(this.DI5);this.indicatorsToAdd.push(this.DI6);
	// 	this.indicatorsToAdd.push(this.DI7);this.indicatorsToAdd.push(this.DI8);this.indicatorsToAdd.push(this.DI9);
	// 	this.indicatorsToAdd.push(this.DI10);this.indicatorsToAdd.push(this.DI11);this.indicatorsToAdd.push(this.DI12);
	// 	this.indicatorsToAdd.push(this.DI13);this.indicatorsToAdd.push(this.DI14);this.indicatorsToAdd.push(this.DI15);
	// 	this.indicatorsToAdd.push(this.DI16);this.indicatorsToAdd.push(this.DI17);this.indicatorsToAdd.push(this.DI18);
	// 	this.indicatorsToAdd.push(this.DI19);this.indicatorsToAdd.push(this.DI20);this.indicatorsToAdd.push(this.DI21); 
	// 	console.log(this.indicatorsToAdd.length);

	// 	for(var i in this.indicatorsToAdd)
	// 	{
	// 		if(this.totalIndicatorsToAdd.length == 0)
	// 		{
	// 			this.totalIndicatorsToAdd.push(this.indicatorsToAdd[i].toUpperCase());
	// 		}
	// 		else if(this.indicatorsToAdd[i] != undefined)
	// 		{
	// 			this.totalIndicatorsToAdd.push(this.indicatorsToAdd[i].toUpperCase());
	// 		}
	// 	}

	// 	console.log(this.totalIndicatorsToAdd);
	// 	this.totalDraft = {name:this.draftName.toUpperCase(), message:this.totalIndicatorsToAdd};
	// 	this.body = JSON.stringify(this.totalDraft);
	// 	console.log("Body:  "+this.body);

	// 	this.saveAddressIndicators();
    // 	}

// 	saveAddressIndicators()
// 	{
// 		this.serviceObject.setPostOperation(this.groupindicatorsaveurl, this.body)
// 		.subscribe(responseData =>{
// 			console.log("Post Ops:   "+responseData);
// 		}),
// 		(ResponseError => {
// 			console.log("Post Operation:   "+ResponseError._body);
// 		});

// 		this.getAddressIndicators();
// 	}

// 	getAddressIndicators()
// 	{
// 		console.log("In getIndicators");
// 		this.serviceObject.setGetOperation("api/v1/command/gi")
// 		.subscribe(responseData =>{
// 			console.log(responseData);
// 		}),
// 		(ResponseError => {
// 			console.log("Get Opertation:   "+ResponseError._body);
// 		});
// 	}

// }

// /*
// 	constructor(private serviceObject: AppService) { }
// 	ngOnInit() {
// 		this.groupindicatorsave();
// 		this.groupindicatorupdate();
// 	}


// 	onChange(name) {
// 		for (let item of this.fileList) {
// 			if (name == item.name)
// 				this.draftMsg = item.message;
// 		}
// 	}

// 	checkLength(ElementId) {
// 		var DIElementId = <HTMLInputElement>document.getElementById(ElementId);
// 		if ((DIElementId.value.length > 0) && (DIElementId.value.length < 8)) {
// 			DIElementId.focus(); DIElementId.style.border = "1px solid red";
// 		}
// 		else {
// 			DIElementId.style.border = "";
// 		}
// 	}
// 	//save//
// 	gettextsave() {
// 		this.serviceObject.setGetOperation(this.groupindicatorsaveurl)
// 		  .subscribe(data => {
// 			this.fileList = data.content;
// 			console.log("Result:  "+data);
// 		  }),
// 		  (ResponseError => {
// 			console.log(ResponseError._body);
			
// 		  });
// 	  }
// 	  alphaOnly(event: any) {
// 		const pattern = /[a-zA-Z]/g;
// 		let inputChar = String.fromCharCode(event.charCode);
// 		if (!pattern.test(inputChar) && event.charCode != '0') {
// 			event.preventDefault();
// 		}
// 	}
// 	  groupindicatorsave() {
		  
// 		this.draftName +=this.selectedElement+" ";
		
// 		if (this.draftMsg.trim().length == 0) {
// 		  return;
// 		}
// 		else if (this.draftName.trim().length == 0) {
// 		  return;
// 		}
// 		else {
// 		var draft = { name: this.draftName.toUpperCase(), message: this.draftMsg.toUpperCase() };
// 		if (this.fileList != null) {
// 		for (let item of this.fileList) {
// 		if (this.draftName == item.name) {
// 		return;
// 			}
// 			}
// 		  }
// 		  let body = JSON.stringify(draft);
// 		  this.serviceObject.setPostOperation(this.groupindicatorsaveurl, body)
// 			.subscribe(data => {
// 			  this.responseText = data;
// 			  console.log(data);
// 			  this.gettextupdate();
// 			}),
// 			(ResponseError => {
// 			  console.log(ResponseError._body);
// 			});
// 		  }
// 			}
			
// submitUpdate()
// {
	
// }





// //update//
// 	  gettextupdate() {
// 		this.serviceObject.setGetOperation(this.groupindicatorsaveurl)
// 		  .subscribe(data => {
// 			this.fileList = data.content;
// 			console.log(this.fileList);
// 		  }),
// 		  (ResponseError => {
// 			console.log(ResponseError._body);
			
// 		  });
// 	    }	
// 	  groupindicatorupdate() {
// 		if (this.draftMsg.trim().length == 0) {
		 
// 		  return;
// 		}
// 		else if (this.draftName.trim().length == 0) {
		 
// 		  return;
// 		}
// 		else {
// 		  var draft = { name: this.draftName.toUpperCase(), message: this.draftMsg.toUpperCase() };
		  
// 		  if  (this.fileList != null) {
// 			for (let item of this.fileList) {
// 			if  (this.draftName == item.name) {	
// 			return;
// 			}
// 			}
// 		  }
// 		  let body = JSON.stringify(draft);
// 		  this.serviceObject.setPostOperation(this.groupindicatorupdateurl, body)
// 			.subscribe(data => {
// 			  this.responseText = data;
// 			  console.log(data);
// 			  this.gettextupdate();
// 			}),
// 			(ResponseError => {
// 			  console.log(ResponseError._body);
// 			});
// 		}
// 	  }
// }  
 
//  */
//  // import { Component, OnInit } from '@angular/core';
// // import { AppService } from '../app.service';
// // import { ComposeMessageComponent } from './composemessage.component';
// // import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';
// // //import { HttpModule, Http, Response, URLSearchParams, RequestOptions, RequestMethod, Headers, ResponseContentType } from '@angular/http';
// // import 'rxjs/add/operator/toPromise';
// // import 'rxjs/add/operator/map';

// // @Component({
// // 	selector: 'app-miscellaneous',
// // 	templateUrl: './miscellaneous.component.html',
// // 	//  styleUrls: ['./miscellaneous.component.css']
// // })
// // export class MiscellaneousComponent implements OnInit {
// // 	selectedElement: any = '';
// // 	startMsgType = "ZCZC";
// // 	channelPrefix: string = '';
// // 	originIndicator: string = '';
// // 	priority = "SS";
// // 	fillingTime = new Date();
// // 	fileList: any = '';
// // 	messageurl = "api/v1/aftn/message";
// // 	sequenceUrl = "api/v1/aftn/bka/sequenceNum";
// // 	groupIndicatorUrl = "api/v1/command/gi";
// // 	drafturl = "api/v1/aftn/draft/";
// // 	responseText: string = '';
// // 	draftName: string = '';	draftMsg: string = '';
// // 	product:any;
// // 	displaypopup: string = "";
// // 	printData: string = "";
// // 	displayData: string = '';
// // 	index: number = 0;
// // 	msgDraft: any;
// // 	value1:any;

// // 	groupIndicatorsaveUrl = "api/v1/command/gis";
// // //public server = "http://192.168.1.10:8080/"
// // public server = "http://localhost:8080/"
// // public authenticationUrl = "auth"
// // public token: string = "";
// // private user: string;
// // data:any
// // data1:any
// // //url:any
// // // selectedElement: any = '';
// // // startMsgType = "ZCZC";
// // // channelPrefix: string = '';
// // // originIndicator: string = '';
// // // priority = "SS";
// // // fillingTime = new Date();
// // // sequenceNo;
// // // //sequenceNo1;
// // // sequenceUrl = "api/v1/aftn/bka/sequenceNum"
// // // groupIndicatorUrl = "api/v1/command/gi";


// // // messageurl = "api/v1/aftn/message";
// // // //sequenceUrl = "api/v1/aftn/bka/sequenceNum";
// // // //groupIndicatorUrl = "api/v1/command/gi";
// // // drafturl = "api/v1/aftn/draft/";

// // constructor(public serviceObject: AppService) {
// // 	this.channelPrefix = this.serviceObject.getChannelPrefix();
// // 	this.originIndicator = this.serviceObject.getOriginIndicator();


// // //sunil

// //  //this.serviceObject.save(url)
// //  //.subscribe((res: Response) =>this.data=res,err=>console.log(err));
	
// // //this.serviceObject.update(url)
// //  //.subscribe((res: Response) =>this.data1=res,err=>console.log(err));


// // 	}

// // 	ngOnInit()
// // {
		
// // }
// // }

// // //sunil



// // // onTextFileSave() {
// // //     if (this.draftMsg.trim().length == 0) {
// // //       //alert('Message can not be empty');
// // //       return;
// // //     }
// // //     else if (this.draftName.trim().length == 0) {
// // //       //alert("File Name can not be empty ");
// // //       return;
// // //     }
// // //     else {
// // //       var draft = { name: this.draftName.toUpperCase(), message: this.draftMsg.toUpperCase() };
// // //       //alert(JSON.stringify(this.fileList));
// // //       if (this.fileList != null) {
// // //         for (let item of this.fileList) {
// // //           if (this.draftName == item.name) {
// // //             //alert("File with name already exists"+item.name);
// // //             return;
// // //           }
// // //         }
// // //       }
// // //       let body = JSON.stringify(draft);
// // //       this.serviceObject.setPostOperation(this.drafturl, body)
// // //         .subscribe(data => {
// // //           this.responseText = data;
// // //           console.log(data);
// // //           this.getTextFile();
// // //           //this.clear();
// // //         }),
// // //         (ResponseError => {
// // //           console.log(ResponseError._body);
// // //           //alert("Error: "+JSON.stringify(ResponseError._body));
// // //         });
// // //     }
// // //   }









// // // 	alphaOnly(event: any) {
// // // 		const pattern = /[a-zA-Z ]/g;
// // // 		let inputChar = String.fromCharCode(event.charCode);
// // // 		if (!pattern.test(inputChar) && event.charCode != '0') {
// // // 			event.preventDefault();
// // // 		}
// // // 	}

// // // 	alphaNum(event: any) {
// // // 		const pattern = /[a-zA-Z0-9 ]/g;
// // // 		let inputChar = String.fromCharCode(event.charCode);
// // // 		if (!pattern.test(inputChar) && event.charCode != '0') {
// // // 			event.preventDefault();
// // // 		}
// // // 	}

// // // 	numOnly(event: any) {
// // // 		const pattern = /[0-9 ]/g;
// // // 		let inputChar = String.fromCharCode(event.charCode);
// // // 		if (!pattern.test(inputChar) && event.charCode != '0') {
// // // 			event.preventDefault();
// // // 		}
// // // 	}

// // // 	checkLength(ElementId) {
// // // 		var DIElementId = <HTMLInputElement>document.getElementById(ElementId);
// // // 		if ((DIElementId.value.length > 0) && (DIElementId.value.length < 8)) {
// // // 			DIElementId.focus(); DIElementId.style.border = "1px solid red";
// // // 		}
// // // 		else
// // // 			DIElementId.style.borderColor = "";
// // // 	}

// // // 	ngOnInit() {
// // // 		this.clear();
// // // 		this.getCurrentDateTime();
// // // 		this.getLatestSequenceNo();
// // // 		this.getGroupIndicator();
// // // 	}

// // // 	getCurrentDateTime() {
// // // 		this.currentDateTime = (this.fillingTime.getUTCDate() < 10 ? '0' : '') + this.fillingTime.getUTCDate() +
// // // 			(this.fillingTime.getUTCHours() < 10 ? '0' : '') + this.fillingTime.getUTCHours() +
// // // 			(this.fillingTime.getUTCMinutes() < 10 ? '0' : '') + this.fillingTime.getUTCMinutes();
// // // 		return this.currentDateTime;
// // // 	}

// // // 	checkForKeyWords(container) {
// // // 		var content = new String(container);
// // // 		for (let keyword of this.keyWords) {
// // // 			if (content.indexOf(keyword) != -1)
// // // 				return true;
// // // 		}
// // // 		return false;
// // // 	}

// // // 	//********** Get Address Indicator***********/
// // // 	getAddressIndicators(value) {
// // // 		this.serviceObject.setGetOperation(this.groupIndicatorUrl + "//" + value)
// // // 			.subscribe(data => {
// // // 				this.selectedAdressIndicators = data;
// // // 				console.log(this.selectedAdressIndicators);
// // // 			}),
// // // 			(ResponseError => {
// // // 				console.log(ResponseError._body);
// // // 				alert("Error: " + JSON.stringify(ResponseError._body));
// // // 			});
// // // 	}

// // // 	//****GetGroup Indicator */
// // // 	getGroupIndicator() {
// // // 		this.serviceObject.setGetOperation(this.groupIndicatorUrl)
// // // 			.subscribe(data => {
// // // 				this.groupIndicators = (data.gi);
// // // 			}),
// // // 			(ResponseError => {
// // // 				console.log(ResponseError._body);
// // // 				alert("Error: " + JSON.stringify(ResponseError._body));
// // // 			});
// // // 	}

	
// // // 	//*****When the user clicks the Group Indicator Save button,display the selected Address indiactor ********	
// // // 	submitGroupIndicator() {
// // // 		//this.hide('myModalGI');
// // // 		for (let obj of this.selectedAdressIndicators) {
// // // 			if (this.validateAI.search(obj) == -1) {
// // // 				if (!this.totalAI.has(obj)) {
// // // 					if (this.DI1 == "") { this.DI1 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI2 == "") { this.DI2 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI3 == "") { this.DI3 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI4 == "") { this.DI4 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI5 == "") { this.DI5 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI6 == "") { this.DI6 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI7 == "") { this.DI7 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI8 == "") { this.DI8 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI9 == "") { this.DI9 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI10 == "") { this.DI10 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI11 == "") { this.DI11 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI12 == "") { this.DI12 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI13 == "") { this.DI13 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI14 == "") { this.DI14 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI15 == "") { this.DI15 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI16 == "") { this.DI16 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI17 == "") { this.DI17 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI18 == "") { this.DI18 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI19 == "") { this.DI19 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI20 == "") { this.DI20 = obj; this.totalAI.add(obj); continue; }
// // // 					else if (this.DI21 == "") { this.DI21 = obj; this.totalAI.add(obj); continue; }
// // // 					else { this.totalAI.add(obj); continue; }
// // // 				}
// // // 			}
// // // 			else { continue; }
// // // 		}
// // // 	}

// // // 	getLatestSequenceNo() {
// // // 		this.serviceObject.setGetOperation(this.sequenceUrl)
// // // 			.subscribe(data => {
// // // 				this.sequenceNo = data.sequenceNum;
// // // 				//				this.sequenceNo1 = Number(this.sequenceNo);
// // // 				//				console.log(data.sequenceNum);
// // // 			}),
// // // 			(ResponseError => {
// // // 				console.log(ResponseError._body);
// // // 				//alert("Error: "+JSON.stringify(ResponseError._body));
// // // 			});
// // // 	}

// // // 	getDestinationIndicators() {
// // // 		this.validateAI = "";
// // // 		this.validateAI = this.DI1 + " " + this.DI2 + " " + this.DI3 + " " + this.DI4 + " " + this.DI5 + " " + this.DI6 + " " + this.DI7 + "\n" +
// // // 			this.DI8 + " " + this.DI9 + " " + this.DI10 + " " + this.DI11 + " " + this.DI12 + " " + this.DI13 + " " + this.DI14 + "\n" +
// // // 			this.DI15 + " " + this.DI16 + " " + this.DI17 + " " + this.DI18 + " " + this.DI19 + " " + this.DI19 + " " + this.DI20 + " " + this.DI21;
// // // 		this.validateAI = this.validateAI.trim();
// // // 		if (this.validateAI.length == 0) {
// // // 			alert("Please enter atleast one Address Indicator");
// // // 			return;
// // // 		}
// // // 		else {
// // // 			if (this.checkForKeyWords(this.validateAI)) {
// // // 				alert("Please verify Addres Indiactor may contain " + this.keyWords);
// // // 				return;
// // // 			}
// // // 			if (this.checkForKeyWords(this.OI23)) {
// // // 				alert("Please verify Origin Indiactor may contain " + this.keyWords);
// // // 				return;
// // // 			}
// // // 			else
// // // 				return this.validateAI;
// // // 		}
// // // 	}

// // // 	getcompleteAddressIndicators(): any[] {
// // // 		this.partitionedAI = [];
// // // 		this.partitionedAI.push(this.validateAI);
// // // 		var remstart = 0; var remstep = 21; var remend = remstart;
// // // 		var extraAI = "";
// // // 		var remtotal = Math.ceil(this.totalAI.size / remstep);
// // // 		for (let rotate = 1; rotate <= remtotal; rotate++) {
// // // 			rotate == remtotal ? remend = this.totalAI.size : remend = remend + remstep;
// // // 			for (; remstart < remend; remstart++) {
// // // 				if (remstart % 7 == 0)
// // // 					extraAI += "\n" + this.totalAI[remstart];
// // // 				else
// // // 					extraAI += " " + this.totalAI[remstart];
// // // 			}
// // // 			this.partitionedAI.push(extraAI);
// // // 			extraAI = "";
// // // 		}
// // // 		return this.partitionedAI;
// // // 	}




// // // 	clear() {
// // // 		this.DI1 = ''; this.DI2 = ''; this.DI3 = ''; this.DI4 = ''; this.DI5 = ''; this.DI6 = ''; this.DI7 = '';
// // // 		this.DI8 = ''; this.DI9 = ''; this.DI10 = ''; this.DI11 = ''; this.DI12 = ''; this.DI13 = ''; this.DI14 = '';
// // // 		this.DI15 = ''; this.DI16 = ''; this.DI17 = ''; this.DI18 = ''; this.DI19 = ''; this.DI20 = ''; this.DI21 = '';
// // // 		this.getCurrentDateTime();
// // // 		this.validateAI = "";
// // // 	}


// // // }}}}}}
