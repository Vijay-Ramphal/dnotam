import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ashtam',
  templateUrl: './ashtam.component.html',
  styleUrls: ['./ashtam.component.css']
})
export class AshtamComponent {

  serialNo1:string = "VA";serialNo2:string = "";serialNo3:string = "";
  locInd1:string = "";dtIssue:string = "";optGrp:string = "COR";
  ashtam:string = "";fir1:string = "";eruption:string = "";volcano:string = "";
  latLong:string = "";colorCode1:string = "";ashXtnt:string = "";
  ashCloud:string = "";airRoutes:string = "";altRoutes:string = "";
  srcInfo:string = "";remarks:string = "";help:string = "";mDisplay:string = "";
  sshow1:boolean = false;
  sshowIt1:boolean = false;
  sshowIt2:boolean = false;
  sshowIt3:boolean = false;
  ffin:any = [];

  target1:Array<string> = ["OMAD","SVAC","SVCH","SVAD","LGAG","OMAM","OTBK","OTBH","LGAX","LGBL","SVAN","LGAD","SVAB","SKAP","LGRX","SVAA","SVAS","DNAS","EGEI","NCAT","SVBS","SVBL","SVFM","EPKG","OBBB","OBBS","OBKH","LTFD"
  ,"SVBC","SVBI","SVBM","SVBB","SVBO","TNCB","SVBZ","SKBU","SKBN","SVCI","SVCD","SVCL","SVCN","SVCC","SVCS","SVCO","SVCZ","SKGO","SVCP","NZCG","SVQM","SVCA","LGSA","MWCB","CYCK","SVCB","SVPI","MRCU","EKCN"
  ,"SVCR","SKCV","SVUR","SVCU","SVRB","TNCF","TNCC","LGTT","VRMD","OMDW","SVLL","SVED","SVRS","SVEM","SVJI","SVVG","LGEL","SVEZ","NZEV","EDTF","SVFT","VRMR","SKGB","SVGU","SVGD","SVGT","SVGI","SVQJ","EKHM"
  ,"SVQF","LSPK","SVQL"];

  target2:Array<string> = ["AA","AB","AC","AD","BA","BB","BC","BD","CA","CB","CC","CD"];

  OptGrp(event:any)
  {
    switch(event.target.value)
    {
      case "new":
      this.sshow1 = false;
      break;
      case "modfy":
      this.sshow1 = true;
      break;
    }
  }

  AllClear()
  {
    this.serialNo2 = "";this.serialNo3 = "";this.locInd1 = "";this.dtIssue = "";
    this.ashtam = "";this.fir1 = "";this.eruption = "";this.volcano = "";
    this.latLong = "";this.colorCode1 = "";this.ashXtnt = "";this.ashCloud = "";
    this.airRoutes = "";this.altRoutes = "";this.srcInfo = "";this.remarks = "";
    this.help = "";this.mDisplay = "";this.sshow1 = false;
  }

  getIndi(event:any)
  {
    let x;
    if(event.target.id == 'serialNo2')
    {
      this.checkIndi(this.serialNo2, x=1, this.target2);
    }
    else if(event.target.id == 'locInd1')
    {
      this.checkIndi(this.locInd1, x=2, this.target1);
    }
    else if(event.target.id == 'fir1')
    {
      this.checkIndi(this.fir1, x=3, this.target1);
    }
  }

