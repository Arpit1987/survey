import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Template } from '../model/template';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global';
import { MockTemplates } from '../mockdata/template.mockdata';

@Injectable()
export class TemplateService {

	serverURL = GlobalVariable.BASE_API_URL + '/templates';
	 mockdata = GlobalVariable.MOCK_DATA;
	 
	//serverURL = "http://localhost:8080/"
	headers = new Headers({
		  'Content-type': 'application/json',
});
	options: RequestOptions;
template: Template;
   constructor(private http: Http) { }
   
	getTemplates(): Observable<Template[]>{
		let url= this.serverURL;
		console.log(url);
		return this.http.get(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
   }
   
   getTemplate(id: string): Observable<any>{
		console.log("getTemplate:", id);
		let url= this.serverURL + "/" + id;
		return this.http.get(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
	
   }
   
   createTemplate(template: Template): Observable<any>{
	
	let url= this.serverURL;
	console.log("Inside CreateTemplate", url, template);
	console.log("HEADERS",this.headers);
	return this.http.post(url, template, {headers:this.headers}).map(res => {
			  this.template = res.json();
			   console.log("After create:", this.template);
               return this.template;
	}).catch(err =>{
		return Observable.throw(err);
	});
   }
   
   cloneTemplate(id: String): Observable<any>{
	
	//let id = this.template._id;
	console.log("Inside Clone Template", id);
	let cloneurl= this.serverURL + "/" + id + '/clone';
	let url= this.serverURL + "/" + id;
	console.log("Inside Clone Template", cloneurl, url, id);
	console.log("HEADERS",this.headers);
/*	return this.http.post(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});*/
			
	
	       return this.http.post(cloneurl, {headers:this.headers}).map(res => {
               this.template = res.json();
			   console.log("After post:", this.template);
               return this.template;
			   
            });
         /*   .flatMap((template) => this.http.put(url, body, {headers:this.headers}).map(res => {
				 this.template = res.json();
               return this.template;
            })); */

   }

   
   updateTemplate(template: Template, id: string): Observable<Template>{
	console.log("Inside update template", template);
	let url= this.serverURL + "/" + id;
	return this.http.put(url, template, {headers:this.headers}).map(res => {
		this.template = res.json();
		console.log("After put:", this.template);
        return this.template;
	
	}).catch(err =>{
		console.log("caught an error in updating template");
		return Observable.throw(err);
	});
   }
   
   updateValues(template: Template): Observable<any>{
	console.log("Inside update values", template);

	let url= this.serverURL + "/updatevalue";
	return this.http.put(url, template, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
	});
   }
   
    deleteTemplate(id: String): Observable<Template> {
		let url= this.serverURL + "/" + id;
		return this.http.delete(url, {headers:this.headers}).map(res => res.json() as Template).catch(err =>{
		return Observable.throw(err);
		});
   
    }  
	
	
 
    search(options: any): Observable<any> {
	
	let params = new URLSearchParams();
	for(let key in options){
		params.set(key, options[key]) 
	}	
	console.log(params.toString());
	
   // let filter = encodeURI(JSON.stringify(str));
	//console.log("filter", filter);

	let url = this.serverURL +"?" + params.toString();
	console.log("url", url);

	return this.http.get(url, { headers: this.headers} ).map(res => res.json() as Template).retryWhen((errors) => {
        return errors
            .mergeMap((error) => (error.status === 429) ? Observable.throw(error) : Observable.of(error))
            .take(2);
    }).catch(err => {

      return Observable.throw(err);
    });



  }
  
      searchByURL(params: any): Observable<any> {

	console.log(params.toString());
	
   // let filter = encodeURI(JSON.stringify(str));
	//console.log("filter", filter);

	let url = this.serverURL +"?" + params.toString();
	console.log("url", url);

	return this.http.get(url, { headers: this.headers} ).map(res => res.json() as Template).retryWhen((errors) => {
        return errors
            .mergeMap((error) => (error.status === 429) ? Observable.throw(error) : Observable.of(error))
            .take(2);
    }).catch(err => {

      return Observable.throw(err);
    });



  }
  
	getMockTemplates(){
		//console.log("Inside getMockTemplates");
       return Observable.of(MockTemplates);
	/*
		let url= this.serverURL;
		console.log(url);
		return this.http.get(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
		return Observable.throw(err);
		*/
	}
	
	/*
	getMockTemplate(id: String): Promise<Template>{
		return return this.getHeroes()
        .map((heroes: Hero[]) => heroes.find(hero => hero.id === id));
	}*/
}