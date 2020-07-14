import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snowtam',
  templateUrl: './snowtam.component.html',
  styleUrls: ['./snowtam.component.css']
})
export class SnowtamComponent {

  show1:boolean = true;
  show2:boolean = false;
  show3:boolean = false;
  showIt1:boolean = false;
  showIt2:boolean = false;
  showIt3:boolean = false;
  optional:boolean = false;
  date = new Date();
  yrs = this.date.getFullYear();
  mns = this.date.getMonth() + 1;
  days = this.date.getDate();
  hours = this.date.getHours();
  minutes = this.date.getMinutes();
  snhdr1:string = 'SW';aerodrome:string='';dtntm:string='';
  apron:string='';nxtObsrv:string='';remarks:string='';snowtamno:string=''; 
  runway1:string='';runwaylen1:string='';runwaywidt1:string='';deposition1:string='';
  mdepth1:string='';friction1:string='';csnow1:string='';rlight1:string='';
  fcplanned1:string='';fcexpected1:string='';taxiway1:string='';taxisnow1:string='';  
  runway2:string='';runwaylen2:string='';runwaywidt2:string='';deposition2:string='';
  mdepth2:string='';friction2:string='';csnow2:string='';rlight2:string='';
  fcplanned2:string='';fcexpected2:string='';taxiway2:string='';taxisnow2:string='';   
  runway3:string='';runwaylen3:string='';runwaywidt3:string='';deposition3:string='';
  mdepth3:string='';friction3:string='';csnow3:string='';rlight3:string='';
  fcplanned3:string='';fcexpected3:string='';taxiway3:string='';taxisnow3:string='';
  help:string='';serialno1:string='';serialno2:string='';locInd:string='';dtObserv:string='';optgroup:string='COR';  
  result:string = '';
  fin:any =[];  

  target1:any = ["OMAD","SVAC","SVCH","SVAD","LGAG","OMAM","OTBK","OTBH","LGAX","LGBL","SVAN","LGAD","SVAB","SKAP","LGRX","SVAA","SVAS","DNAS","EGEI","NCAT","SVBS","SVBL","SVFM","EPKG","OBBB","OBBS","OBKH","LTFD"
              ,"SVBC","SVBI","SVBM","SVBB","SVBO","TNCB","SVBZ","SKBU","SKBN","SVCI","SVCD","SVCL","SVCN","SVCC","SVCS","SVCO","SVCZ","SKGO","SVCP","NZCG","SVQM","SVCA","LGSA","MWCB","CYCK","SVCB","SVPI","MRCU","EKCN"
              ,"SVCR","SKCV","SVUR","SVCU","SVRB","TNCF","TNCC","LGTT","VRMD","OMDW","SVLL","SVED","SVRS","SVEM","SVJI","SVVG","LGEL","SVEZ","NZEV","EDTF","SVFT","VRMR","SKGB","SVGU","SVGD","SVGT","SVGI","SVQJ","EKHM"
              ,"SVQF","LSPK","SVQL"];
  target2:any = ["AA","AB","AC","AD","BA","BB","BC","BD","CA","CB","CC","CD"];

  showElement(event: any) 
  {
    switch (event.target.value) 
    {
      case 'one':
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        break;
      case 'two':
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        break;
      case 'three':
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        break;
      default:
        console.log("ERROR");
        break;
    }
  }

  changeVisual(event:any)
  {
    var r1 = document.getElementById("r1");
    var r2 = document.getElementById("r2");
    var r3 = document.getElementById("r3");

    if(event.target.value == "one")
    {
      r1.style.borderBottom = "none";
      r2.style.border = "1px solid rgb(209, 198, 198)";
      r3.style.border = "1px solid rgb(209, 198, 198)";
    }
    else if(event.target.value == "two")
    {
      r1.style.border = "1px solid rgb(209, 198, 198)";
      r2.style.borderBottom = "none";
      r3.style.border = "1px solid rgb(209, 198, 198)";
    }
    else if(event.target.value == "three")
    {
      r1.style.border = "1px solid rgb(209, 198, 198)";
      r2.style.border = "1px solid rgb(209, 198, 198)";
      r3.style.borderBottom = "none";
    }
  }

