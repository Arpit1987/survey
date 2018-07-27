import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Form, FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import  { TemplateService } from '../../service/template.service';
import { Template, MandatoryTags, Participant } from '../../model/template';
import { KeyvalueService } from '../../service/keyvalue.service';
import { KeyValue } from '../../model/KeyValue';
import { environment } from '../../../environments/environment';
import  { EmailTemplateService } from '../../service/email-template.service';
import { EmailTemplate } from '../../model/emailTemplate';

import { GlobalVariable } from '../../global';

@Component({
  selector: 'app-survey',
  templateUrl: './createsurvey.component.html',
  styleUrls: ['./createsurvey.component.css'],
  providers:  [TemplateService, KeyvalueService,EmailTemplateService]
})
export class CreatesurveyComponent implements OnInit {
	emailtemplates: EmailTemplate[] = [];
	emailtemplate: EmailTemplate;
	emailtempleteID: string;

  templates: Template[] = [];
  template: Template;
  currentTemplate: Template;
  keyValues: KeyValue[] = [];
  checklistForm: FormGroup;
  editingStatus: boolean = false;
  informarray: FormArray;
  valueadd = true;
  listOptions = [];
  debug = GlobalVariable.debug;
  isDataAvailable = false;
  selectedID: string;
  /*arpit*/
  dropdownList = [];
  valueindexList = [];
  countPpant = 0;
  valueIndex = 0 ;
  PpantTagValueList = [];
  mTagindex = 0;
  selectedValues = []
  pPantKeyValue = [];
  selectedMTag: string;
  /*arpit*/
  checklistNameMinSize =  environment.CONFIG_CHECKLIST_TEMPLATENAME_MINSIZE;
  checklistNameMaxSize = environment.CONFIG_CHECKLIST_TEMPLATENAME_MAXSIZE;
  checklistDescMaxSize = environment.CONFIG_CHECKLIST_TEMPLATEDESC_MAXSIZE
  
  txtChecklistNameValid = environment.CONFIG_CHECKLIST_VALIDATION_TEXT_TEMPLATENAME;
  txtChecklistDescValid = environment.CONFIG_CHECKLIST_VALIDATION_TEXT_TEMPLATEDESC;

      constructor(private fb: FormBuilder, 
              private activatedRoute: ActivatedRoute,
			  private templateService: TemplateService,
			  private keyvalueService: KeyvalueService,
				private router: Router,
				private emailtemplateService: EmailTemplateService) {
    if('id' in this.activatedRoute.snapshot.params) {
      this.editingStatus = true;
	  console.log("Editing status", this.editingStatus);
    }
  }


  onChangeTag(index: number,pPant,mtagIndex: number){
console.log('valueindexList - ',this.valueindexList);
console.log('index - ',index);
console.log('mtagIndex - ',mtagIndex);

this.selectedMTag = this.PpantTagValueList[mtagIndex].listOptions[index].key
//this.valueindexList[pPant].index = index;
//this.valueIndex = index;
 for(let i = 0;i<this.valueindexList.length;i++)
  {
    if(this.valueindexList[i].mtagIndex == mtagIndex){
      this.valueindexList[i].index = index;
      console.log('Index Found!!');
      console.log('valueindexList - ',this.valueindexList);
    }
  }
console.log(this.valueindexList);


  }

  onOptionsSelected(options,pPant,mIndex: number){
    let isPushed: number;
    isPushed = 0; 
    this.selectedValues = Array.apply(null,options)  // convert to real Array
    .filter(option => option.selected)
    .map(option => option.value)
    console.log('Participant - ',pPant); 
    console.log('Options - ',this.selectedValues);
    
    let index: number;
    index = this.valueindexList[mIndex].index;

    console.log('MIndex - ',this.PpantTagValueList[mIndex].listOptions[index].key);
    

    if(this.pPantKeyValue.length > 0){
      for(let i = 0;i<this.pPantKeyValue.length;i++)
      {
          if(this.pPantKeyValue[i].key == this.PpantTagValueList[mIndex].listOptions[index].key){
            if(this.pPantKeyValue[i].participant == pPant+1){
              console.log('In If Condition');
              this.pPantKeyValue[i].value = this.selectedValues;
              isPushed = 1;
            }
          }
      }
      if(isPushed == 0){
        this.pPantKeyValue.push({
          "participant":pPant+1,"key":this.PpantTagValueList[mIndex].listOptions[index].key,"value":this.selectedValues
        });
      }
    }
    else{
      this.pPantKeyValue.push({
        "participant":pPant+1,"key":this.PpantTagValueList[mIndex].listOptions[index].key,"value":this.selectedValues
      });
    }

    

    console.log('pPantKeyValue - ',this.pPantKeyValue);
   }


