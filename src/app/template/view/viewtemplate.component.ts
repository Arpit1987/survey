import { Component, OnInit } from '@angular/core';
import { Template } from '../../model/template';
import  { TemplateService } from '../../service/template.service';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';


@Component({
  selector: 'app-viewtemplate',
  templateUrl: './viewtemplate.component.html',
  styleUrls: ['./viewtemplate.component.css'],
  providers: [TemplateService]
})
export class ViewTemplateComponent implements OnInit {

   constructor(private templateService: TemplateService, private router: Router) { }
   templates: Template[] = [];
   template: Template;
   errMessage = "";
 
   mockdata = GlobalVariable.MOCK_DATA;
   
   
  ngOnInit() {
	let obj = {"isTemplate" : "true"};
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
		
	  if (id)
	  {
		 this.templateService.deleteTemplate(id).subscribe(res => {
		 this.templates.splice(index, 1);
		  //console.log (res.id);
		  //this.message.msg = "An error saving the post";
		  this.router.navigate(['/template/view']);
	  }, err => {
		  console.log (err);
		  this.errMessage = "error";
		});
	 }
	}
	
 
  

}
