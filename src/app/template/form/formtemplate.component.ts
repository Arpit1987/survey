import { Component, OnInit, ViewChild } from '@angular/core';
//import { Template } from '../../model/template';
import  { TemplateService } from '../../service/template.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable} from "rxjs";
import { GlobalVariable } from '../../global';
import { BsModalComponent } from 'ng2-bs3-modal';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Template, Section, Question, Option, MandatoryTags, Value, OwnerId } from '../../model/template';
import { KeyvalueService } from '../../service/keyvalue.service';
import { AuthService } from '../../service/auth.service';
import { KeyValue } from '../../model/KeyValue';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-formtemplate',
  templateUrl: './formtemplate.component.html',
  styleUrls: ['./formtemplate.component.css'],
  providers: [TemplateService, KeyvalueService]
})
export class FormtemplateComponent implements OnInit {

  constructor(
		private templateService: TemplateService,
		private router: Router,
		private route: ActivatedRoute,
		private keyvalueService: KeyvalueService,
		private authService: AuthService
	) {
		console.log("URL contains view", this.router.url.indexOf('view') !== -1);
		if('id' in this.route.snapshot.params) {
				this.editingStatus = true;
				console.log("Editing status", this.editingStatus);
		} 
		if(this.router.url.indexOf('view') !== -1){
			this.viewingStatus=true;
		}

	}
  errMessage = "";
  template: FormGroup;
  dbTemplate: Template;
  isDataAvailable = false;
  editingStatus = false;
  viewingStatus = false;
  currentTemplate: Template;
  _id = '';
  keyValues: KeyValue [] = [];
  keyvalue: KeyValue;
  
  //Initialize config params
  templateNameMinSize = environment.CONFIG_TEMPLATE_TEMPLATENAME_MINSIZE;
  templateNameMaxSize = environment.CONFIG_TEMPLATE_TEMPLATENAME_MAXSIZE;
  templateDescMaxSize = environment.CONFIG_TEMPLATE_TEMPLATEDESC_MAXSIZE;
  sectionNameMinSize = environment.CONFIG_TEMPLATE_SECTIONNAME_MINSIZE;
  sectionNameMaxSize = environment.CONFIG_TEMPLATE_SECTIONNAME_MAXSIZE;
  sectionDescMaxSize = environment.CONFIG_TEMPLATE_SECTIONDESC_MAXSIZE;
  questionTitleMinSize = environment.CONFIG_TEMPLATE_QUESTIONTITLE_MINSIZE;
  questionTitleMaxSize = environment.CONFIG_TEMPLATE_QUESTIONTITLE_MAXSIZE;
  txtTemplateNameValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_TEMPLATENAME;
  txtTemplateDescValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_TEMPLATEDESC;
  txtTemplateSectionNameValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_SECTIONNAME;
  txtTemplateSectionDescValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_SECTIONDESC;
  txtTemplateQuestionTitleValid = environment.CONFIG_TEMPLATE_VALIDATION_TEXT_QUESTIONTITLE;
  