  onSubmit(model: Template){
	 
    if( this.checklistForm.valid ) {
       console.log('template form is valid');
     }
 
   let templateID = model.templateID;
     console.log("Inside Onsubmit", model);
     
      if (this.editingStatus)
     {
        //EDIT A NEW CHECKLIST BY UPDATING
        
     }else{

      //var   num1= ((document.getElementById("0") as HTMLInputElement).value);
      for(var i = 0;i<this.pPantKeyValue.length;i++){        
        this.pPantKeyValue[i].participant = (document.getElementById((this.pPantKeyValue[i].participant-1).toString()) as HTMLInputElement).value;       
      }
      console.log('ParticipantKeyValue - ',this.pPantKeyValue);
      //console.log('Participant - ',this.countPpant);
       //CREATE A NEW CHECKLIST BY CLONING THE Template  
       this.templateService.cloneTemplate(templateID).subscribe(
           (res) => {
           console.log("cloned template:", res);						
           this.currentTemplate = res as Template;
 
             this.currentTemplate.templateName = model.templateName;
               this.currentTemplate.templateDesc = model.templateDesc;
             this.currentTemplate.templateID = model.templateID;
             this.currentTemplate.isTemplate = false;
             this.currentTemplate.checklistCurrentSection="0";
             this.currentTemplate.checklistStatus="open"
             this.currentTemplate.mTags=model.mTags;
             this.currentTemplate.participants = model.participants;
             this.currentTemplate.isSurvey = true;
             this.currentTemplate.participantKeyValue = this.pPantKeyValue;
 
     /*arpit*/
     
     this.emailtemplateService.sendEmailTemplate(this.emailtempleteID,model.participants,res._id,this.pPantKeyValue,'',this.currentTemplate.isSurvey).subscribe(res=>{
       console.log("sendEmailTemplate res is:" + res);
       }, err=>{
         console.log(err);
     });
     /*arpit*/
             
           console.log("Updating Template to =", this.currentTemplate);
           this.templateService.updateValues(this.currentTemplate).subscribe(
             (res) => {
             this.currentTemplate = res as Template;
             console.log("After update:",this.currentTemplate);
             this.router.navigate(['/mydashboard']);
             });
           }); 
       
       
     }
     
   
 
     
   }
 
