import { Component, OnInit } from '@angular/core';
import { EmailTemplate } from '../../model/emailTemplate';
import  { EmailTemplateService } from '../../service/email-template.service';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../global';


@Component({
  selector: 'app-viewemailtemplate',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [EmailTemplateService]
})
export class ViewEmailTemplateComponent implements OnInit {

   constructor(private templateService: EmailTemplateService, private router: Router) { }
   templates: EmailTemplate[] = [];
   template: EmailTemplate;
   errMessage = "";
 
   mockdata = GlobalVariable.MOCK_DATA;
   
   
  ngOnInit() {
	//let obj = {"isTemplate" : "true"};
	 this.templateService.getEmailTemplates().subscribe(res=>{
		  console.log("ngOnInit ViewTemplate res is:" + res);
		  this.templates = res as EmailTemplate[];
		  console.log('ngOnInit:after fetching the email templates:'+this.templates);
			}, err=>{
				console.log(err);
		});
  }
  
  
  deleteTemplate(id: String, index:number)
	{
    console.log('deleteTemplate id is:'+id);
	  if (id)
	  {
      console.log('id is not null and going to delete');
		 this.templateService.deleteEmailTemplate(id).subscribe(res => {
		 this.templates.splice(index, 1);
		  //console.log (res.id);
		  //this.message.msg = "An error saving the post";
		  this.router.navigate(['/email/view']);
	  }, err => {
		  console.log (err);
		  this.errMessage = "error";
		});
	 }
	}
}
