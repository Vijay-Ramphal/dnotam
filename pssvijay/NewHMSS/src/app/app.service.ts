import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, Response, URLSearchParams, RequestOptions, RequestMethod, Headers, ResponseContentType } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/render3/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TouchSequence } from 'selenium-webdriver';

//import { BrowserModule } from '@angular/platform-browser';
@Injectable()
export class AppService {
	//public server = "http://192.168.1.10:8080/"
	public server = "http://localhost:8080/"
	public authenticationUrl = "auth"
	public token: string = "";
	private user: string = "";
	private role: string = "";


	//logVisible:string = '';


	//private loggedin : boolean = false;
	headers = new Headers();
	private loggedin = new Subject<string>();
	login$ = this.loggedin.asObservable();
	private loginrole = new Subject<string>();
	role$ = this.loginrole.asObservable();
	constructor(public http: Http,
		//private route: ActivatedRoute,
	    private router: Router,
	) { }

	ngOnInit() { }
	attemptAuth(Credentials) {
		//console.log("Inside 1");
		this.getHeaders();
		this.setPostOperation(this.authenticationUrl, Credentials)
			.subscribe((ResponseText => {

				//console.log("Inside 2");
				console.log(ResponseText);
				//console.log(ResponseText.token);

				this.token = ResponseText.token;
				this.headers.append('Authorization', this.token);
				this.router.navigateByUrl('/navigation');
				this.user = Credentials.username;
				this.loggedin.next(this.user);
				if (this.user == "user1"){
					this.loginrole.next("SUPERVISOR");
					this.role = "SUPERVISOR";
				}
				else if (this.user == "user2"){
					this.loginrole.next("ATSBOOKING");
					this.role = "ATSBOOKING";
				}					
				else {
					this.loginrole.next("AISSUPERVISOR");
					this.role = "AISSUPERVISOR";
				}
				this.setSession(this.token);
				// console.log(this.user);
				// console.log(this.role);
				// this.setPostOperation('',Credentials.username)
				// .subscribe(ResponseText => {
				// 	console.log(ResponseText);
				//    }),
				//    (ResponseError => 
				// 	{
				// 		console.log(ResponseError._body);
				// 	});
			}),
			ResponseError => {
				//alert(ResponseError._body);
				//console.log(ResponseError._body);
				this.router.navigateByUrl('');
			});
	}

	private setSession(authResult) {
        localStorage.setItem('id_token', authResult);
    }          

	public setPostOperation(url, textBody) {
		let options = new RequestOptions({ method: RequestMethod.Post, headers: this.headers });
		return this.http.post(this.server + url, textBody, options)
			.map(data => { return data.json(); },
			error => { return error.json(); })
			.catch(this._errorHandler);
	}

	public setGetOperation(url) {
		let options = new RequestOptions({ method: RequestMethod.Get, headers: this.headers });
		return this.http.get(this.server + url, options)
			.map((res: Response) => (res.json()))
			.catch(this._errorHandler);
	}

	public setDeleteOperation(url) {
		let options = new RequestOptions({ method: RequestMethod.Delete, headers: this.headers });
		return this.http.delete(this.server + url, options)
			.map((res: Response) => (res.json()))
			.catch(this._errorHandler);
	}

	_errorHandler(error: Response) {
		//alert(error);
		//console.error(error);
		return Observable.throw(error || "Internal Server Error");
	}

	getHeaders() {
		this.headers.append('Access-Control-Allow-Credentials', 'false');
		this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
		this.headers.append('Content-Type', 'application/json');
		return this.headers;
	}

	getChannelPrefix() {
		if (this.user == "user1")
			return "BKA";
		else if (this.user == "user2")
			return "SUA";
		else
			return "BKZ";

			
	}

	getOriginIndicator() {
		if (this.user == "user1")
			return "VOMMYFYX";
		
		else if (this.user == "user2")
			return "VOMMYNYX";
		else
			return "VOMMYFYZ";
	}

	getRole() {
      console.log("getrole:"+this.role)
		return this.role;
		
		
	}

	getLoggedin() {
		return this.loggedin;
	}

	logout() {
		localStorage.removeItem("id_token");
		this.loggedin.next("");
		this.token = "";
		this.headers.delete('Authorization');
		this.router.navigateByUrl('/login');
		this.user = "";
	}

	changeRole(role) {
		this.loginrole.next(role);
		this.role=role;
		console.log(this.role);
		this.getRole()
		console.log("getrol:"+this.role);
		
		// this.role$.subscribe(
		// 	(role)=>{
				
		
		// 		this.loginrole.next(role);
		// 		this.role=role;
		// 		console.log("changerole:"+this.role);
		// 	});
		
			
	}
}