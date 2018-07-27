import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Form, FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { EmailTemplate } from '../../model/emailTemplate';
import { KeyvalueService } from '../../service/keyvalue.service';
import { EmailTemplateService } from '../../service/email-template.service';
import { environment } from '../../../environments/environment';
import { GlobalVariable } from '../../global';
import { KeyValue } from '../../model/KeyValue';

@Component({
  selector: 'app-e-mail',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css'],
  providers:  [EmailTemplateService,KeyvalueService]
})
export class EmailTemplateComponent implements OnInit {
  emailTemplateForm: FormGroup;  
  debug = GlobalVariable.debug;
  isDataAvailable = false;
  selectedID: string;  
  editingStatus = false;
  viewingStatus = false;
  errMessage = "";
  template: EmailTemplate;
  dbTemplate: EmailTemplate;
  currentTemplate: EmailTemplate;
  _id = '';
  keyValues: KeyValue[] = [];
  contentText: string;
  selectedKey: string;
  
  //Initialize config params
    templateNameMinSize = environment.CONFIG_TEMPLATE_TEMPLATENAME_MINSIZE;
    templateNameMaxSize = environment.CONFIG_TEMPLATE_TEMPLATENAME_MAXSIZE;
    templateDescMaxSize = environment.CONFIG_TEMPLATE_TEMPLATEDESC_MAXSIZE;
    txtTemplateNameValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_TEMPLATENAME;
    txtTemplateDescValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_TEMPLATEDESC;

    constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
			  private emailTmpltService: EmailTemplateService,
        private router: Router,
        private keyvalueService: KeyvalueService) {
          console.log("URL contains view", this.router.url.indexOf('view') !== -1);
          if('id' in this.activatedRoute.snapshot.params) {
              this.editingStatus = true;
              this.viewingStatus=false;
              console.log("Editing status", this.editingStatus);
          } else{
            this.viewingStatus=true;
          }
          // if(this.router.url.indexOf('view') !== -1){
          //   this.viewingStatus=true;
          // }  

  }

  
  
  ngOnInit() {
    
    this.keyvalueService.getAllKeys().subscribe(res=>{
		  console.log(res);
		  this.keyValues = res as KeyValue[];
		  console.log(this.keyValues);
	  }, err=>{
		  console.log(err);
	  });
    
    if (this.editingStatus) {
      this.activatedRoute.params.switchMap((params: Params)=> {
          this._id = params['id'];          
          console.log("email template id is:======" + params['id']);
          return this.emailTmpltService.getEmailTemplate(this._id);
            }).subscribe(response => {               
                console.log('response from getTemplate is:'+response);
                this.dbTemplate = response;
                console.log('dbTemplate.templateName is:'+this.dbTemplate.emailTemplateName);
                // this.initForm(this.template); // handles both the create and edit logic
                this.initForm(this.dbTemplate);
                this.contentText = this.dbTemplate.contentText;
                //Sudheer added 3
                this.isDataAvailable = true;
            }, err => {
                console.log(err);
            }); 
            }
            else{
              this.initForm();
            }
      }

     /**
   * Initialises the checklistForm 
   * @method initForm
   */
  initForm(emailTemplate?: EmailTemplate):void {
   
    let templateName = '';        
    let templateDesc = '';
    let contentType = 'Select One';
    let subjectText = 'Please Type In';
    let contentText = 'Please Type In';

    if(this.dbTemplate !=null){
      console.log('dbTemplate is Not nuLL');
       templateName = this.dbTemplate.emailTemplateDesc? this.dbTemplate.emailTemplateName : '';
       templateDesc = this.dbTemplate.emailTemplateDesc? this.dbTemplate.emailTemplateDesc : '';   
       contentType = this.dbTemplate.contentType? this.dbTemplate.contentType : '';   
       subjectText = this.dbTemplate.subjectText? this.dbTemplate.subjectText: '';
       contentText = this.dbTemplate.contentText? this.dbTemplate.contentText: '';
     console.log("we are creating a fresh template");
      }else{
        console.log('Creating a new form');
      }    
    this.emailTemplateForm = new FormGroup({
      emailTemplateName: new FormControl(templateName, [Validators.required, Validators.minLength(this.templateNameMinSize), Validators.maxLength(this.templateNameMaxSize), Validators.pattern(/^\S*$/)]), 
      emailTemplateDesc: new FormControl(templateDesc, Validators.maxLength(this.templateDescMaxSize)),
      contentType: new FormControl(contentType),
      subjectText: new FormControl(subjectText),
      contentText: new FormControl(contentText)
    });
  this.isDataAvailable = true;
  }

    onSubmit(model: any){
      console.log('inside onSubmit:model is:'+JSON.stringify(model));
      if(this.editingStatus){
        model._id = this._id;
        console.log('inside onSubmit:model.id is:'+model.id);

        this.emailTmpltService.updateEmailTemplate(model, this._id).subscribe((res) => {
              this.currentTemplate = res as EmailTemplate;
              console.log("After update:",this.currentTemplate);
              this.router.navigate(['/email/view']);
             }, err =>{
              console.log (err);
              this.errMessage = "error";
            });		
    }else{
      this.emailTmpltService.createEmailTemplate(model).subscribe(res => {
        this.router.navigate(['/email/view']);
      }, err => {
        console.log ('Got an error while saving the email Template:',err);
        this.errMessage = "error";
      });
    }
  }


  replacePlaceHolder(){
    this.contentText = this.contentText.replace('$','#'+this.selectedKey) ;
    console.log( this.contentText);
    return false;
  }

  onChangeKey(key: string){
    console.log('key = ',key);
     this.selectedKey = key;
  }
}