  ngOnInit() {
	  
	  console.log(this.txtTemplateNameValid,this.txtTemplateDescValid,this.txtTemplateSectionNameValid,this.txtTemplateSectionDescValid,this.txtTemplateQuestionTitleValid);
	this.keyvalueService.getAllKeys().subscribe(res=>{
			console.log(res);
			  this.keyValues = res as KeyValue[];
			  console.log(this.keyValues);
									  if (this.editingStatus) {
										this.route.params.switchMap((params: Params)=> {
												this._id = params['id'];
												
												console.log("template id is:======" + params['id']);
												console.log("template id is:======" + this._id);
												return this.templateService.getTemplate(this._id);

													}).subscribe(response => {
														 
															console.log(response);
															this.dbTemplate = response;
															console.log('dbTemplate.templateName is:'+this.dbTemplate.templateName);
															// this.initForm(this.template); // handles both the create and edit logic
															this.initForm(this.dbTemplate);
															this.fillInOwners(this.dbTemplate);
															//Sudheer added 3
															this.fillInTags(this.dbTemplate);
															this.fillInSections(this.dbTemplate);
															this.isDataAvailable = true;
															if (this.viewingStatus)
															{
																this.template.disable();
															}
													//console.log('dbTemplate.templateName is:',this.dbTemplate.templateName);
													}, err => {
															console.log(err);
													}); 
												  }
												  else{
													  this.initForm();
													  this.fillInOwners(this.dbTemplate);
													  //Sudheer added 4
													  this.fillInTags(this.dbTemplate);
													  this.fillInSections(this.dbTemplate);
													  this.isDataAvailable = true;
													  
													  
												  }
			 }, err=>{
		  console.log(err);
	  });
  
  	//this.template.setValue({'isTemplate': false});
  }
  getKeyValueData(){
	   
		  
	 
  }
  initForm(dbTemplate?:Template): void{
	  if(dbTemplate){
	  let templateName = dbTemplate.templateName? dbTemplate.templateName : '';
	  let templateDesc = dbTemplate.templateDesc? dbTemplate.templateDesc : '';
	  let isTemplate =  dbTemplate.isTemplate? dbTemplate.isTemplate : true;  //hardcoded to true since this is always a temaplte
	  let checklistStatus = dbTemplate.checklistStatus? dbTemplate.checklistStatus: 'open';
	  let checklistCurrentSection = dbTemplate.checklistCurrentSection? dbTemplate.checklistCurrentSection: '0';
	  this.template = new FormGroup({
				templateName: new FormControl(templateName, [Validators.required, Validators.minLength(this.templateNameMinSize), Validators.maxLength(this.templateNameMaxSize), Validators.pattern(/^\S*$/)]),
				templateDesc: new FormControl(templateDesc, Validators.maxLength(this.templateDescMaxSize)),
				isTemplate: new FormControl(isTemplate),
				checklistStatus: new FormControl(checklistStatus), 
				checklistCurrentSection: new FormControl(dbTemplate.checklistCurrentSection),
				sections: new FormArray([]),
				//Sudheer added 1
				mTags: new FormArray([]),
				//ownerId: new FormControl(dbTemplate.ownerId),
				ownerIds: new FormArray([]),
				version: new FormControl((+dbTemplate.version + 1).toString()),
				refTemplateName: new FormControl(templateName)
				
			});
			
			
	  }else{
	  this.template = new FormGroup({
				templateName: new FormControl('', [Validators.required, Validators.minLength(this.templateNameMinSize), Validators.maxLength(this.templateNameMaxSize), Validators.pattern(/^\S*$/)]),
				templateDesc: new FormControl('', Validators.maxLength(this.templateDescMaxSize)),
				isTemplate: new FormControl(true), //hardcoded to true since this is always a temaplte
				checklistStatus: new FormControl('open'), 
				checklistCurrentSection: new FormControl('0'),
				sections: new FormArray([]),
				//Sudheer added 2
				mTags: new FormArray([]),
				//ownerId: new FormControl("smangal"),	/*hardcoded for now */
				ownerIds: new FormArray([]),
				version: new FormControl('1'),
				refTemplateName: new FormControl(''),
			});
		  
	  }
  }

	fillInOwners(dbTemplate1: Template): void{
	if(dbTemplate1){
	dbTemplate1.ownerIds.forEach((ownerId, index) => {
      this.addOwnerId(ownerId);	  

    })
	}else{
		let userName = JSON.parse(this.authService.loadUser()).username;
		let ownerId = {
			name: userName,
		}
		this.addOwnerId(ownerId);
	}
  }


    fillInSections(dbTemplate1: Template): void{
	if(dbTemplate1){
	dbTemplate1.sections.forEach((section, sectionIndex) => {
      this.addSection(section);	  
      
	  section.questions.forEach((questionObj, questionIndex) =>{
        this.addQuestion(sectionIndex, questionObj);
        
        questionObj.options.forEach(optionObj => {
          this.addOption(sectionIndex, questionIndex, optionObj);
        })
      })
    })
	}else{
		this.addSection();
		this.addQuestion(0);
	}
  }
  
  //Sudheer added 5
  fillInTags(dbTemplate1: Template): void{
	if(dbTemplate1){
		dbTemplate1.mTags.forEach((mTag, mTagIndex) => {
		  this.addMTag(mTag);
	/*	  mTag.values.forEach((value, valueIndex) =>{
			this.addMTagValue(valueIndex, value);
		})*/
	  });
	}else{
		this.addMTag();
	//	this.addMTagValue();
	}
  }

  
  addEmptySection(): void{
	  let options = new FormArray([]);
	  let questions=new FormArray([]);
	  
	options.push(new FormGroup({
			  optionTitle: new FormControl(''),
			})
			); 
	
	questions.push(new FormGroup({
			  questionTitle: new FormControl(''),
			  questionType: new FormControl(''),
			  options: options
			})); 
	  (<FormArray>this.template.controls['sections']).push(
      //TODO: Refactor extract this creation of formGroup    
	  
      new FormGroup({
        //id: new FormControl(id),
        sectionTitle: new FormControl(''),
        sectionDescription: new FormControl(''),
        questions: questions		
      })
    )
   
  }

