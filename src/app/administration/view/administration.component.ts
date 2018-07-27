import { Component, OnInit } from '@angular/core';
import { KeyvalueService } from '../../service/keyvalue.service';
import { KeyValue } from '../../model/KeyValue';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  providers: [KeyvalueService]
})
export class AdministrationComponent implements OnInit {

 constructor(private keyvalueService: KeyvalueService,
			private router: Router) { }

   keyValues: KeyValue[] = [];
  
  ngOnInit() {
	  this.keyvalueService.getAllKeys().subscribe(res=>{
		  console.log(res);
		  this.keyValues = res as KeyValue[];
		  console.log(this.keyValues);
	  }, err=>{
		  console.log(err);
	  });
  }
  
   deleteKey(id: String, index:number)
	{
	  console.log(id,index);
	  if (id)
	  {
		  console.log("deletekey", id);
		 this.keyvalueService.deleteKey(id).subscribe(res => {
			 if (index > -1) {
				this.keyValues.splice(index, 1);
			 }
		  //console.log (res.id);
		  //this.message.msg = "An error saving the post";
		  this.router.navigate(['/administration/view']);
	  }, err => {
		  console.log (err);
		});
	 }
	}
	
	addForm(){
		this.router.navigate(['/administration/create']);
	}

}
