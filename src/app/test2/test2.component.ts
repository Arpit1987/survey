import { Tag } from '../model/checklist';
import { Value } from '../model/checklist';
import { ChecklistsService } from '../mockdata/checklist.mockdata';
import { Router, ActivatedRoute } from '@angular/router';
import { Checklist } from '../model/checklist';
import { Observable } from 'rxjs/Observable';
import { 
  Form, FormGroup, FormBuilder, 
  FormArray, Validators, FormControl 
} from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import  { TemplateService } from '../service/template.service';
import { Template } from '../model/template';
import { KeyvalueService } from '../service/keyvalue.service';
import { KeyValue } from '../model/KeyValue';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
  providers: [ChecklistsService, TemplateService, KeyvalueService]
})
export class Test2Component implements OnInit {
  templates: Template[] = [];
  template: Template;
  keyValues: KeyValue[] = [];
  checklist: Checklist;
  checklistForm: FormGroup;
  editingStatus: boolean = false;
  informarray: FormArray;
  valueadd = true;
  listOptions = [];
  
  constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
              private checklists: ChecklistsService,
			  private templateService: TemplateService,
			  private keyvalueService: KeyvalueService) {
    if('id' in this.activatedRoute.snapshot.params) {
      this.editingStatus = true;
    }
  }

  ngOnInit() {
    // Fetch the checklist id if it is present then get the checklist and pass it to
    // the initForm method.
	this.initdata();
    if (this.editingStatus) {
      this.checklist = this.checklists.getChecklist();
      this.initForm(this.checklist) // handles both the create and edit logic
    } else {
      this.initForm() // handles both the create and edit logic
    }
  }
  initdata()
  {
	  this.templateService.getTemplates().subscribe(res=>{
		  console.log("ViewTemplate:" + res);
		  this.templates = res as Template[];
		  console.log(this.templates);
	  }, err=>{
		  console.log(err);
	  });
	  
	  this.keyvalueService.getAllKeys().subscribe(res=>{
		  console.log(res);
		  this.keyValues = res as KeyValue[];
		  console.log(this.keyValues);
	  }, err=>{
		  console.log(err);
	  });
  }
  /**
   * Sends update and create method requests to the api
   * @method onSubmit
   */
  onSubmit() {
    if( this.checklistForm.valid ) {
      console.log('checklist form is valid');
    }
  }

  /**
   * Initialises the checklistForm 
   * @method initForm
   */
  initForm(checklist?: Checklist):void {
    let templateName: string;
	let templateID: string;
    let templateDesc: string;
	let isTemplate: boolean;
	  
    if(checklist) {
	  console.log("we are editing an existing checklist");
      templateName = checklist.templateName;
	  templateID = checklist.templateID;
	  templateDesc = checklist.templateDesc;
	  isTemplate = checklist.isTemplate;
    } else {
	  console.log("we are creating a fresh checklist");
	  templateName = '';
	  templateID = '';
	  templateDesc = '';
	  isTemplate = false;
    }
    // let name = 'Dubai Checklist';
    let tags: FormArray = new FormArray([]);
    let values: FormArray = new FormArray([]);
	
    this.checklistForm = new FormGroup({
      templateName: new FormControl('', Validators.required), 
	  templateID: new FormControl('', Validators.required),
	  templateDesc: new FormControl(''),
	  isTemplate: new FormControl(false),
      tags: tags
    })
    // Creating a new checklist
    if(!checklist) {
    //  this.addTag();
     // this.addValue(0);
    } else {
    // Editing a checklist 
      checklist.tags.forEach((tag, tagIndex) => {
        this.addTag(tag);
        tag.values.forEach((value, valueIndex) =>{
          this.addValue(tagIndex, value);
        })
      })
    }
  }

  /**
   * Adds a tag FormGroup to the tags <FormArray>FormControl(__tags__)
   * @method addTag
   * @param void
   * @return void
   */
  addTag(tag?: Tag):void {
    let values = new FormArray([]);
    let key = tag ? tag.key : '';
	//let tagvalues = tag ? tag.tagvalues : []; --> uncomment this 
    (<FormArray>this.checklistForm.controls['tags']).push(
      new FormGroup({
        key: new FormControl(key, Validators.required),
		tagvalues: new FormControl([]), // make a change here  to take tagvalues
        values: values
      })
    )
  }

  /**
   * Adds a value FormGroup to the tag's <FormArray>FormControl(__values__)
   * @method addValue
   * @param {tagIndex} index of the tag to which value is to be added
   * @return {void}
   */
  addValue(tagIndex: number, val?: Value):void {
    let value = val ? val.value : '';
    
    (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['tags'])
      .controls[tagIndex]).controls['values']).push(
        new FormGroup({
          value: new FormControl(value, Validators.required),
        })
    )
  }
  
  removeValue(tagIndex: number){
	  (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['tags'])
      .controls[tagIndex]).controls['values']).removeAt(0);
  }
  
  removeAlltagsByControl(){
	  //Makes null but doesnt refresh view
	 const arr = (<FormArray>this.checklistForm.controls['tags']);
	 arr.controls = [];
	 (<FormArray>this.checklistForm.controls['tags']).removeAt(0);
	 
  }
   addtags(arr: any []){
	  //Makes null but doesnt refresh view
	  console.log("arr =", arr);
	  for(var i = 0; i <arr.length;i++)
	  {
		  this.addTag();
		  console.log("Adding tag");
		  for (var j = 0; j < arr[i].values.length; j++) 
		  {
			console.log("Adding value");  
			this.addValue(i)
		  }
	  }
  }
  
   removeAllValuesbycontrol(){
    let tagsArr = this.checklistForm.get('tags') as FormArray;
	console.log("tagsArr", tagsArr.length);
	
	for(var i=0; i<tagsArr.length; i++)
	{
	  let valuesarray = (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['tags'])
      .controls[i]).controls['values']);
		valuesarray.controls = [];
		(<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['tags'])
		  .controls[i]).controls['values']).removeAt(0);
	}
   }
   
   add5values(){
	   
   }
  
  
  removeAllValues(){
	let tagsArr = this.checklistForm.get('tags') as FormArray;
	console.log("tagsArr", tagsArr.length);
	
	for(var i=0; i<tagsArr.length; i++)
	{
		let valuesarray = (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['tags'])
      .controls[i]).controls['values']);
		console.log("valuesarray", valuesarray.length);
		for(var j=0; j<=valuesarray.length; j++)
		{
			console.log("var i,j",i,j);
			(<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['tags'])
		  .controls[i]).controls['values']).removeAt(0);
		}
	}
  }
  
  onChangeObj(newObj){
	  console.log("inside value changed");
	  console.log(newObj);
	  
	  if(typeof newObj !== "undefined" && newObj !== null)
	  {
		  this.template = newObj;
		  let mTagsArray = this.template.mTags;
		console.log("mTagsArray =", mTagsArray);
		  this.listOptions = [];
				for (let tag of mTagsArray) {
					for (let keyvalue of this.keyValues){
						if(tag.key === keyvalue.key)
						{
					
							this.listOptions.push( {
													"key": tag.key, 
													"values" : keyvalue.values 
													});
						}
					}
			
					
				}
		   console.log(this.listOptions);
		   this.removeAlltagsByControl();
		   this.addtags(this.listOptions);
			
	 }
			
	  }
  
}


