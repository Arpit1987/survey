import { Component, OnInit } from '@angular/core';
import { Template } from '../../model/template';
import  { TemplateService } from '../../service/template.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewchecklist',
  templateUrl: './viewchecklist.component.html',
  styleUrls: ['./viewchecklist.component.css'],
  providers: [TemplateService]
})
export class ViewchecklistComponent implements OnInit {

   constructor(private templateService: TemplateService, private router: Router) { }
   templates: Template[] = [];
   template: Template;
   errMessage = "";

  ngOnInit() {
	  let obj = {"isTemplate" : "false"};
	   this.templateService.search(obj).subscribe(res=>{
		  console.log("ViewTemplate:" + res);
		  this.templates = res as Template[];
		  console.log(this.templates);
			}, err=>{
				console.log(err);
		});
  }
  
 deleteTemplate(id: String, index:number)
	{
	  console.log(id,index);
	  if (id)
	  {
		 this.templateService.deleteTemplate(id).subscribe(res => {
		 this.templates.splice(index, 1);
		  //console.log (res.id);
		  //this.message.msg = "An error saving the post";
		  this.router.navigate(['/checklist/view']);
	  }, err => {
		  console.log (err);
		  this.errMessage = "error";
		});
	 }
	}

}
