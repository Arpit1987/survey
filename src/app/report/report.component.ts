import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../service/template.service';
import { Template, MandatoryTags } from '../model/template';
import { KeyvalueService } from '../service/keyvalue.service';
import { KeyValue } from '../model/KeyValue';
import { Form, FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Data } from "../provider/data";
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [KeyvalueService, TemplateService]
})
export class ReportComponent implements OnInit {
	
  keyValues: KeyValue[] = [];
  errMessage="";
  templates: Template[] = [];
  reportTemplates: Template[] = [];
  isDataAvailable = false;
  reportForm: FormGroup;
  listOptions = [];
  selectedKeyValues: KeyValue[] = [];
  constructor(private keyvalueService: KeyvalueService,
			private templateService: TemplateService,
			private data: Data,
			private router: Router) { }

   ngOnInit() {
		let obj = {"isTemplate" : "true"};
	   
		this.templateService.search(obj).subscribe(res => {
					  this.initTemplatesData(res); 
					  this.keyvalueService.getAllKeys().subscribe(res=>{
							 this.initKeyValueData(res);
									this.initForm();
									this.isDataAvailable = true;
								//	this.addTag();
								//	this.addTag();
									
						   });
						    
					   });
				
		 }

 initTemplatesData(res: any){
	  if(res.length > 0){
		 console.log("ViewTemplate:" + res);
		 this.templates = res as Template[];
		/* for(var i = 0; i < this.templates.length; i++){
			 this.listOptions.key = "templateName";
			 this.listOptions.values = ("values": templateName
		 } */
		 console.log("init template value", this.templates);
	  }
	   else{
				console.log("inittemplatevalue: Error in getting template from db");
		   }
 }	 

 initKeyValueData(res: any){
	if(res.length > 0){
		  console.log("ViewTemplate:" + res);
		  this.keyValues = res as KeyValue[];
		  console.log(this.keyValues);
		  //push templates data
		  let arr = [{}];
	/*	  for(var i = 0; i < this.templates.length; i ++)
		  {
			  this.arr
		  }
		  this.keyValues.push( {
					 "key": "Template", 
					 "values" : this.templates.templateName
			 });*/
	}
	else{
				console.log("initKeyValueData: Error in getting keyvalue from db");
		}
}	

 initForm():void {

	
	let mTags = [];
    let tags: FormArray = new FormArray(mTags);
    this.reportForm = new FormGroup({
		 reportType: new FormControl(),
		  mTags: tags
    });
  }
  
  
   addTag(tag?: MandatoryTags): void {
			//let id: String;
			let key = "";
			let values = [];

			(<FormArray>this.reportForm.controls['mTags']).push(
			  //TODO: Refactor extract this creation of formGroup      
			  new FormGroup({
				//id: new FormControl(id),
				key: new FormControl(key),
				values: new FormControl(values)
			  })
			)
			 this.listOptions.push( {
					 "key": this.keyValues[0].key, 
					 "values" : ""
			 });
	  }
	  getMTags(form) {
		//console.log(form.get('sections').controls);
		return form.controls.mTags.controls;
	}
	
 removeMTag(i){
   const control = <FormArray>this.reportForm.get('mTags');
   if (i > -1) {
		control.removeAt(i);
	
		this.listOptions.splice(i, 1);
	}
  }

  onSubmit(model: any)
  {
	  console.log("model=",model);
	  
	/*  let obj = {"isTemplate" : "false",
	             "mTags.key": model.mTags[0].key};*/
	  
		this.data.storage = {
            mTags: model.mTags
            }
         this.router.navigate(["reportCompleted"]);
		/*this.templateService.search(obj).subscribe(res=>{
			  console.log("ViewTemplate:" + res);
			  this.reportTemplates = res as Template[];
			  console.log(this.templates);
				}, err=>{
					console.log(err);
		}); */
		/*this.templateService.search(obj).subscribe(res => {
					  this.initTemplatesData(res); 
					  this.keyvalueService.getAllKeys().subscribe(res=>{
							 this.initKeyValueData(res);
									this.initForm();
									this.isDataAvailable = true;									
									
						   });
						    
					   }); */
				
		 }
		 
	onChangeObj(id, m){
		 let noOfTags = this.getMTags(this.reportForm).length;
		 console.log("inside value changed", id, m, noOfTags);
		 
		 let obj = this.keyValues.find(o => o.key === id);
			 console.log("changed existing tag");
			 this.listOptions[m].key = id;
			 this.listOptions[m].values = obj.values;
			 console.log(this.listOptions);
		
	}
		 




}
