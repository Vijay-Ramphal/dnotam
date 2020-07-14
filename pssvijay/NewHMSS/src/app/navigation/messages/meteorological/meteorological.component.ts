import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-meteorological',
  templateUrl: './meteorological.component.html',
  styleUrls: ['./meteorological.component.css']
})
export class MeteorologicalComponent implements OnInit {
  startMsgType = "ZCZC";
  channelPrefix: string = '';
  sqnNo: string;
  priority = "SS";
  DI1: string; DI2: string; DI3: string; DI4: string; DI5: string; DI6: string; DI7: string; DI8: string; DI9: string; DI10: string; DI11: string;
	DI12: string; DI13: string; DI14: string; DI15: string; DI16: string; DI17: string; DI18: string; DI19: string; DI20: string; DI21: string;
  groupdisplay = 'none';
  currentDateTime: string;
  fillingTime = new Date();
  originIndicator: string = '';
  selectedElement: any = '';
  display = 'none';
  totalAI = new Set();
  selectedAdressIndicators: any = [];
  validateAI: string = "";
  keyWords = ["ZCZC", "CZC", "ZCZ", "NNNN"];
  fileList: any = '';
  draftMsg: string = 'hi';
  OI23: any;
  draftName: string = '';
  responseText: string = '';
  sequenceNo: any;
  groupIndicators: any = [];
  draftMsgParts: any = [];
  total: number;
  displayData: string = '';
  printData: string = "";
  partitionedAI: any = [];

  messageurl = "api/v1/aftn/message";
  sequenceUrl = "api/v1/aftn/bka/sequenceNum";
	groupIndicatorUrl = "api/v1/command/gi";
	drafturl = "api/v1/aftn/draft/";

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




  constructor(public serviceObject: AppService) {
    this.channelPrefix = this.serviceObject.getChannelPrefix();
    this.originIndicator = this.serviceObject.getOriginIndicator();
   }

