import { Component, OnInit } from '@angular/core';
import { KeyValue } from '../../model/KeyValue';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { KeyvalueService } from '../../service/keyvalue.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css'],
  providers: [KeyvalueService]
})
export class CreateadminComponent implements OnInit {

 public myForm: FormGroup;
 keyValue: KeyValue;
 editingStatus=false;
 errMessage="";
 currentKeyID="";
 isDataAvailable=false
 
 //Initialize config params
  keyMinSize = environment.CONFIG_ADMIN_CREATE_KEY_MINSIZE;
  keyMaxSize = environment.CONFIG_ADMIN_CREATE_KEY_MAXSIZE;
  valueMinSize = environment.CONFIG_ADMIN_CREATE_VALUE_MINSIZE;
  valueMaxSize = environment.CONFIG_ADMIN_CREATE_VALUE_MAXSIZE;
  keyValidationText = environment.CONFIG_ADMIN_VALIDATION_TEXT_KEY;

 
    constructor(private _fb: FormBuilder,
				private keyvalueService:KeyvalueService,
				private activatedRoute: ActivatedRoute,
				private router: Router) {
					
		if('id' in this.activatedRoute.snapshot.params) {
		  this.editingStatus = true;
		  console.log("Editing status", this.editingStatus);
		}
	}
	
    ngOnInit() {
		/* ADDED THIS TO THE WORKING CODE*/
			    if (this.editingStatus)
	  {
		  if(this.activatedRoute.snapshot.params['id']){
				  this.activatedRoute.params.switchMap((params: Params) => {
				  let id = params['id'];
				  this.currentKeyID = id;
				  console.log("Inside ngOnInit" + id);
				  if(typeof params['id'] !== "undefined" && params[id] !== null)
				  {
					console.log("Inside type of params" + id); 
					return this.keyvalueService.getKeyValue(id);
				  }
				  
			  }).subscribe(res => {
				  console.log("Inside subscribe" + res);
				  this.keyValue = res;
				   this.isDataAvailable =true;
					  this.myForm = this._fb.group({
					  key: [this.keyValue.key, [Validators.required, Validators.minLength(this.keyMinSize), Validators.maxLength(this.keyMaxSize), Validators.pattern(/^\S*$/)]],
							values: this._fb.array([])
					});
				
				// add value
				for(var i = 0; i<this.keyValue.values.length; i++)
				{
					this.addEditValue(this.keyValue.values[i].value);
				}
				 
			  }, err => {
				  console.log (err);
			  })
		  }
		 
	  } 
		  else{
			  
					 this.isDataAvailable =true;
					  this.myForm = this._fb.group({
					  key: ['', [Validators.required, Validators.minLength(this.keyMinSize), Validators.maxLength(this.keyMaxSize), Validators.pattern(/^\S*$/)]],
					values: this._fb.array([])
				});
				
				// add value
				this.addValue();
				
				/* subscribe to values value changes */
				// this.myForm.controls['valuees'].valueChanges.subscribe(x => {
				//   console.log(x);
				// })
		
		  }
		
		
		
		
		
		
		
		
		
		/* END OF ADDED THIS TO THE WORKING CODE*/
		
        
    }

    initValue() {
        return this._fb.group({
            value: ['', [Validators.required, Validators.minLength(this.valueMinSize), Validators.maxLength(this.valueMaxSize)]]
        });
    }

    addValue() {
        const control = <FormArray>this.myForm.controls['values'];
        const addrCtrl = this.initValue();
        
        control.push(addrCtrl);
        
        /* subscribe to individual value value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }
	
	
	initEditValue(value: string) {
        return this._fb.group({
            value: [value, Validators.required],
        });
    }

    addEditValue(value: string) {
        const control = <FormArray>this.myForm.controls['values'];
        const addrCtrl = this.initEditValue(value);
        
        control.push(addrCtrl);
        
        /* subscribe to individual value value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeValue(i: number) {
        const control = <FormArray>this.myForm.controls['values'];
        control.removeAt(i);
    }

    save(model: any) {
        // call API to save
        // ...

		
		
		
		
		console.log("Key value =", this.keyValue);
		   if (this.editingStatus)
	  {
		        this.keyValue.key = model.value.key;
		        this.keyValue.values = model.value.values;
				console.log("In editing status", this.currentKeyID, this.keyValue);
				 this.keyvalueService.updateKeyValue(this.keyValue, this.currentKeyID).subscribe(res => {
				  //this.message.msg = "An error saving the post";
				  this.router.navigate(['/administration/view']);
			  }, err => {
				  console.log (err);
				  this.errMessage = "error";
				});
	  }else {
		          this.keyValue = model.value;
				  this.keyvalueService.createKeyValue(this.keyValue).subscribe(res => {
				  //this.message.msg = "An error saving the post";
				  this.router.navigate(['/administration/view']);
			  }, err => {
				  console.log (err);
				  this.errMessage = "error";
				});
	  }
    }

}
