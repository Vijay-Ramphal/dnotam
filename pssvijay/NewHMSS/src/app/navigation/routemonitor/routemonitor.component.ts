import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-routemonitor',
  templateUrl: './routemonitor.component.html',
  styleUrls: ['./routemonitor.component.css']
})
export class RoutemonitorComponent implements OnInit {

	// isStart1:boolean=false;
	// isStart2:boolean=false;
	// isStart3:boolean=false;
	// isStart4:boolean=false;
	subscriptions:any=[];
	numberofchannels:any=[];
	responseText:string = '';
	responseText1:string = '';
	responseText2:string = '';
	responseText3:string = '';
	responseText4:string = '';
	//data:string="";
	channel_prefix:string="";
	url="api/v1/command/stream/";
	//monitorResponse:any=[];
	//subscription;
	// stoprequest:string = '';
	// startrequest:string = '';
  constructor(private _myService: AppService) {  	}  
  ngOnInit(){}

	stopMonitor(event, stopId, startId, inputId, index)
	{
		// this.stoprequest = event.target.id;
		// alert(this.stoprequest);
		alert(this.subscriptions);
		var stop=<HTMLInputElement>document.getElementById(stopId);stop.disabled = true;
		var start=<HTMLInputElement>document.getElementById(startId);start.disabled = false;
		var input=<HTMLInputElement>document.getElementById(inputId);input.disabled = false;
		//this.isStart1 = false;
		this.numberofchannels[index] = "";
		this.subscriptions[index].unsubscribe();
		this._myService.setPostOperation(this.url + input.value.toUpperCase().trim() + "/stop", "")
		.subscribe(data => {
			this.responseText = data.response;		
			alert("stopped Successfully.");			
			input.value="";
			// var modal = <HTMLInputElement>document.getElementById('myModal');
			// modal.style.display = "block";
			// this.data="Record saved Successfully.";
		}),
		(ResponseError => 
		{
			console.log(ResponseError._body);
			//alert("Error: "+JSON.stringify(ResponseError._body));
		});			
	}
	
	fetchData(channel)
	{
		//var monitorResponseMsg={message:""};		
		this._myService.setGetOperation(this.url + channel +"/fetch")
		.subscribe(data => {
			this.responseText = JSON.stringify(data.messages);
			alert(this.responseText);
			//console.log(this.responseText);
			// monitorResponseMsg.message=this.responseText
			// this.monitorResponse.push(JSON.stringify(data.messages));
		}),
		(ResponseError => 
		{
			console.log(ResponseError._body);
			//alert("Error: "+JSON.stringify(ResponseError._body));
		});				
	}

	startMonitor(event, stopId, startId, inputId, index)
	{
		//this.startrequest = event.target.id; 
		let openedAlready:boolean = false;
		//this.isStart1 = false;
		var stop=<HTMLInputElement>document.getElementById(stopId);stop.disabled = false;
		var start=<HTMLInputElement>document.getElementById(startId);start.disabled = true;
		var input=<HTMLInputElement>document.getElementById(inputId);input.disabled = true;
		if(input.value.length!=0)
		{
			alert(this.numberofchannels);
			this.channel_prefix=input.value.toUpperCase().trim();
			for(let item of this.numberofchannels)
			{
				if(item == this.channel_prefix)
				{
					this.responseText = "Already A Channel is being Monitored in other Window";
					//response = ;
					alert(this.responseText);
					openedAlready = true;
					break;
				}
			}
			if(!openedAlready)
			{
				//this.isStart1 = true;
				this._myService.setPostOperation(this.url + this.channel_prefix + "/start", "")
				.subscribe(data => {
					this.responseText = data;	
					console.log(this.responseText)	;
					this.subscriptions[index] = Observable.interval(300*60).subscribe(() => {
						this.fetchData(this.channel_prefix);
					})
				}),
				(ResponseError => 
				{
					console.log(ResponseError._body);
					//alert("Error: "+JSON.stringify(ResponseError._body));
					this.responseText = ResponseError._body;
				});
				this.numberofchannels[index] = this.channel_prefix;
				start.disabled = true;
				input.disabled = true;
				stop.disabled=false;
			}
		}
		else
		{
			input.disabled=false;
			start.disabled=false;
			alert("Please enter command prefix");
			input.focus();
		}
	}

	
	Maximize(){
		var div1 =<HTMLInputElement>document.getElementById('div1');
		var height =<HTMLInputElement>document.getElementById('height');
		div1.style.display='block';
		height.style.height='600px';
		height.style.backgroundColor='';
		div1.style.width='1100px';
		//div1.style.backgroundColor='#008B8B';
		var div2 =<HTMLInputElement>document.getElementById('div2');
		div2.style.display='none';
		var div3 =<HTMLInputElement>document.getElementById('div3');
		div3.style.display='none';
		var div4 =<HTMLInputElement>document.getElementById('div4');
		div4.style.display='none';
	}
	Minimize(){
		var div1 =<HTMLInputElement>document.getElementById('div1');
		var height =<HTMLInputElement>document.getElementById('height');
		div1.style.display='';
		height.style.height='';
		height.style.backgroundColor='';
		div1.style.width='';
		var div2 =<HTMLInputElement>document.getElementById('div2');
		div2.style.display='';
		var div3 =<HTMLInputElement>document.getElementById('div3');
		div3.style.display='';
		var div4 =<HTMLInputElement>document.getElementById('div4');
		div4.style.display='';
	}
	

}