   /**
   * Adds a Section FormGroup to the Sections <FormArray>FormControl(__sections__)
   * @method addSection
   * @param void
   * @return void
   */
   
     //Sudheer added 6
  addMTag(tag?: MandatoryTags): void {
	//let id: String;
    let key: String;
    let values = new FormArray([]);

	//console.log('addSection: section.sectionTitle'+ section.sectionTitle);
	//console.log('addSection: section.sectionDescription'+ section.sectionDescription);
    if (tag) {
        //id = section._id;
        key = tag.key;
    } else {
        //id = '';
        key = '';
    }
	console.log("tag key =", key);
	
    (<FormArray>this.template.controls['mTags']).push(
      //TODO: Refactor extract this creation of formGroup      
      new FormGroup({
        //id: new FormControl(id),
        key: new FormControl(key),
        values: values
      })
    )

  }
  
 addMTagValue(mTagIndex?: number, mTag?: Value):void {
    //let id: String;
    let value: String;

    if(mTag) {
      value = mTag.value;
    } else {
      value = '';
    }

    (<FormArray>(<FormGroup>(<FormArray>this.template.controls['sections'])
      .controls[mTagIndex]).controls['values']).push(
        //TODO: Refactor extract this creation of formGroup        
        new FormGroup({
          value: new FormControl(value)
        })
    )
  }
 
  addSection(section?: Section): void {
	//let id: String;
    let sectionTitle: String;
    let sectionDescription: String; 
    let questions = new FormArray([]);

	//console.log('addSection: section.sectionTitle'+ section.sectionTitle);
	//console.log('addSection: section.sectionDescription'+ section.sectionDescription);
    if (section) {
        //id = section._id;
        sectionTitle = section.sectionTitle;
        sectionDescription = section.sectionDescription;
    } else {
        //id = '';
        sectionTitle = '';
        sectionDescription = '';
    }
    (<FormArray>this.template.controls['sections']).push(
      //TODO: Refactor extract this creation of formGroup      
      new FormGroup({
        //id: new FormControl(id),
        sectionTitle: new FormControl(sectionTitle, [Validators.required, Validators.minLength(this.sectionNameMinSize), Validators.maxLength(this.sectionNameMaxSize), Validators.pattern(/^\S*$/)]),
        sectionDescription: new FormControl(sectionDescription, Validators.maxLength(this.sectionDescMaxSize)),
        questions: questions
      })
    )
  }
  
    addOwnerId(ownerId?: OwnerId): void {
	//let id: String;
    let name: String;

	//console.log('addSection: section.sectionTitle'+ section.sectionTitle);
	//console.log('addSection: section.sectionDescription'+ section.sectionDescription);
    if (ownerId) {
        //id = section._id;
        name = ownerId.name;
    } else {
        //id = '';
        name = '';
    }
    (<FormArray>this.template.controls['ownerIds']).push(
      //TODO: Refactor extract this creation of formGroup      
      new FormGroup({
        //id: new FormControl(id),
        name: new FormControl(name, [Validators.required, Validators.minLength(this.sectionNameMinSize), Validators.maxLength(this.sectionNameMaxSize), Validators.pattern(/^\S*$/)])
      })
    )
  }
  
  
 
    /**
   * Adds a place FormGroup to the Questions <FormArray>FormControl(__places__)
   * @method addQuestion
   * @param {sectionIndex} index of the section to which question is to be added
   * @return {void}
   */
  addQuestion(sectionIndex?: number, questionObj?: Question):void {
    //let id: String;
    let questionTitle: String;
    let questionType: String;
	let options: FormArray = new FormArray([]);

    if(questionObj) {
      questionTitle = questionObj.questionTitle;
      questionType = questionObj.questionType;
    } else {
      questionTitle = '';
      questionType = '';
    }

    (<FormArray>(<FormGroup>(<FormArray>this.template.controls['sections'])
      .controls[sectionIndex]).controls['questions']).push(
        //TODO: Refactor extract this creation of formGroup        
        new FormGroup({
          questionTitle: new FormControl(questionTitle),
          questionType: new FormControl(questionType),
          options: options
        })
    )
  }