  optgrp(event:any)
  {
    switch(event.target.value)
    {
      case 'new':
        this.optional = false;
        break;
      case 'modify':
        this.optional = true;
        break;
    }
  }

  clearAll()
  {
    this.snowtamno='';this.aerodrome='';this.dtntm='';
    this.apron='';this.nxtObsrv='';this.remarks='';
    this.runway1='';this.runwaylen1='';this.runwaywidt1='';this.deposition1='';
    this.mdepth1='';this.friction1='';this.csnow1='';this.rlight1='';
    this.fcplanned1='';this.fcexpected1='';this.taxiway1='';this.taxisnow1='';
    this.runway2='';this.runwaylen2='';this.runwaywidt2='';this.deposition2='';
    this.mdepth2='';this.friction2='';this.csnow2='';this.rlight2='';
    this.fcplanned2='';this.fcexpected2='';this.taxiway2='';this.taxisnow2='';
    this.runway3='';this.runwaylen3='';this.runwaywidt3='';this.deposition3='';
    this.mdepth3='';this.friction3='';this.csnow3='';this.rlight3='';
    this.fcplanned3='';this.fcexpected3='';this.taxiway3='';this.taxisnow3='';
    this.help='';this.serialno1='';this.serialno2='';this.locInd='';this.dtObserv='';
  }

  alphOnly(event: any) 
  {
    const pattern = /[a-zA-Z]/g;
    let v = String.fromCharCode(event.charCode);
    if (!pattern.test(v) && event.charCode != '0') 
    {
      event.preventDefault();
    }
  }

  numOnly(event: any) 
  {
    const pattern = /[0-9]/g;
    let v = String.fromCharCode(event.charCode);
    if (!pattern.test(v) && event.charCode != '0') 
    {
      event.preventDefault();
    }
  }