  checkIndi(nme,x,targ)
  {
    var _this = this;
    let count:number = 0;
    this.ffin.splice(0,(this.ffin.length));
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
            this.ffin.push(targ[tg]);
           }else if(ttl2 != nme.toUpperCase())
             {
                count++;
                  for(let j = 0; j < this.ffin.length; j++)
                  {
                    if(this.ffin[j] == targ[tg])
                    {
                      this.ffin.splice(j,1);
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
        for(let i = 0; i < this.ffin.length; i++)
        {
          for(let j = 0; j < this.ffin.length; j++)
          {
            if(this.ffin[i] == this.ffin[j])
            {
              cnt++;
              if(cnt > 1)
              {
               this.ffin[j] = '';
               }
            }
            if( j == this.ffin.length-1){cnt = 0;}
          }
        }
        if(x == 1){this.sshowIt1 = true;}
        else if(x == 2){this.sshowIt2 = true;}
        else if(x == 3){this.sshowIt3 = true;}
      count = 0;
        for(let j in this.ffin)
        {
          if(this.ffin[j] == '')
          {
            this.ffin.splice(parseInt(j),1);
          }
        }
    }else
    {
      if(x == 1){this.sshowIt1 = false;}
      else if(x == 2){this.sshowIt2 = false;}
      else if(x == 3){this.sshowIt3 = false;}
       this.clearAuto();
    }
  }

  autoClick1(f:any)
  {
    this.serialNo2 = f;
    this.sshowIt1 = false;
  }

  autoClick2(f:any)
  {
    this.locInd1 = f;
    this.sshowIt2 = false;
  }

  autoClick3(f:any)
  {
    this.fir1 = f;
    this.sshowIt3 = false;
  }

  clearAuto()
  {
    this.ffin.splice(0,(this.ffin.length));
  }

  helpMsgs: Array<any> =
  [
    {name:"serialNo2",value:"geographical designator for States, e.g. NZ = New Zealand"},
    {name:"serialNo3",value:"ASHTAM serial number in a four-figure group."},
    {name:"locInd1",value:"four-letter location indicator of the flight information region concerned"},
    {name:"dtIssue",value:"date/time of report, whereby:  MM = month, e.g. January = 01, December = 12 YY = day of the month GGgg = time in hours (GG) and minutes (gg) UTC;"},
    {name:"",value:""},
    {name:"fir1",value:"Flight information region affected, plain- language equivalent of the location indicator given in the abbreviated heading, in this example “Auckland  Oceanic FIR”."},
    {name:"eruption",value:"Date and time (UTC) of first eruption"},
    {name:"volcano",value:"Name of volcano, and number of volcano as listed in the ICAO Manual on Volcanic Ash, Radioactive Material and Toxic Chemical Clouds"},
    {name:"latLong",value:"Latitude/Longitude of the volcano in whole degrees or radial and distance of volcano from NAVAID"},
    {name:"colorCode1",value:"<RED-Alert>:-Volcano dangerous, eruption likely, with ash plume/cloud expected to rise  above FL 250.<ORANGE Alert>:-Volcano dangerous, eruption likely but ash plume/cloud not expected to reach FL 250.<YELLOW Alert>:-Volcanic activity has decreased significantly, volcano not currently considered dangerous but caution should be exercised.<GREEN Alert>:-Volcanic activity considered to have ceased and volcano reverted to its normal state."},
    {name:"ashXtnt",value:"If volcanic ash cloud of operational significance is reported, indicate the horizontal extent and  base/top of the ash cloud using latitude/longitude (in whole degrees) and altitudes in thousands of metres (feet) and/or  radial and distance from source volcano. Information  initially may be based only on special air-report, but  subsequent information may be more detailed based on advice from the responsible meteorological watch office and/or volcanic ash advisory centre."},
    {name:"ashCloud",value:"Indicate forecast direction of movement of the ash cloud at selected levels based on advice from the  responsible meteorological watch office and/or volcanic ash advisory centre."},
    {name:"airRoutes",value:"Indicate air routes and portions of air routes  and flight levels affected, or expected to become affected."},
    {name:"altRoutes",value:"Indicate closure of airspace, air routes or portions of air routes, and availability of alternative routes."},
    {name:"srcInfo",value:"Source of the information, e.g. “special  air-report” or “vulcanological agency”, etc. The source of  information should always be indicated, whether an eruption has actually occurred or ash cloud reported, or not."},
    {name:"remarks",value:"Include in plain language any operationally significant information additional to the  foregoing."},
    {name:"optGrp",value:""}
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