   ngOnInit() {
		let obj = {"isTemplate" : "true"};
	   
		this.templateService.search(obj).subscribe(res => {
					  this.initTemplatesData(res); 
					  this.keyvalueService.getAllKeys().subscribe(res=>{
							 this.initKeyValueData(res);
							  
							   if (this.editingStatus) {
												  //we are in edit status. set id of the template. 
										this.activatedRoute.params.switchMap((params: Params)=> {
										this.selectedID = params['id'];
										console.log("template id is:======" + this.selectedID);
										return this.templateService.getTemplate(this.selectedID);
									}).subscribe(res=>{
										this.template = res;
										this.initListOptions(res);
										this.initForm(this.template) ;
										this.isDataAvailable = true;	
									});
														   
											 			 
								}
								else {
									this.initForm();// handles both the create and edit logic
									this.isDataAvailable = true;									
								}	
						   });
						    
					   });
						 this.emailtemplateService.getEmailTemplates().subscribe(res=>{
							console.log("ngOnInit ViewTemplate res is:" + res);
							this.emailtemplates = res as EmailTemplate[];
							console.log('ngOnInit:after fetching the email templates:'+this.emailtemplates);
							}, err=>{
								console.log(err);
            });
            
     }	
     initTemplatesData(res: any){
      if(res.length > 0){
       console.log("ViewTemplate:" + res);
       this.templates = res as Template[];
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
    }
    else{
          console.log("initKeyValueData: Error in getting keyvalue from db");
      }
  }		
  initListOptions(res: any){
    this.template = res;
    console.log("In editing status recieved template is", this.template);
    if(res.valueOf() != false){
      
      let mTags = this.template.mTags;
      this.listOptions = [];
      for (let tag of mTags) {										
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
    }
    console.log ("listOptions =", this.listOptions);
  }

  initForm(template?: Template):void {

    let templateName: string;
    let templateID: string;
      let templateDesc: string;
    let isTemplate: boolean;
    let isSurvey: boolean;
    let participants: Array<any>;
    let mTags: Array<any>;
    
      if(template) {
        templateName = template.templateName;
        templateID = template.templateID;
        templateDesc = template.templateDesc;
        isTemplate = template.isTemplate;
        isSurvey = true;
        participants = template.participants;
        mTags = template.mTags;
        console.log("we are editing an existing template",template.mTags.length, templateName, templateID , templateDesc, mTags);
      } else {
        console.log("we are creating a fresh template");
        templateName = '';
        templateID = '';
        templateDesc = '';
        isTemplate = false;
        isSurvey = true;
        participants = [];
        mTags = [];
      }
      // let name = 'Dubai Checklist';
        let tags: FormArray = new FormArray(mTags);
        let values: FormArray = new FormArray(mTags);
      let pPants: FormArray = new FormArray(participants);
    
      this.checklistForm = new FormGroup({
        templateName: new FormControl(templateName, [Validators.required, Validators.minLength(this.checklistNameMinSize), Validators.maxLength(this.checklistNameMaxSize), Validators.pattern(/^\S*$/)]), 
        templateID: new FormControl(templateID, Validators.required), // Do this late
        templateDesc: new FormControl(templateDesc, Validators.maxLength(this.checklistDescMaxSize)),
        isTemplate: new FormControl(false),
        isSurvey: new FormControl(true),
        participants: pPants,
        mTags: tags
      });
    
      // Creating a new checklist
      if(!template) {
      console.log("we are in new checklist add tags");
       // this.addTag();
       // this.addValue(0);
      } else {
      // Editing a checklist 
    console.log("we are in edit checklist add tags");
        template.mTags.forEach((tag, tagIndex) => {
        this.addTag(tag);
        /*  tag.tagvalues.forEach((value, valueIndex) =>{
        this.addValue(tagIndex, value);
          })*/
        });
      template.participants.forEach((pPan, index) => {
      this.addParticipant(pPan);
      });
    }
    }

    /**
   * Adds a tag FormGroup to the tags <FormArray>FormControl(__tags__)
   * @method addTag
   * @param void
   * @return void
   */
  
  addTag(tag?: MandatoryTags): void {
    //let id: String;
    let key: String;
    let values;

    //console.log('addSection: section.sectionTitle'+ section.sectionTitle);
    //console.log('addSection: section.sectionDescription'+ section.sectionDescription);
    if (tag) {

      key = tag.key;
      values = tag.values;
    } else {
      //id = '';
      key = '';
      values = [];
    }
    (<FormArray>this.checklistForm.controls['mTags']).push(
      //TODO: Refactor extract this creation of formGroup      
      new FormGroup({
      //id: new FormControl(id),
      key: new FormControl(key),
      values: new FormControl(values)
      })
    )
  }
  
  addParticipant(pPant?: Participant): void {
    console.log("Inside addParticipant");
    //let id: String;
    let name: String;

    //console.log('addSection: section.sectionTitle'+ section.sectionTitle);
    //console.log('addSection: section.sectionDescription'+ section.sectionDescription);
    if (pPant) {

      name = pPant.name;
    } else {
      //id = '';
      name = '';
    }
    (<FormArray>this.checklistForm.controls['participants']).push(
      //TODO: Refactor extract this creation of formGroup      
      new FormGroup({
      //id: new FormControl(id),
      name: new FormControl(name)
      })
    )
      
   this.dropdownList.push({
    "participant":this.countPpant,"listOptions":this.listOptions
  });

  this.countPpant++;

  this.valueindexList.push({
    "participant":this.countPpant,"index":0,"mtagIndex":this.mTagindex
  });

  this.PpantTagValueList.push({
    "participant":this.countPpant,"listOptions":this.listOptions,"mtagIndex":this.mTagindex
  });
  
  this.mTagindex++;
//console.log('Final list - ',this.dropdownList);
//console.log('valueindexList - ',this.valueindexList[0].index);
console.log('PpantTagValueList',this.PpantTagValueList);
console.log('Mtag Values',this.PpantTagValueList[0].listOptions[0].values);
//console.log('PpantTagValueList',this.PpantTagValueList[0].listOptions[0].key);
/*this.pPantKeyValue.push({
  "participant":this.countPpant,"key":this.PpantTagValueList[0].listOptions[0].key,"value":[]
});*/
this.selectedMTag = this.PpantTagValueList[0].listOptions[0].key;
  }
  
  addMTag(participant: number ){
    console.log(participant);
    
    this.PpantTagValueList.push({
      "participant":participant,"listOptions":this.listOptions,"mtagIndex":this.mTagindex
    });

    this.valueindexList.push({
      "participant":participant,"index":0,"mtagIndex":this.mTagindex
    });
    this.mTagindex++;
    //console.log('PpantTagValueList',this.PpantTagValueList)
    //console.log('PpantTagValue',this.PpantTagValueList[0].listOptions)
  }

  addValue() {
   //   const control = <FormArray>this.checklistForm.controls['pPants'];
     // const addrCtrl = this.initValue();
      
     // control.push(addrCtrl);
      
      /* subscribe to individual value value changes */
      // addrCtrl.valueChanges.subscribe(x => {
      //   console.log(x);
      // })
  }


 removeParticipant(pPant: number) {
   console.log('Participant----',pPant);
   
      for(let i = 0;i<this.pPantKeyValue.length;i++){
        console.log('Looping Participant - ',this.pPantKeyValue[i].participant);

       if(this.pPantKeyValue[i].participant == pPant+1){
        console.log('Record found....');
          this.pPantKeyValue.splice(i, 1);
          i--;
        }
      }
      const control = <FormArray>this.checklistForm.controls['participants'];
      control.removeAt(pPant);
      console.log('pPantKeyValue - ',this.pPantKeyValue);
  }





removeAlltagsByControl(){
  //Makes null but doesnt refresh view
 const arr = (<FormArray>this.checklistForm.controls['mTags']);
 arr.controls = [];
 (<FormArray>this.checklistForm.controls['mTags']).removeAt(0);
 
}
 addtags(arr: any []){
  //Makes null but doesnt refresh view
  console.log("arr =", arr);
  for(var i = 0; i <arr.length;i++)
  {
    this.addTag();
    console.log("Adding tag");
/*	  for (var j = 0; j < arr[i].values.length; j++) 
    {
    console.log("Adding value");  
    this.addValue(i)
    } */
  }
 
}

 removeAllValuesbycontrol(){
  let tagsArr = this.checklistForm.get('mTags') as FormArray;
console.log("tagsArr", tagsArr.length);

for(var i=0; i<tagsArr.length; i++)
{
  let valuesarray = (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['mTags'])
    .controls[i]).controls['values']);
  valuesarray.controls = [];
  (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['mTags'])
    .controls[i]).controls['values']).removeAt(0);
}
 }
 


removeAllValues(){
let tagsArr = this.checklistForm.get('mTags') as FormArray;
console.log("tagsArr", tagsArr.length);

for(var i=0; i<tagsArr.length; i++)
{
  let valuesarray = (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['mTags'])
    .controls[i]).controls['values']);
  console.log("valuesarray", valuesarray.length);
  for(var j=0; j<=valuesarray.length; j++)
  {
    console.log("var i,j",i,j);
    (<FormArray>(<FormGroup>(<FormArray>this.checklistForm.controls['mTags'])
    .controls[i]).controls['values']).removeAt(0);
  }
}
}

onSelectemail(event){
  console.log("inside select template");
  console.log(event.target.value);
  this.emailtempleteID = event.target.value;
}

onChangeObj(id){
  console.log("inside value changed");
  console.log(id);
  
      if(typeof id !== "undefined" && id !== null)
      {
        this.templateService.getTemplate(id).subscribe(res => {
             this.template = res;
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
            
               }, err => {
              console.log (err);
        });
        
        }
        
       
    
  }
  
}