  alphaNum(event: any) 
  {
    const pattern = /[a-zA-Z0-9 ]/g;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar) && event.charCode != '0') 
    {
      event.preventDefault();
    }
  }

  getIndi(event:any)
  {
    let x;
    if(event.target.id == 'serialno')
    {
      this.checkIndi(this.serialno1, x=1, this.target2);
    }
    else if(event.target.id == 'locInd')
    {
      this.checkIndi(this.locInd, x=2, this.target1);
    }
    else if(event.target.id == 'aerodrome')
    {
      this.checkIndi(this.aerodrome, x=3, this.target1);
    }
  }

  checkIndi(nme,x,targ)
  {
    var _this = this;
    let count:number = 0;
    this.fin.splice(0,(this.fin.length));
    if(nme != '')
    {
      var ttl1:string = '',ttl2:string = '';
      for(let tg in targ)
      {
         ttl1 = targ[tg];
         for(let i = 0; i < nme.length; i++)
         {
           ttl2 += ttl1[i];                      
         }
           if(ttl2 == nme.toUpperCase())
           {
            this.fin.push(targ[tg]);
           }else if(ttl2 != nme.toUpperCase())
             {
                count++;
                  for(let j = 0; j < this.fin.length; j++)
                  {
                    if(this.fin[j] == targ[tg])
                    {
                      this.fin.splice(j,1);
                    }
                  }
                  if(count == targ.length && ((nme[2]!= "x" && nme[2]!= "X") && nme[2] != undefined))
                  {
                    console.log("Inside");
                    if( (nme[3] != "X" && nme[3] != "x") && nme[3] != undefined)
                    {
                      console.log("Inside2");
                      alert("Not validcode");
                      count = 0;
                    }
                  }else if(count == targ.length && nme[2] == undefined && nme[3] == undefined)
                  {
                    alert("Not validcode Inside");
                  }
              }
         ttl2 = '';
      }
        var cnt = 0;
        for(let i = 0; i < this.fin.length; i++)
        {
          for(let j = 0; j < this.fin.length; j++)
          {
            if(this.fin[i] == this.fin[j])
            {
              cnt++;
              if(cnt > 1)
              {
               this.fin[j] = '';
               }
            }
            if( j == this.fin.length-1){cnt = 0;}
          }
        }
        if(x == 1){this.showIt1 = true;}
        else if(x == 2){this.showIt2 = true;}
        else if(x == 3){this.showIt3 = true;}
      count = 0;
        for(let j in this.fin)
        {
          if(this.fin[j] == '')
          {
            this.fin.splice(parseInt(j),1);
          }
        }
        this.autoFocus();
    }else
    {
      if(x == 1){this.showIt1 = false;}
      else if(x == 2){this.showIt2 = false;}
      else if(x == 3){this.showIt3 = false;}
       this.clearAuto2();
    }
  }

  clearAuto2()
  {
    this.fin.splice(0,(this.fin.length));
  }

  autoClick1(f:any)
  {
    this.serialno1 = f;
    this.showIt1 = false;
    this.autoFocus();
  }
  autoClick2(f:any)
  {
    this.locInd = f;
    this.aerodrome = this.locInd;
    this.showIt2 = false;
  }
  autoClick3(f:any)
  {
    this.aerodrome = f;
    this.showIt3 = false;
  }

  autoFocus()
  {
    if(this.serialno1.length == 2){document.getElementById("serialno2").focus();}
  }

  clear1()
  {
    this.showIt1 = false;
  }

  clear2()
  {
    this.showIt2 = false;
  }

  clear3()
 {
   this.showIt3 = false;
 }

 getDtnTm(event:any)
  {
    //console.log(typeof(event.target.id));
    if(event.target.id == 'dtObsv')
    {
      console.log("ion");
      this.checkDtnTm(this.dtObserv);
    }
    else if(event.target.id == 'dtntm')
    {
      this.checkDtnTm(this.dtntm);
    }
  }

  checkDtnTm(nme)
  {
    this.date = new Date();
    this.yrs = this.date.getFullYear();
    this.mns = this.date.getMonth() + 1;
    this.days = this.date.getDate();
    this.hours = this.date.getHours();
    this.minutes = this.date.getMinutes();

    let mn:string  = nme[0] + nme[1];
    let day:string = nme[2] + nme[3];
    let hrs:string = nme[4] + nme[5];
    let min:string = nme[6] + nme[7];

    if(nme[1] != undefined)
    {
      if(parseInt(mn) > 12 || parseInt(mn) < 0)
      {
        alert("Months should be lees than 12 and greater than 0");
      }
    }
    if(nme[3] != undefined)
    {
      if(parseInt(mn) == 1 || parseInt(mn) == 3|| parseInt(mn) == 5 || parseInt(mn) == 7 || parseInt(mn) == 8 || parseInt(mn) == 10 || parseInt(mn) == 12)
      {
        if(parseInt(day) > 31)
        {
          alert("Maximum no of days is 31");
        }
      }
      else if(parseInt(mn) == 4 || parseInt(mn) == 6|| parseInt(mn) == 9 || parseInt(mn) == 11)
      {
        if(parseInt(day) > 30)
        {
          alert("Maximum no of days is 30");
        }
      }
      else if(parseInt(mn) == 2)
      {
        if((this.yrs%400) == 0)
        {
          if(parseInt(day) > 29)
            {
              alert("Maximum no of days is 29");
            }
        }
        else if((this.yrs%100) != 0 && (this.yrs%4) == 0)
        {
          if(parseInt(day) > 29)
            {
              alert("Maximum no of days is 29");
            }
        }
        else
        {
          if(parseInt(day) > 28)
            {
              alert("Maximum no of days is 28");
            }
        }
      }
      if((parseInt(mn) < this.mns && parseInt(day) != 1))
      {
        alert("Day is not valid");
      }
      if(parseInt(mn) == this.mns && parseInt(day) > this.days)
      {
        alert("Cannot type Future Date");
      }
    }
    if(nme[5] != undefined)
    {
      if(parseInt(mn) == this.mns && parseInt(day) == this.days)
      {
        if(parseInt(hrs) > this.hours)
        {
          alert("Cannot type future time");
        }
      }
      else
      {
        if(parseInt(hrs) > 23)
        {
          alert("Hours should be between 0 and 23");
        }
      }
     }
     if(nme[7] != undefined)
     {
       console.log(this.minutes);
      if(parseInt(mn) == this.mns && parseInt(day) == this.days && parseInt(hrs) == this.hours)
      {
        if(parseInt(min) > this.minutes)
        {
          alert("Cannot type future time");
        }
      }
      else
      {
        if(parseInt(min) > 59)
        {
          alert("Hours should be between 0 and 59");
        }
      }
    }
  }

  assignVals1()
  {
    if(this.serialno2.length == 4)
    {
      this.snowtamno = this.serialno2;
    }
  }

  assignVals2()
  {
    if(this.locInd.length == 4)
    {
      this.aerodrome = this.locInd;
    }
  }

  assignVals3()
  {
    if(this.dtObserv.length == 8)
    {
      this.dtntm = this.dtObserv;
    }
  }

  onDisplay()
  {
    this.result = " "+this.snhdr1+this.serialno1+this.serialno2+"     "+this.locInd+"     "+this.dtObserv+
    "     ";
    
    if(this.optional == true)
    {
      this.result += this.optgroup;
    }

    this.result += "\n"+" SNOWTAM "+this.snowtamno+"\n"+"       A)"+this.aerodrome+"       B)"+this.dtntm;

    if(this.runway1 != '' && this.runway1 != undefined)
    {
      this.result += "\n"+"       C)"+this.runway1+"       D)"+this.runwaylen1+"       E)"+this.runwaywidt1+"       F)"+this.deposition1+
      "\n"+"       G)"+this.mdepth1+"       H)"+this.friction1+"       J)"+this.csnow1+"       K)"+this.rlight1+
      "\n"+"       L)"+this.fcplanned1+"       M)"+this.fcexpected1+"       N)"+this.taxiway1+"       P)"+this.taxisnow1;
    }

    if(this.runway2 != '' && this.runway2 != undefined)
    {
      this.result += "\n"+"       C)"+this.runway2+"       D)"+this.runwaylen2+"      E)"+this.runwaywidt2+"       F)"+this.deposition2+
      "\n"+"       G)"+this.mdepth2+"       H)"+this.friction2+"       J)"+this.csnow2+"       K)"+this.rlight2+
      "\n"+"       L)"+this.fcplanned2+"       M)"+this.fcexpected2+"       N)"+this.taxiway2+"       P)"+this.taxisnow2;
    }
    
    if(this.runway3 != '' && this.runway3 != undefined)
    {
      this.result += "\n"+"       C)"+this.runway3+"       D)"+this.runwaylen3+"       E)"+this.runwaywidt3+"       F)"+this.deposition3+
      "\n"+"      G)"+this.mdepth3+"       H)"+this.friction3+"       J)"+this.csnow3+"       K)"+this.rlight3+
      "\n"+"       L)"+this.fcplanned3+"       M)"+this.fcexpected3+"       N)"+this.taxiway3+"       P)"+this.taxisnow3;
    }
    this.result += "\n"+"       R)"+this.apron+"       S)"+this.nxtObsrv+"\n"+"       T)"+this.remarks;
  }

  helpMsgs: Array<any> =
  [
    {name:"serialno", value:"geographical designator for States, e.g. LF = FRANCE, EG = United Kingdom"},
    {name:"serialno2", value:"SNOWTAM serial number in a four-figuregroup"},
    {name:"locInd",value:"four-letter location indicator of theaerodrome to which the SNOWTAM refers"},
    {name:"dtObsv",value:"date/time of observation/ measure-ment, whereby: MM = month, e.g. January = 01,December = 12YY = day of the month GGgg = time in hours (GG) andminutes (gg) UTC"},
    {name:"snowtamno",value:"SNOWTAM serial number in a four-figuregroup"},
    {name:"aerodrome",value:"Aerodrome location indicator (four-letter location indicator)."},
    {name:"dtntm",value:"Eight-figure date/time group — giving time of observation as month, day, hour and minute in UTC; this item must always be completed."},
    {name:"runway1",value:"Lower runway designator number."},
    {name:"runwaylen1",value:"Cleared runway length in metres, if lessthan published length (see Item T on reporting on partof runway not cleared)."},
    {name:"runwaywidt1",value:"Cleared runway width in metres, if less than published width; if offset left or right of centre line,add “L” or “R”, as viewed from the threshold having the lower runway designation number."},
    {name:"deposition1",value:"Deposit over total runway length as explainedin SNOWTAM Format. Suitable combinations of these numbers may be used to indicate varying conditions over runway segments. If more than one deposit is present on the same portion of the runway, they should be reported in sequence from the top to the bottom.Drifts, depths of deposit appreciably greater than the average values or other significant characteristics of the deposits may be reported under Item T in plainlanguage."},
    {name:"mdepth1",value:"Mean depth in millimetres deposit for eachthird of total runway length, or “XX” if not measurable or operationally not significant; the assessment to be made to an accuracy of 20 mm for dry snow, 10 mm for wet snow and 3 mm for slush."},
    {name:"friction1",value:"if not available,estimated surface friction (single digit) in the order fromthe threshold having the lower runway designation number.type of friction measuring device used:BRD Brakemeter-Dynometer,GRT Grip tester,MUM Mu-meter,RFT Runway friction tester, SFH Surface friction tester (high-pressure tire), SFL Surface friction tester (low-pressure tire), SKH Skiddometer (high-pressure tire), SKL Skiddometer (low-pressure tire),TAP Tapley meter"},
    {name:"csnow1",value:"If present insert height in centimetres and distance from edge of runway inmetres, followed by left (“L”) or right (“R”) side orboth sides (“LR”), as viewed from the thresholdhaving the lower runway designation number"},
    {name:"rlight1",value:"If runway lights are obscured, insert “YES”followed by “L”, “R” or both “LR”, as viewed from the threshold having the lower runway designationnumber."},
    {name:"fcplanned1",value:"When further clearance will be undertaken,enter length and width of runway or “TOTAL” if runway will be cleared to full dimensions"},
    {name:"fcexpected1",value:"Enter the anticipated time of completion in UTC."},
    {name:"taxiway1",value:"The code for Item F may be used to describetaxiway conditions; enter “NO” if no taxiways servingthe associated runway are available"},
    {name:"taxisnow1",value:"If applicable, enter 'YES' followed by thelateral distance in metres."},
    {name:"nxtObsrv",value:"Enter the anticipated time of nextobservation/measurement in UTC."},
    {name:"apron",value:"The code for Item F may be used to describe apron conditions; enter “NO” if the apron is unusable."},
    {name:"remarks",value:"always report on length of uncleared runway  and extent of runwaycontamination . Runway contamination — 10% — if less than 10% of  runway contaminated. Runway contamination — 25% — if 11-25% of runway contaminated Runway contamination — 50% — if 26-50% of runway contaminated Runway contamination — 100% — if 51-100% of runway contaminated."},
    {name:"optgroup",value:""}
  ];
  DispHelpMsg(identity:string)
  {
    this.help = "";
    //console.log(this.helpMsgs.find((item:any) => item.name == identity));//
    let getHelpDat = this.helpMsgs.find((item:any) => item.name == identity );
    this.help = getHelpDat.value;
  }
  ClearHelp()
  {
    this.help='';
  }

}
