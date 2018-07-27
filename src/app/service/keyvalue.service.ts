import { Injectable } from '@angular/core';
import { GlobalVariable } from '../global';
import { Http, Headers } from '@angular/http';
import { KeyValue } from '../model/KeyValue';
import { Observable } from 'rxjs';

@Injectable()
export class KeyvalueService {

 serverURL = GlobalVariable.BASE_API_URL + '/keyvalues';
	
	constructor(private http: Http) { }
	
	headers = new Headers({
	  'Content-type': 'application/json',
	});

  getAllKeys(): Observable<KeyValue[]>{
  	let url= this.serverURL;
	
		return this.http.get(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
   }
   
    getKeyValue(id: string): Observable<any>{
		console.log("getTemplate:", id);
		let url= this.serverURL + "/" + id;
		return this.http.get(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
	
   }
   
   
   	getValuesForKey(key: string): Observable<KeyValue>{
	let url= this.serverURL + key;
	return this.http.get(url, {headers:this.headers}).map(res => res.json() as KeyValue).catch(err =>{
		return Observable.throw(err);
	});
   }
   
   createKeyValue(keyValue: KeyValue): Observable<any>{
	
	let url= this.serverURL;
	console.log("Inside Createkeyvalue", url, keyValue);
	console.log("HEADERS",this.headers);
	return this.http.post(url, keyValue, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
   }
   
  updateKeyValue(keyValue: KeyValue, id: string): Observable<any>{
	console.log("Inside update KeyValue", keyValue);
	let url= this.serverURL + "/" + id;
	console.log("Inside update KeyValue", keyValue, "url =", url);
	return this.http.put(url, keyValue, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
   } 

    deleteKey(id: String): Observable<KeyValue> {
		console.log("deleteKeyservice", id);
		let url= this.serverURL + "/" + id;
		return this.http.delete(url, {headers:this.headers}).map(res => res.json() as KeyValue).catch(err =>{
		return Observable.throw(err);
		});
   
    }  
	
    search(options: any): Observable<any> {

	let params = new URLSearchParams();
	for(let key in options){
		params.set(key, options[key]) 
	}	
	console.log(params.toString());

	let url = this.serverURL +"?" + params.toString();
	console.log("url", url);

	return this.http.get(url, { headers: this.headers} ).map(res => res.json() as KeyValue).retryWhen((errors) => {
        return errors
            .mergeMap((error) => (error.status === 429) ? Observable.throw(error) : Observable.of(error))
            .take(2);
    }).catch(err => {

      return Observable.throw(err);
    });



  }
	
}
