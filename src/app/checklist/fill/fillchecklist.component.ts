import { Component, OnInit } from '@angular/core';
import { MY_FORM_MODEL } from "../../mockdata/my-dynamic-form.model";
import { DynamicFormControlModel, DynamicFormService, DynamicCheckboxModel, DynamicInputModel, DynamicRadioGroupModel, DynamicSelectModel, DynamicCheckboxGroupModel } from "@ng-dynamic-forms/core";
import { FormGroup, FormControl } from '@angular/forms';
import { Template } from '../../model/template';
import  { TemplateService } from '../../service/template.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-fillchecklist',
  templateUrl: './fillchecklist.component.html',
  styleUrls: ['./fillchecklist.component.css'],
    providers: [TemplateService, AuthService]
})
export class FillChecklistComponent implements OnInit {
	
    formModel: DynamicFormControlModel[] =[];
    formGroup: FormGroup;
	
	template: Template;
	id: string;
	sections: any;
	sectionIndex: number = 1;
	sectionScore: number = 0;
	questions: any;
	options: any;
	progressValue: number = 0;
	inputModel: DynamicInputModel;
	checkboxModelArray: DynamicCheckboxModel[] =[];
    constructor(private formService: DynamicFormService,
				private templateService: TemplateService,
				  private route: ActivatedRoute,
				  private authService: AuthService,
				  private router: Router) {}
	isDataAvailable=false;
	currentTemplate: Template;
	lastAction= 'previous';
	currentRoleAdmin = false;
	viewingStatus = false;
  ngOnInit() {

	  this.route.params.switchMap((params: Params)=> {
			this.id = params['id'];
			//console.log("id ======" + this.id);
			return this.templateService.getTemplate(this.id);
		  
		}).subscribe(response => {
			//console.log(response);
			this.template = response;
		this.sections = this.template.sections;
		this.progressValue = 1/this.sections.length;
		this.getQuestions(this.sectionIndex);
		if(JSON.parse(this.authService.loadUser()).role === "Admin")
		  {
			  this.currentRoleAdmin=true;
		  }
		this.isDataAvailable=true;
		}, err => {
			console.log(err);
		});
		if(this.router.url.indexOf('view') !== -1){
			this.viewingStatus=true;
		}
		console.log('inside onInit');
		
  }

  nextSection(formModelObj: DynamicFormControlModel, formGrpObj: FormGroup) {
	  console.log("Inside next Section", this.sectionIndex, this.template.sections[this.sectionIndex].questions.length);
	  
	  console.log("In next section.formModelObj[0] is", formModelObj[0]);
	  this.updateAnswers(formModelObj, formGrpObj);
	  
	  
    if (this.sectionIndex < this.sections.length) {
      //for (let i = this.sectionIndex - 1; i < this.sectionIndex; i++) {
		  this.sectionIndex++;
     		this.getQuestions(this.sectionIndex);
      //}
	  this.progressValue = (this.sectionIndex+1)  /  this.sections.length;
	  //this.sectionIndex++;
     // this.selectedOptions.length = 0;
    }
	console.log("end of method", this.sectionIndex);
	this.lastAction = 'next';
  }
  
  previousSection(formModelObj: DynamicFormControlModel, formGrpObj: FormGroup) {
	console.log("Inside previous section", this.sectionIndex);
	/* if(this.lastAction === 'next'){
		console.log('lastAction was next');
		this.lastAction='previous';
		this.sectionIndex--;
	} */
	this.updateAnswersForPrev(formModelObj, formGrpObj);
	if (this.sectionIndex >= 1) {
	  this.sectionIndex--;
  /*    for (let i = this.sectionIndex - 1; i < this.sectionIndex; i--) {
      //  var selectedAnswers = String(this.selectedOptions);
      //  var correctAnswer = String(this.sections[i].answer);
      /*  if (selectedAnswers === correctAnswer) {
          this.quizScore++;
        }*/
     //   if (this.sectionIndex === this.sections.length) {
    //      this.calculateScore();
     //   }
	 this.getQuestions(this.sectionIndex);
	// console.log("i=",i);
    //  }
	  this.progressValue = (this.sectionIndex)  /  this.sections.length;
	  
      
     // this.selectedOptions.length = 0;
    }
   }
  
