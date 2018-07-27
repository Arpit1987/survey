import { Component, OnInit } from '@angular/core';
import { Template } from '../model/template';
import  { TemplateService } from '../service/template.service';
import { Router } from '@angular/router';
import {AuthService } from '../service/auth.service';

@Component({
  selector: 'app-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrls: ['./mydashboard.component.css'],
  providers: [TemplateService, AuthService]
})
export class MydashboardComponent implements OnInit {

  constructor(private templateService: TemplateService,
			  private authService: AuthService,
				private router: Router) { }
  templates: Template[] = [];
	countOpenTemplates = 0;
	countOpenSurveys = 0;
  countClosedTemplates = 0;
  countAvailableTemplates=0;
  countAvailableChecklists=0;
  heading="";
  
	openTemplates: Template[] = [];
	openSurveys: Template[] = [];
  closedTemplates: Template[] = [];
  templateArray: Template[] = [];
  checklistArray: Template[] = [];
  showArray: Template[] = [];
  viewArray: any[] = [];
  viewHeadingArray: {str:string, width:string, sortby:string, align:string}[] = [];
  isAvailableTemplate = false;
  isOpenChecklists = false; 
  isClosedChecklists = false;
  currentRoleAdmin = false;
  highlightedDiv = 1;
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "templateName";
		public sortOrder = "asc";
	isSurvey: boolean;
	isSurveyString: string;

  ngOnInit() {
	 let obj = {};
	
	   this.templateService.search(obj).subscribe(res=>{
		  console.log("ViewTemplate:" + res);
		  this.templates = res as Template[];
		  if(JSON.parse(this.authService.loadUser()).role === "Admin")
		  {
			  this.currentRoleAdmin=true;
		  }
		  console.log(this.templates);
		  for (var i = 0; i<this.templates.length; i++)
		  {
        //console.log(this.templates[i].isSurvey);
				//this.isSurvey = this.templates[i].isSurvey;				
				//this.isSurveyString = this.isSurvey.toString();								
				if((this.templates[i].checklistStatus === "open") && ((this.templates[i].isTemplate).toString() === 'false'))
				{					
					if((this.templates[i].isSurvey).toString() === 'true'){						
						this.openSurveys.push(this.templates[i]);
						this.countOpenSurveys++;	
					}
				}
				if((this.templates[i].checklistStatus === "open") && ((this.templates[i].isTemplate).toString() === 'false'))
			  {					
					if((this.templates[i].isSurvey).toString() === 'false'){
						console.log("I am here 1");
						this.openTemplates.push(this.templates[i]);
						this.countOpenTemplates++;	
					}
			  }
			  if ((this.templates[i].checklistStatus === "closed")&& ((this.templates[i].isTemplate).toString() === 'false'))
			  {
					if((this.templates[i].isSurvey).toString() === 'true'){		
						console.log("I am here 2");
				  	this.closedTemplates.push(this.templates[i]);
				  	this.countClosedTemplates++;
					} 				
			  }
			  if((this.templates[i].isTemplate).toString() === 'true')
			  {
				   console.log("I am here 3",);
				    this.templateArray.push(this.templates[i]);
				  this.countAvailableTemplates++;
			  }
			   if((this.templates[i].isTemplate).toString() === 'false')
			  {
				   console.log("I am here 3",);
				    this.checklistArray.push(this.templates[i]);
				  this.countAvailableChecklists++;
			  }
			  this.clickToTemplates();
			  
		  }
		  console.log("length:", this.templates.length, "open", this.countOpenTemplates, "closed", this.countClosedTemplates, "templates", this.countAvailableTemplates);
		  
			}, err=>{
				console.log(err);
		});
  }
  
  clickToTemplates(){
	 this.showArray = this.templateArray;
	 this.heading = "Template Store";
	 this.isAvailableTemplate = true;
	 this.isOpenChecklists = false;
	 this.isClosedChecklists = false;
	  this.toggleHighlight(1);
	 
  }
  
  toggleHighlight(newValue: number) {
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
    }
    else {
      this.highlightedDiv = newValue;
    }
  }
  
  
  clickToOpen(){
	  this.showArray = this.openTemplates;
	  this.heading = "Open Checklists";
	   this.isAvailableTemplate = false;
	   this.isOpenChecklists = true;
	   this.isClosedChecklists = false;
	    this.toggleHighlight(2);
	}
	
	clickToOpenSurveys(){
	  this.showArray = this.openSurveys;
	  this.heading = "Open Surveys";
	   this.isAvailableTemplate = false;
	   this.isOpenChecklists = true;
	   this.isClosedChecklists = false;
	    this.toggleHighlight(2);
  }

  clickToClosed(){
	  this.showArray = this.closedTemplates;
	  this.heading = "Closed Checklists";
	   this.isAvailableTemplate = false;
	   this.isOpenChecklists = false;
	   this.isClosedChecklists = true;
	  this.toggleHighlight(4);
  }
  
  clickToReport(){
	  this.toggleHighlight(4);
	   this.router.navigate(['/report']);
  }
  
  clickNewChecklist(){
	  this.router.navigate(['/checklist/create']);
	}
	
	clickNewSurvey(){
	  this.router.navigate(['/survey/create']);
  }

  clickNewTemplate(){
	  this.router.navigate(['/template/create']);
  }
  
  
  deleteTemplate(id: String, index:number)
	{
		
	  if (id)
	  {
		 this.templateService.deleteTemplate(id).subscribe(res => {
		 this.templates.splice(index, 1);
		  //console.log (res.id);
		  //this.message.msg = "An error saving the post";
		  //this.router.navigate(['/mydashboard']);
		  //this.router.navigateByUrl('..')
	  }, err => {
		  console.log (err);
		 // this.errMessage = "error";
		});
	 }
	}
  
  

 

}
