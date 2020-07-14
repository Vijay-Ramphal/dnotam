import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../app.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-notam',
  templateUrl: './notam.component.html',
  styleUrls: ['./notam.component.css']
})


export class NotamComponent implements OnInit {

  show1: boolean = true;
  show2: boolean = true;
  show3: boolean = true;
  show4: boolean = true;
  selectedElement: any = '';
  startMsgType = "ZCZC";
  channelPrefix: string = '';
  originIndicator: string = '';
  priority = "SS";
  fillingTime = new Date();
  fileList: any = '';
  messageurl = "api/v1/aftn/message";
  sequenceUrl = "api/v1/aftn/bka/sequenceNum";
  groupIndicatorUrl = "api/v1/command/gi";
  drafturl = "api/v1/aftn/draft/";
  responseText: string = '';
  draftName: string = '';
  draftMsg: string = '';
  displaypopup: string = "";
  printData: string = "";
  displayData: string = '';
  index: number = 0;
  msgDraft: any;
  keyWords = ["ZCZC", "CZC", "ZCZ", "NNNN"];
  partitionedAI: any = [];
  draftMsgParts: any = [];
  total: number;
  selectedItem: string = '';
  currentDateTime: string;
  sqnNo: string;
  sequenceNo: any;
  DI1: string; DI2: string; DI3: string; DI4: string; DI5: string; DI6: string; DI7: string; DI8: string; DI9: string; DI10: string; DI11: string;
  DI12: string; DI13: string; DI14: string; DI15: string; DI16: string; DI17: string; DI18: string; DI19: string; DI20: string; DI21: string;
  OI23: any;
  validateAI: string = "";
  totalAI = new Set();
  groupIndicators: any = [];
  selectedAdressIndicators: any = [];
  notamn: string = ''; notamr1: string = ''; notamr2: string = ''; notamc1: string = ''; notamc2: string = '';
  NOTAMN: boolean; NOTAMR: boolean; NOTAMC: boolean;
  /*fir1:string='';fir2:string='';fir3:string='';fir4:string='';ntmcode1:string='Q';ntmcode2:string='';ntmcode3:string='';ntmcode4:string='';ntmcode5:string='';traffic1:string='';traffic2:string='';
  purpose1:string='';purpose2:string='';purpose3:string='';scope1:string='';scope2:string='';llimit1:string='';llimit2:string='';llimit3:string='';ulimit1:string='';ulimit2:string='';ulimit3:string='';
  codrad1:string='';codrad2:string='';codrad3:string='';codrad4:string='';codrad5:string='';codrad6:string='';codrad7:string='';codrad8:string='';codrad9:string='';codrad10:string='';codrad11:string='';
  codrad12:string='';codrad13:string='';codrad14:string='';*/locInd: string = ''; validFrm: string = ''; validTo: string = ''; tmschd: string = ''; notamtxt: string = ''; llimbar: string = ''; ulimbar: string = '';
  totalMsg: string; ntm: string = ''; fir: string = ''; ntmcode1: string = 'Q'; ntmcode2: string = ''; ntmcode3: string = ''; traffic: string = '';
  purpose: string = ''; scope: string = ''; llimit: string = ''; ulimit: string = ''; codrad: string = '';
  findout: boolean = true;
  aftnMessage: any = '';
  helpMessageHeader: string = '';
  helpInfoMessage: any = '';
  display = 'none';
  groupdisplay = 'none';
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
    this.clear();
    this.selectedItem = "FREETXT";
    // this.getCurrentDateTime();
    // this.getLatestSequenceNo();
    // this.getGroupIndicator();
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