  getQuestions(index: number){
	  //console.log("enetered getQuestions:", index);
	  this.questions = [];
	  this.questions = this.template.sections[index-1].questions;
	  //console.log('this.questions size is'+this.template.sections[index-1].questions.length);
	//  console.log("questions for index", index, this.questions);
	  
	  this.createModel(this.questions);
  }
  
  getOptions(index: number){
	  //console.log("getOptions:", index);
	  this.options = this.questions[index].options;
	  //console.log('this.options.length'+this.options.length);
	  if(this.options.length>0)
	  {
		//console.log("options for index", index, this.options);
		for (let i = 0; i < this.options.length; i++) {
			this.options[i].value= "value" + i;
			this.options[i].label=this.options[i].optionTitle;
		}
		//console.log("options for index", index, this.options);
	  }
	  else 
	  {
		 console.log("length of options is 0");
	  }
  }
  
   
/*
  calculateScore() {
    this.quizScore = (this.quizScore / this._quiz.length) * 100;
    this._quizService.quizDone(true);
    this._quizService.quizScore(this.quizScore);
  }
*/
 
	//	console.log("Sections", this.sections);
  createModel(questions: any){
	  //console.log(" createModel: length of questions", questions.length);
	    this.formModel = [];
		let sectionNum = this.sectionIndex;
	  for (let i = 0; i < questions.length; i++) {
		 //console.log("inside createModel i is:", i);
		 //console.log('createModel:this.template.sections[this.sectionIndex] is'+ this.template.sections[this.sectionIndex].sectionTitle);
		 //console.log('createModel:this.template.sections[this.sectionIndex] is'+ this.template.sections[this.sectionIndex].questions.length);		
		//console.log('this.template.sections[this.sectionIndex].questions[i].value'+this.template.sections[this.sectionIndex].questions[i].value);		 
		  this.getOptions(i);
		  console.log(" createModel:questions[i].questionType", questions[i].questionType);
		switch (questions[i].questionType) {
			case "Free Text":
			 // console.log("Free text");
			  this.formModel[i] = new DynamicInputModel({

						id: "id" + sectionNum + i,
						label: questions[i].questionTitle,
						maxLength: 42,
						placeholder: "345 hrs",
						value: questions[i].value? questions[i].value:'Type In Here'
					});
			  break;
			case "Multiple Choice Radio":
				//console.log("Multiple Choice");
				this.formModel[i] =	new DynamicRadioGroupModel<string>({

					id: "id" + sectionNum + i,
					label: questions[i].questionTitle,
					options: /*[
						{
							label: "LOE",
							value: "option-1",
						},
						{
							label: "Unit Testing",
							value: "option-2"
						},
						{
							label: "Performance Testing",
							value: "option-3"
						}
					]*/ this.options,
					value: questions[i].value? questions[i].value: 'option-1'
				});
			  break;
			  
			  case "Multiple Choice":
				//console.log("Multiple Choice");
				this.formModel[i] =	new DynamicSelectModel<string>({

					id: "id" + sectionNum + i,
					label: questions[i].questionTitle,
					options: /*[
						{
							label: "LOE",
							value: "option-1",
						},
						{
							label: "Unit Testing",
							value: "option-2"
						},
						{
							label: "Performance Testing",
							value: "option-3"
						}
					]*/ this.options,
					value: questions[i].value?questions[i].value:''
				});
			  break;
			case "Yes/No":
			    console.log('entered Yes/No');
				this.formModel[i] =	new DynamicRadioGroupModel<string>({

					id: "id" + sectionNum + i,
					label: questions[i].questionTitle,
					options: [
						{
							label: "Yes",
							value: "Yes",
						},
						{
							label: "No",
							value: "No"
						},
					],
					value: questions[i].value
				});
			  break;
			  
			  case "Check Boxes":
 			 //console.log("YesNo");
			 console.log('entered Check Boxes');
			 this.createCheckBoxGroup(i);
				this.formModel[i] =	new DynamicCheckboxGroupModel({
					id: "id" + sectionNum + i,
					label: questions[i].questionTitle,
					group: this.checkboxModelArray
				});
			break; 
			  
			default:
			 // console.log("entered default. some problem so making it as text box");
			  this.formModel[i] = new DynamicInputModel({

						id: "id" + sectionNum + i,
						label: questions[i].questionTitle,
						maxLength: 160,
						placeholder: ""
					});
		  }
		  //console.log("in createModel", this.formModel[i]);

	}
	
  
   //this.formService.removeFormGroupControl();
   this.formGroup = this.formService.createFormGroup(this.formModel);
   //console.log('createModel:this.formGroup is:'+this.formGroup);

	}
	