  ngOnInit() {
    this.DI1 = ''; this.DI2 = ''; this.DI3 = ''; this.DI4 = ''; this.DI5 = ''; this.DI6 = ''; this.DI7 = '';
		this.DI8 = ''; this.DI9 = ''; this.DI10 = ''; this.DI11 = ''; this.DI12 = ''; this.DI13 = ''; this.DI14 = '';
		this.DI15 = ''; this.DI16 = ''; this.DI17 = ''; this.DI18 = ''; this.DI19 = ''; this.DI20 = ''; this.DI21 = '';
    this.getLatestSequenceNo();
    this.getGroupIndicator();
    this.getCurrentDateTime();
    this.getTextFile();
  }
  tabGroup: any[] = [{ name: 'FREETXT' }, { name: 'METAR' }, { name: 'TAF' }, { name: 'SIGMET' },{name:'SPECI'}];
  getLatestSequenceNo() {
		this.serviceObject.setGetOperation(this.sequenceUrl)
			.subscribe(data => {
				this.sqnNo = data.sequenceNum;
				this.sequenceNo = Number(data.sequenceNum);
				console.log(data.sequenceNum);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				//alert("Error: "+JSON.stringify(ResponseError._body));
			});
  }
  displayGroups() {
		this.groupClear();
		this.groupdisplay = 'block';
  }
  groupClear() {
		for (let item of this.selectAI) {
			item.value = "";
		}
  }
  alphaOnly(event: any) {
		const pattern = /[a-zA-Z]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
  }
  alphaNum(event: any) {
		const pattern = /[a-zA-Z0-9]/g;
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
  
  getCurrentDateTime() {
		this.currentDateTime = (this.fillingTime.getUTCDate() < 10 ? '0' : '') + this.fillingTime.getUTCDate() +
			(this.fillingTime.getUTCHours() < 10 ? '0' : '') + this.fillingTime.getUTCHours() +
			(this.fillingTime.getUTCMinutes() < 10 ? '0' : '') + this.fillingTime.getUTCMinutes();
  }
  
  numOnly(event: any) {
		const pattern = /[0-9]/g;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar) && event.charCode != '0') {
			event.preventDefault();
		}
  }
  
  onCloseHandled() {
		this.display = 'none';
		this.groupdisplay = 'none';
  }getGroupIndicator() {
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

  
  getAddressIndicators() {
		console.log(this.selectedElement);
		this.serviceObject.setGetOperation(this.groupIndicatorUrl + "//" + this.selectedElement)
			.subscribe(data => {
				this.selectedAdressIndicators = data;
				console.log(data);
				this.groupClear();
				for (let item = 0; item <= this.selectedAdressIndicators.length; item++) {
					this.selectAI[item].value = this.selectedAdressIndicators[item];
				}
				console.log(this.selectedAdressIndicators);
			}),
			(ResponseError => {
				console.log(ResponseError._body);
				alert("Error: " + JSON.stringify(ResponseError._body));
			});
  }
  onChange(name) {
		for (let item of this.fileList) {
			if (name == item.name)
				this.draftMsg = item.message;
				console.log(this.fileList)
		}
  }
  getDestinationIndicators() {
		this.validateAI = this.DI1 + " " + this.DI2 + " " + this.DI3 + " " + this.DI4 + " " + this.DI5 + " " + this.DI6 + " " + this.DI7 + "\n" +
			this.DI8 + " " + this.DI9 + " " + this.DI10 + " " + this.DI11 + " " + this.DI12 + " " + this.DI13 + " " + this.DI14 + "\n" +
			this.DI15 + " " + this.DI16 + " " + this.DI17 + " " + this.DI18 + " " + this.DI19 + " " + this.DI19 + " " + this.DI20 + " " + this.DI21;
		this.validateAI = this.validateAI.trim();
		//alert(this.validateAI);
		console.log(this.validateAI)
		if (this.validateAI.length == 0) {
			alert("Please enter atleast one Address Indicator");
			return
			
		}
		else {
			if (this.checkForKeyWords(this.validateAI)) {
				alert("Please verify Addres Indiactor may contain " + this.keyWords);
				return;
			}
			if (this.checkForKeyWords(this.OI23)) {
				alert("Please verify Origin Indiactor may contain " + this.keyWords);
				return;
			}
			else
				return this.validateAI;
		}
  }
  checkForKeyWords(container) {
		var content = new String(container);
		for (let keyword of this.keyWords) {
			if (content.indexOf(keyword) != -1)
				return true;
		}
		return false;
	}
  
  submitGroupIndicator() {
		this.onCloseHandled();
		this.getDestinationIndicators();
		for (let obj of this.selectedAdressIndicators) {
			if (this.validateAI.search(obj) == -1) {
				if (!this.totalAI.has(obj)) {
					if (this.DI1 == null || this.DI1 == "") { this.DI1 = obj; continue; }
					else if (this.DI2 == null || this.DI2 == "") { this.DI2 = obj; continue; }
					else if (this.DI3 == null || this.DI3 == "") { this.DI3 = obj; continue; }
					else if (this.DI4 == null || this.DI4 == "") { this.DI4 = obj; continue; }
					else if (this.DI5 == null || this.DI5 == "") { this.DI5 = obj; continue; }
					else if (this.DI6 == null || this.DI6 == "") { this.DI6 = obj; continue; }
					else if (this.DI7 == null || this.DI7 == "") { this.DI7 = obj; continue; }
					else if (this.DI8 == null || this.DI8 == "") { this.DI8 = obj; continue; }
					else if (this.DI9 == null || this.DI9 == "") { this.DI9 = obj; continue; }
					else if (this.DI10 == null || this.DI10 == "") { this.DI10 = obj; continue; }
					else if (this.DI11 == null || this.DI11 == "") { this.DI11 = obj; continue; }
					else if (this.DI12 == null || this.DI12 == "") { this.DI12 = obj; continue; }
					else if (this.DI13 == null || this.DI13 == "") { this.DI13 = obj; continue; }
					else if (this.DI14 == null || this.DI14 == "") { this.DI14 = obj; continue; }
					else if (this.DI15 == null || this.DI15 == "") { this.DI15 = obj; continue; }
					else if (this.DI16 == null || this.DI16 == "") { this.DI16 = obj; continue; }
					else if (this.DI17 == null || this.DI17 == "") { this.DI17 = obj; continue; }
					else if (this.DI18 == null || this.DI18 == "") { this.DI18 = obj; continue; }
					else if (this.DI19 == null || this.DI19 == "") { this.DI19 = obj; continue; }
					else if (this.DI20 == null || this.DI20 == "") { this.DI20 = obj; continue; }
					else if (this.DI21 == null || this.DI21 == "") { this.DI21 = obj; continue; }
					else { this.totalAI.add(obj); continue; }
				}
			}
			else { continue; }
    }
  }
    getTextFile() {
      this.serviceObject.setGetOperation(this.drafturl)
        .subscribe(data => {
          this.fileList = data.content;
          console.log(this.fileList);
        }),
        (ResponseError => {
          console.log(ResponseError._body);
          //alert("Error: "+JSON.stringify(ResponseError._body));
        });
    }
    
    onTextFileSave() {
      if (this.draftMsg.trim().length == 0) {
        //alert('Message can not be empty');
        return;
      }
      else if (this.draftName.trim().length == 0) {
        //alert("File Name can not be empty ");
        return;
      }
      else {
        var draft = { name: this.draftName.toUpperCase(), message: this.draftMsg.toUpperCase() };
        //alert(JSON.stringify(this.fileList));
        if (this.fileList != null) {
          for (let item of this.fileList) {
            if (this.draftName == item.name) {
              //alert("File with name already exists"+item.name);
              return;
            }
          }
        }
        let body = JSON.stringify(draft);
        this.serviceObject.setPostOperation(this.drafturl, body)
          .subscribe(data => {
            this.responseText = data;
            console.log(data);
            this.getTextFile();
            //this.clear();
          }),
          (ResponseError => {
            console.log(ResponseError._body);
            //alert("Error: "+JSON.stringify(ResponseError._body));
          });
      }
    }
    onTextFileDelete(fileToDelete) {
      var draft = this.drafturl + "/" + fileToDelete;
      this.serviceObject.setDeleteOperation(draft)
        .subscribe(data => {
          this.responseText = data.response;
          console.log(data.response);
          this.getTextFile();
          this.clear();
        }),
        (ResponseError => {
          console.log(ResponseError._body);
          //alert("Error: "+JSON.stringify(ResponseError._body));
        });
    }
    splitMessage(draftMessage, msglength) {
      this.draftMsgParts = [];
      var start = 0; var step = 1000; var end = step; var result;
      this.total = Math.ceil(msglength / step);
      this.displayData = ""; this.printData = ""; var partMessage = "";
      this.getLatestSequenceNo();
      for (let splitAI of this.partitionedAI) {
        for (let part = 1; part <= this.total; part++) {
          result = draftMessage.substring(start, end);
          var headerPart1 = this.startMsgType + " " + this.channelPrefix + (this.sequenceNo < 10 ? '0' : '') + (this.sequenceNo < 100 ? '00' : '') + this.sequenceNo;
          var headerPart2 = this.priority + " " + splitAI;
          var headerPart3 = this.currentDateTime + " " + this.originIndicator;
          var headerPart4 = "// END PART 0" + (part == this.total ? (part + "/0" + part) : part) + " //";
          this.printData = this.printData + (headerPart1 + "<br>" + headerPart2 + "<br>" + headerPart3 + "<br>" + result + "<br><br><br><br><br>" + (this.total > 1 ? headerPart4 : '') + "<br><br>NNNN<br>").toUpperCase();
          partMessage = (headerPart1 + "\n" + headerPart2 + "\n" + headerPart3 + "\n" + result + "\n\n\n\n\n" + (this.total > 1 ? headerPart4 : '') + "\n\nNNNN\n").toUpperCase();
          this.draftMsgParts.push(partMessage);
          this.displayData = this.displayData + partMessage;
          start = end; end = end + step;
          this.sequenceNo = this.sequenceNo + 1;
        }
        start = 0; end = step;
      }
      alert(this.draftMsgParts.length);
    }
    clear() {
      this.DI1 = ''; this.DI2 = ''; this.DI3 = ''; this.DI4 = ''; this.DI5 = ''; this.DI6 = ''; this.DI7 = '';
      this.DI8 = ''; this.DI9 = ''; this.DI10 = ''; this.DI11 = ''; this.DI12 = ''; this.DI13 = ''; this.DI14 = '';
      this.DI15 = ''; this.DI16 = ''; this.DI17 = ''; this.DI18 = ''; this.DI19 = ''; this.DI20 = ''; this.DI21 = '';
      this.draftName = ''; this.draftMsg = ''; this.totalAI.clear();
      this.getCurrentDateTime();
      this.validateAI = "";
      this.ngOnInit();
      this.selectedElement = "";
    }
    
	getcompleteAddressIndicators() {
		this.getDestinationIndicators();
		this.partitionedAI = [];
		this.partitionedAI.push(this.validateAI);
		console.log(this.partitionedAI);
		var remstart = 0; var remstep = 21; var remend = remstart;
		var extraAI = "";
		var remtotal = Math.ceil(this.totalAI.size / remstep);
		for (let rotate = 1; rotate <= remtotal; rotate++) {
			rotate == remtotal ? remend = this.totalAI.size : remend = remend + remstep;
			for (; remstart < remend; remstart++) {
				if (remstart % 7 == 0)
					extraAI += "\n" + this.totalAI[remstart];
				else
					extraAI += " " + this.totalAI[remstart];
			}
			this.partitionedAI.push(extraAI);
			extraAI = "";
		}
	}
    getMsgData() {
      this.getcompleteAddressIndicators();
      // console.log(this.partitionedAI.length)
      if (this.partitionedAI.length > 0) {
        if (this.draftMsg.trim().length == 0) {
          alert('Message can not be empty');
          return null;
        }
        else if (this.checkForKeyWords(this.draftMsg.toUpperCase())) {
          alert("Please verify the Message ,It may contain " + this.keyWords);
          return null;
        }
        else {
          this.splitMessage(this.draftMsg, this.draftMsg.trim().length);
          return this.draftMsgParts;
        }
      }
      else {
        alert("Destination Indicators are null");
        return null;
      }
    }
    submit() {
      if (this.getMsgData() != null) {
        console.log("dftMsgParts:   "+this.draftMsgParts);
        for (let i = 0; i < this.draftMsgParts.length; i++) {
          this.serviceObject.setPostOperation(this.messageurl, this.draftMsgParts[i])
            .subscribe(data => {
              this.responseText = data.response;
              ////alert(data.response);
              console.log(data.response);
              this.clear();
              ////alert("Record saved Successfully.");
              // var modal = <HTMLInputElement>document.getElementById('myModal');
              // modal.style.display = "block";
              // this.data="Record saved Successfully.";
            }),
            (ResponseError => {
              console.log(ResponseError._body);
              //alert("Error: "+JSON.stringify(ResponseError._body));
            });
        }
      }
      else {
        return;
      }
    }
    displayMessage() {
      if (this.getMsgData() != null) {
        this.display = 'block';
      }
      else
        this.display = 'none';
    }
	
 
}