   /**
   * Adds a new FormGroup to the Questions FormArray(FormControl)
   * @method addOption
   * @param {optionTitle} the index of the section to whose question the option is to be added
   * @param {questionIndex} the index of the question to which the option is to be added
   * @param {optionObj} Option object to be added to the Question.
   * @return {void}
   */
  addOption(sectionIndex: number, questionIndex: number, optionObj: Option): void {
    let optionTitle: String = optionObj.optionTitle;
    
    // Create and add the FormControl for picture in place
    (<FormArray>(<FormGroup>
      (<FormArray>(<FormGroup>
        (<FormArray>this.template.controls['sections'])
          .controls[sectionIndex]).controls['questions'])
          .controls[questionIndex]).controls['options']).push(
            new FormGroup({
              optionTitle: new FormControl(optionTitle)
             })
          )
  }
  initSection() {
    return new FormGroup({
      sectionTitle: new FormControl(''),
      sectionDescription: new FormControl(''),
      questions: new FormArray([
        this.initQuestion()
        ])
    });
  }
  initQuestion() {
    return new FormGroup({
      questionTitle: new FormControl(''),
      questionType: new FormControl(''),
      options: new FormArray([
        this.initOptions()
      ])
    });
  }

  initOptions() {
    return new FormGroup({
      optionTitle: new FormControl('')
    });
  }

/*   addSection() {
    const control = <FormArray>this.template.get('sections');
    control.push(this.initSection());
  }

  addQuestion(j) {
    console.log(j);
    const control = <FormArray>this.template.get(['sections',j]).get('questions');
   // console.log(control);
    control.push(this.initQuestion());
    
  } */

  add(i,j) {
    //console.log(k);
    const control = <FormArray>this.template.get(['sections',i]).get(['questions',j]).get('options');

  // const control = <FormArray>this.template.get(['sections',0,'questions',k,'options']); // also try this new syntax
    //console.log(control);
    control.push(this.initOptions());
  }

  getSections(form) {
    //console.log(form.get('sections').controls);
    return form.controls.sections.controls;
  }
  
  getMTags(form) {
    //console.log(form.get('sections').controls);
    return form.controls.mTags.controls;
  }
  
   getOwnerIds(form) {
    //console.log(form.get('sections').controls);
    return form.controls.ownerIds.controls;
  }
  getQuestions(form) {
   //console.log(form.controls.questions.controls);
    return form.controls.questions.controls;
  }
  getOptions(form) {
    //console.log(form.get('options').controls);
    return form.controls.options.controls;

  }

  removeQuestion(j){
     const control = <FormArray>this.template.get(['sections',j]).get('questions');
     control.removeAt(j);
  }

  removeSection(i){
   const control = <FormArray>this.template.get('sections');
   control.removeAt(i);

  }
  
   removeOwnerId(i){
   const control = <FormArray>this.template.get('ownerIds');
   control.removeAt(i);

  }
  
  removeMTag(i){
   const control = <FormArray>this.template.get('mTags');
   control.removeAt(i);

  }

  removeOption(i,j,k){
    console.log(i,j,k);
   const control = <FormArray>this.template.get(['sections',i,'questions',j,'options']); // also try this new syntax
   control.removeAt(k);
  }

  remove(i,j){
    const control =  <FormArray>this.template.get(['sections',i,'questions',j,'options']);
    control.removeAt(0);
    control.controls = [];
  }

  onSubmit(model: any){
    console.log ("Inside onSubmit");
	console.log (model);
	
	if(this.editingStatus){
		  model._id = this._id;
		  
		  this.templateService.updateTemplate(model, this._id).subscribe((res) => {
						this.currentTemplate = res as Template;
						console.log("After update:",this.currentTemplate);
						this.router.navigate(['/mydashboard']);
					 }, err =>{
						console.log (err);
						this.errMessage = "error";
				  });		
	}else{
		 model.refTemplateName=model.templateName;
		this.templateService.createTemplate(model).subscribe(res => {
		  console.log (res.id);
		  //this.message.msg = "An error saving the post";
		  this.router.navigate(['/mydashboard']);
	  }, err => {
		  console.log (err);
		  this.errMessage = "error";
		});
		
	}	
    }

}
 