	saveSection(template: Template, formGrpObj: FormGroup, formModelObj: DynamicFormControlModel, finished: string){
	//  console.log("Inside save section");
	//  console.log(this.id);
	//  console.log("template saved is - ", template);
	  
	 // this.payLoad = JSON.stringify(this.myForm.value);
	 // console.log(this.formGroup.value);
	  
	 // let body = {}
	
	console.log('saveSection:formGrpObj is'+JSON.stringify(formGrpObj));
	console.log("finished =", finished);
	//console.log('saveSection:formModelObj is'+JSON.stringify(formModelObj[2].value));
	
	this.updateAnswers(formModelObj, formGrpObj);
	this.template.checklistCurrentSection = this.sectionIndex.toString();
	
	if(finished === "yes" ){
		this.template.checklistStatus = "closed";
		
	}
	
	 this.templateService.updateTemplate(this.template, this.id).subscribe((res) => {
						this.currentTemplate = res as Template;
				//		console.log("After update:",this.currentTemplate);
				if( finished !== "yes") {
						this.router.navigate(['/checklist/'+ this.id + "/fill"]);
				}else{
					this.router.navigate(['/mydashboard']);
				}
					 }, err =>{
				//		console.log (err);
						//this.errMessage = "error";
				  });		
		
		
  }
  
   //  var selectedAnswers = String(this.selectedOptions);
      //  var correctAnswer = String(this.sections[i].answer);
      /*  if (selectedAnswers === correctAnswer) {
          this.quizScore++;
        }*/
     //   if (this.sectionIndex === this.sections.length) {
    //      this.calculateScore();
     //   }
	 
