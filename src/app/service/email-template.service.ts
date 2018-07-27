import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Template } from '../model/template';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global';
import { MockTemplates } from '../mockdata/template.mockdata';
import { EmailTemplate } from 'app/model/emailTemplate';

@Injectable()
export class EmailTemplateService {
  obj: any;

  serverURL = GlobalVariable.BASE_API_URL + '/emailTemplate';
  mockdata = GlobalVariable.MOCK_DATA;

 headers = new Headers({
     'Content-type': 'application/json',
});

emailTemplate: EmailTemplate;
emailTemplateParams: {
  emailtempleteID: string,
  participants: string
}


  constructor(private http: Http) { }

  createEmailTemplate(emailTemplate: EmailTemplate): Observable<any>{
	
    let url= this.serverURL;
    console.log("Inside createEmailTemplate", url, emailTemplate);
    console.log("HEADERS",this.headers);
    return this.http.post(url, emailTemplate, {headers:this.headers}).map(res => {
          this.emailTemplate = res.json();
           console.log("After create:", this.emailTemplate);
                 return this.emailTemplate;
    }).catch(err =>{
      return Observable.throw(err);
    });
     }


  getEmailTemplate(id: string): Observable<any>{
      console.log("Inside getEmailTemplate:id is:", id);
      let url= this.serverURL + "/" + id;
      return this.http.get(url, {headers:this.headers}).map(res => {
        this.emailTemplate = res.json();
        console.log("After getEmailTemplate:this.emailTemplate is:", this.emailTemplate);
            return this.emailTemplate;
      }).catch(err =>{
      return Observable.throw(err);
    });
    
  }

  getEmailTemplates(): Observable<EmailTemplate[]>{
    let url= GlobalVariable.BASE_API_URL + '/emailTemplates';
    console.log('inside email-template.ts:'+url);
    return this.http.get(url, {headers:this.headers}).map(res => res.json()).catch(err =>{
    return Observable.throw(err);
  });
   }

   updateEmailTemplate(tmplte: EmailTemplate, id: string): Observable<any>{
    console.log("Inside updateEmailTemplate", tmplte);
    let url= this.serverURL + "/" + id;
    console.log("Inside updateEmailTemplate", tmplte, "url =", url);
    return this.http.put(url, tmplte, {headers:this.headers}).map(res => res.json()).catch(err =>{
      return Observable.throw(err);
    });
    } 
  
  deleteEmailTemplate(id: String): Observable<EmailTemplate> {
      console.log("deleteEmailTemplate inemail-template.service", id);
      let url= this.serverURL + "/" + id;
      return this.http.delete(url, {headers:this.headers}).map(res => res.json() as EmailTemplate).catch(err =>{
      return Observable.throw(err);
      });
     
    }

    sendEmailTemplate(emailtempleteID,participants,checklistID: string,pPantKeyValue, mTags: any, isSurvey: any): Observable<any>{
  
      let emailParams = {
        participants,
        checklistID,
        pPantKeyValue,
        mTags,
        isSurvey
      }
      let url= GlobalVariable.BASE_API_URL + '/email' + "/" + emailtempleteID;
      console.log("Inside sendEmailTemplate", url);
      console.log("HEADERS",this.headers);
      return this.http.post(url, emailParams, {headers:this.headers}).map(res => {        
      }).catch(err =>{
        return Observable.throw(err);
      });
       }
}