  //********** Get Address Indicator***********/
  getAddressIndicators() {
    console.log(this.selectedElement);
    this.serviceObject.setGetOperation(this.groupIndicatorUrl + "//" + this.selectedElement)
      .subscribe(data => {
        this.selectedAdressIndicators = data;
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

  groupClear() {
    for (let item of this.selectAI) {
      item.value = "";
    }
  }

  onChange(name) {
    for (let item of this.fileList) {
      if (name == item.name)
        this.draftMsg = item.message;
    }
  }

  displayMessage() {
    if (this.getMsgData() != null) {
      this.display = 'block';
    }
    else
      this.display = 'none';
  }
  displayGroups() {
    this.groupClear();
    this.groupdisplay = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
    this.groupdisplay = 'none';
  }

  getMsgData() {

  }

  print() {
    if (this.getMsgData() != null) {
      var popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write('<html> <center><span style="font-size:12px;color:green"> </span></center><link rel="stylesheet" type="text/css" href="print.css" /> 	<body onload="window.print();window.close()"> <div class=" "  style="text-align:left;font-size:16px;rows:30px; cols:90px" >' + this.printData + '</div></body>');
      popupWin.document.write('</html>');
      popupWin.document.close();
    }
  }

  emptyHelpDisplay() {
    this.helpInfoMessage = "";
    this.helpMessageHeader = "";
  }

  showElement(event: any) {
    //console.log(event.target.value);
    switch (event.target.value) {
      case 'FREETXT':
        this.show4 = false;
        this.show2 = true;
        this.show3 = true;
        this.show1 = true;
        break;
      case 'NOTAMN':
        this.show1 = false;
        this.show2 = true;
        this.show3 = true;
        this.show4 = true;
        break;
      case 'NOTAMR':
        this.show2 = false;
        this.show1 = true;
        this.show3 = true;
        this.show4 = true;
        break;
      case 'NOTAMC':
        this.show3 = false;
        this.show1 = true;
        this.show2 = true;
        this.show4 = true;
        break;
      default:
        console.log("ERROR");
        break;
    }

  }

  listClick(newValue) {
    this.selectedItem = newValue;
    //this.tabclear();
  }


  tabGroup: any[] = [{ name: 'FREETXT' }, { name: 'NOTAMN' }, { name: 'NOTAMR' }, { name: 'NOTAMC' }];
  clear() {
    this.sqnNo = ''; this.priority = ''; this.currentDateTime = ''; this.originIndicator = '';
    this.DI1 = ''; this.DI2 = ''; this.DI3 = ''; this.DI4 = ''; this.DI5 = ''; this.DI6 = ''; this.DI7 = '';
    this.DI8 = ''; this.DI9 = ''; this.DI10 = ''; this.DI11 = ''; this.DI12 = ''; this.DI13 = ''; this.DI14 = '';
    this.DI15 = ''; this.DI16 = ''; this.DI17 = ''; this.DI18 = ''; this.DI19 = ''; this.DI20 = ''; this.DI21 = '';
    /*this.fir1='';this.fir2='';this.fir3='';this.fir4='';this.ntmcode1='Q';this.ntmcode2='';this.ntmcode3='';this.ntmcode4='';this.ntmcode5='';this.traffic1='';this.traffic2='';this.purpose1='';this.purpose2='';
    this.purpose3='';this.scope1='';this.scope2='';this.llimit1='';this.llimit2='';this.llimit3='';this.ulimit1='';this.ulimit2='';this.ulimit3='';
    this.codrad1='';this.codrad2='';this.codrad3='';this.codrad4='';this.codrad5='';this.codrad6='';this.codrad7='';this.codrad8='';this.codrad9='';this.codrad10='';this.codrad11='';
    this.codrad12='';this.codrad13='';this.codrad14='';*/this.fir = ''; this.ntmcode1 = 'Q'; this.ntmcode2 = ''; this.ntmcode3 = ''; this.traffic = ''; this.purpose = ''; this.scope = ''; this.llimit = '';
    this.ulimit = ''; this.codrad = ''; this.notamn = ''; this.notamr1 = ''; this.notamr2 = ''; this.notamc1 = ''; this.notamc2 = ''; this.NOTAMN = false; this.NOTAMR = false; this.NOTAMC = false;
    this.show1 = true; this.show2 = true; this.show3 = true; this.locInd = ''; this.validFrm = ''; this.validTo = ''; this.tmschd = ''; this.notamtxt = ''; this.llimbar = ''; this.ulimbar = '';
  }

  submitGroupIndicator() {
    this.onCloseHandled();
    alert("Inside SubmitGroup");
    for (let obj of this.selectedAdressIndicators) {
      if (!this.totalAI.has(obj)) {
        if (this.DI1 == null || this.DI1 == "") { this.DI1 = obj; continue; }
        else if (this.DI2 == null || this.DI2 == "") { this.DI2 = obj; continue; }
        else if (this.DI3 == null || this.DI3 == "") { this.DI3 = obj; continue; }
        else if (this.DI4 == null || this.DI4 == "") { this.DI4 = obj; continue; }
        else if (this.DI5 == null || this.DI15 == "") { this.DI5 = obj; continue; }
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
      else { continue; }
    }
  }

  getDestinationIndicators() {
    this.validateAI = this.DI1 + " " + this.DI2 + " " + this.DI3 + " " + this.DI4 + " " + this.DI5 + " " + this.DI6 + " " + this.DI7 + "\n" +
      this.DI8 + " " + this.DI9 + " " + this.DI10 + " " + this.DI11 + " " + this.DI12 + " " + this.DI13 + " " + this.DI14 + "\n" +
      this.DI15 + " " + this.DI16 + " " + this.DI17 + " " + this.DI18 + " " + this.DI19 + " " + this.DI19 + " " + this.DI20 + " " + this.DI21;
    this.validateAI = this.validateAI.trim();
    alert(this.validateAI);
    if (this.validateAI.length == 0) {
      alert("Please enter atleast one Address Indicator");
      return;
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

  getcompleteAddressIndicators() {
    this.getDestinationIndicators();
    this.partitionedAI = [];
    this.partitionedAI.push(this.validateAI);
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

  checkForKeyWords(container) {
    var content = new String(container);
    for (let keyword of this.keyWords) {
      if (content.indexOf(keyword) != -1)
        return true;
    }
    return false;
  }

  alphOnly(event: any) {
    const pattern = /[a-zA-Z]/g;
    let v = String.fromCharCode(event.charCode);
    if (!pattern.test(v) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  numOnly(event: any) {
    const pattern = /[0-9]/g;
    let v = String.fromCharCode(event.charCode);
    if (!pattern.test(v) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  alphaNum(event: any) {
    const pattern = /[a-zA-Z0-9 ]/g;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  alphaNumplus(event: any) {
    const pattern = /[a-zA-Z0-9/ ]/g;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != '0') {
      event.preventDefault();
    }
  }

  getntmcode() {

    if (this.notamn != '') {

      this.ntm = this.notamn + " NOTAMN";
    }
    else if (this.notamr1 != '' && this.notamr2 != '') {

      let k: any = '';
      let j: any = '';

      if ((this.notamr1[0] == this.notamr2[0] && this.notamr1.charCodeAt(0) >= 65 && this.notamr1.charCodeAt(0) <= 90) || (this.notamr1[0] == this.notamr2[0] && this.notamr1.charCodeAt(0) >= 97 && this.notamr1.charCodeAt(0) <= 122)) {

        for (let i = 1; i <= 4; i++) {
          k += this.notamr1[i];
        }

        let p: Number = parseInt(k);

        k = '';

        for (let i = 6; i <= 7; i++) {
          k += this.notamr1[i];
        }

        let l: Number = parseInt(k);

        for (let i = 1; i <= 4; i++) {
          j += this.notamr2[i];
        }

        let q: Number = parseInt(j);

        j = '';

        for (let i = 6; i <= 7; i++) {
          j += this.notamr2[i];
        }

        let m: Number = parseInt(j);

        if (p <= q) {
          alert("NOTAM Codes are incorrect for 2");
          this.findout = true;
        } else {
          this.findout = false;
        }

        if (m > l) {
          alert("NOTAM Codes are incorrect for 3");
          this.findout = true;
        } else {
          this.findout = false;
        }

      } else {
        alert("NOTAM Codes are incorrect for 1");
        this.findout = true;
      }

      this.ntm = this.notamr1 + " NOTAMR " + this.notamr2;
    }
    else if (this.notamc1 != '' && this.notamc2 != '') {

      let k: string = '';
      let j: string = '';

      if ((this.notamc1[0] == this.notamc2[0] && this.notamc1.charCodeAt(0) >= 65 && this.notamc1.charCodeAt(0) <= 90) || (this.notamc1[0] == this.notamc2[0] && this.notamc1.charCodeAt(0) >= 97 && this.notamc1.charCodeAt(0) <= 122)) {

        for (let i = 1; i <= 4; i++) {
          k += this.notamc1[i];
        }

        let p: Number = parseInt(k);

        k = '';

        for (let i = 6; i <= 7; i++) {
          k += this.notamc1[i];
        }

        let l: Number = parseInt(k);

        for (let i = 1; i <= 4; i++) {
          j += this.notamc2[i];
        }

        let q: Number = parseInt(j);

        j = '';

        for (let i = 6; i <= 7; i++) {
          j += this.notamc2[i];
        }

        let m: Number = parseInt(j);

        if (p <= q) {
          alert("NOTAM Codes are incorrect for 2");
          this.findout = true;
        } else {
          this.findout = false;
        }

        if (m > l) {
          alert("NOTAM Codes are incorrect for 3");
          this.findout = true;
        } else {
          this.findout = false;
        }

      } else {
        alert("NOTAM Codes are incorrect for 1");
        this.findout = true;
      }
      this.ntm = this.notamc1 + " NOTAMC " + this.notamc2;
    }
  }

  getMessageContent() {
    this.totalMsg = "( " + this.ntm + "\n" + "Q) " + this.fir + "/" + this.ntmcode1 + this.ntmcode2 + this.ntmcode3 + "/" + this.traffic + "/" + this.purpose + "/" + this.scope + "/" + this.llimit + "/" + this.ulimit + "/" + this.codrad
                    /*this.fir1+this.fir2+this.fir3+this.fir4+"/"+this.ntmcode1+this.ntmcode2+this.ntmcode3+this.ntmcode4+this.ntmcode5+
                    "/"+this.traffic1+this.traffic2+"/"+this.purpose1+this.purpose2+this.purpose3+"/"+this.scope1+this.scope2+"/"+this.llimit1+this.llimit2+this.llimit3+
                    "/"+this.ulimit1+this.ulimit2+this.ulimit3+"/"+this.codrad1+this.codrad2+this.codrad3+this.codrad4+this.codrad5+this.codrad6+this.codrad7+
                    this.codrad8+this.codrad9+this.codrad10+this.codrad11+this.codrad12+this.codrad13+this.codrad14*/+ "\n" + "A) " + this.locInd + "  B) " + this.validFrm + "  C) " + this.validTo +
      "\n" + "D) " + this.tmschd + "\n" + "E) " + this.notamtxt + "\n" + "F) " + this.llimbar + "  G) " + this.ulimbar + " )";
    console.log(this.totalMsg.toUpperCase());
  }

  submit() {
    this.getMessageContent();
  }


}