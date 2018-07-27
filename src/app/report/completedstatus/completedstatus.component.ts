import { Component, OnInit } from '@angular/core';
import { Data } from "../../provider/data";
import { TemplateService } from '../../service/template.service';
import { Template, MandatoryTags } from '../../model/template';

@Component({
  selector: 'app-completedstatus',
  templateUrl: './completedstatus.component.html',
  styleUrls: ['./completedstatus.component.css'],
  providers: [TemplateService]
})
export class CompletedstatusComponent implements OnInit {

  queryString = "";
  reportTemplates: Template[] = [];

  constructor(private data: Data,
			  private templateService: TemplateService) { 
	console.log(JSON.stringify(this.data.storage));
	let storage = this.data.storage;
	console.log(storage.mTags.length);
	for(let i = 0; i < storage.mTags.length; i++){
		this.queryString +="mTags.key="+ storage.mTags[i].key + "&";
		this.queryString +="mTags.values="+ storage.mTags[i].values;
		if(i < (storage.mTags.length-1))
		{
			this.queryString+="&";
		}
		
	}
	console.log(this.queryString);
	 
  }

  ngOnInit() {
	  this.templateService.searchByURL(this.queryString).subscribe(res=>{
			  console.log("ViewTemplate:" + res);
			  this.reportTemplates = res as Template[];
		
			  console.log(this.reportTemplates);
				}, err=>{
					console.log(err);
		});
  }

}