	 /*
  // selected options
  selected(elem: any) {
    elem.classList.toggle('active');
    this.selectedOptions.length = 0;
    for (var i = 0; i < this.activeOptions.length; i++) {
      this.selectedOptions.push(this.activeOptions[i].innerHTML);
    }
  }
*/
updateAnswers(formModelObj: DynamicFormControlModel, formGrpObj: FormGroup){
	  let propName='';
	  let sectionNum = 0;
	  console.log("Inside updateAnswers:formModelObj is:", JSON.stringify(formModelObj));
	  //console.log("formModelObj values", formModelObj.value);
	  console.log("this.sectionIndex is:"+this.sectionIndex);
	  console.log("this.template.sections.length is:"+this.template.sections.length);
	  
	  var questionsLength= this.template.sections[this.sectionIndex-1].questions.length; 
	  console.log('questionsLength is:'+questionsLength);
	  for (let j = 0;j < questionsLength;j++) {
		  sectionNum = this.sectionIndex;
		  propName='id'+sectionNum + j;
		  console.log(' updateAnswers propName is:'+propName);
		  console.log(' updateAnswers questionType is:'+this.template.sections[this.sectionIndex-1].questions[j].questionType);
		  //console.log("updateAnswers: j value is"+j);
		  //console.log('updateAnswers:formModelObj[j].value'+formModelObj[j].value);
		  console.log('updateAnswers:JSON.stringify(formGrpObj)' + JSON.stringify(formGrpObj));
		 
		  switch (this.template.sections[this.sectionIndex-1].questions[j].questionType) {
			 /* case "Free Text":
				this.template.sections[this.sectionIndex-1].questions[j].value = formModelObj[j].value;
				  break;
			 case "Yes/No":	  
				 this.template.sections[this.sectionIndex-1].questions[j].value = formModelObj[j].value;
				 break;	 */	
			 case "Check Boxes":
				console.log("update: entered:Check Boxes");
				console.log('update:Check Boxes:'+formGrpObj[propName]['materialCheckbox1']);
				let chkBoxId = "cboxId" + sectionNum + j;
				

				 
				 break;
			default: 	 
				 this.template.sections[this.sectionIndex-1].questions[j].value = formModelObj[j].value;
		 }	 
		//this.template.sections[this.sectionIndex].questions[j].value = formModelObj[j].value;
	  }
}

updateAnswersForPrev(formModelObj: DynamicFormControlModel, formGrpObj: FormGroup){
	  let propName='';
	  let sectionNum = 0;
	  console.log("Inside updateAnswers:formModelObj is:", JSON.stringify(formModelObj));
	  //console.log("formModelObj values", formModelObj.value);
	  console.log("this.sectionIndex is:"+this.sectionIndex);
	  console.log("this.template.sections.length is:"+this.template.sections.length);
	  
	  var questionsLength= this.template.sections[this.sectionIndex-1].questions.length; 
	  console.log('questionsLength is:'+questionsLength);
	  for (let j = 0;j < questionsLength;j++) {
		  sectionNum = this.sectionIndex;
		  propName='id'+sectionNum + j;
		  console.log(' updateAnswers propName is:'+propName);
		  console.log(' updateAnswers questionType is:'+this.template.sections[this.sectionIndex-1].questions[j].questionType);
		  //console.log("updateAnswers: j value is"+j);
		  //console.log('updateAnswers:formModelObj[j].value'+formModelObj[j].value);
		  console.log('updateAnswers:JSON.stringify(formGrpObj)' + JSON.stringify(formGrpObj));
		 
		  switch (this.template.sections[this.sectionIndex-1].questions[j].questionType) {
			 /* case "Free Text":
				this.template.sections[this.sectionIndex-1].questions[j].value = formModelObj[j].value;
				  break;
			 case "Yes/No":	  
				 this.template.sections[this.sectionIndex-1].questions[j].value = formModelObj[j].value;
				 break;	 */	
			 case "Check Boxes":
				console.log("update: entered:Check Boxes");
				console.log('update:Check Boxes:'+formGrpObj[propName][0]);
				 this.template.sections[this.sectionIndex-1].questions[j].value = formGrpObj[propName];
				 break;
			default: 	 
				 this.template.sections[this.sectionIndex-1].questions[j].value = formModelObj[j].value;
		 }	 
		//this.template.sections[this.sectionIndex].questions[j].value = formModelObj[j].value;
	  }
}

  createCheckBoxGroup(i: number){
		console.log('enttered createCheckBoxGroup:i is:'+i);
		for(let x=0;x<this.template.sections[this.sectionIndex-1].questions[i].options.length;x++){
                this.checkboxModelArray.push(new DynamicCheckboxModel(
                    {
                        id: "cboxId" + this.sectionIndex + i + x,
                        label: "Checkbox" +this.sectionIndex +i + x,
						value: this.template.sections[this.sectionIndex-1].questions[i].value=='true'? true:false
                    }
                ));
        }
		
		console.log('createCheckBoxGroup:'+this.checkboxModelArray.length);
  }	
}
