import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsBootstrapUIModule } from "@ng-dynamic-forms/ui-bootstrap";
import { RouterModule, Routes } from '@angular/router';
import {DataTableModule} from "angular2-datatable";
import { BsModalModule } from 'ng2-bs3-modal';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

import { AppComponent } from './app.component';
import { FormtemplateComponent } from './template/form/formtemplate.component';
import { ViewTemplateComponent } from './template/view/viewtemplate.component';
import { AppRoutingModule } from './app-routing.module';

import { CreateChecklistComponent } from './checklist/create/createchecklist.component';

import { AdministrationComponent } from './administration/view/administration.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { FillChecklistComponent } from './checklist/fill/fillchecklist.component';
import { ViewchecklistComponent } from './checklist/view/viewchecklist.component';
//import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { CreateadminComponent } from './administration/createadmin/createadmin.component';
import { ValueComponent } from './administration/createadmin/value.component';
import { ReportComponent } from './report/report.component';
import { ShowErrorsComponent } from './validators/show-errors.component';
import { UniqueNameValidatorDirective } from './validators/name-unique-validator.directive';
import { AtleastOneValidatorDirective } from './validators/value-atleastone-validator.directive';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthService } from './service/auth.service';
import { DataFilterPipe }   from './pipe/data-filter.pipe';
import { TemplateSearchPipe }   from './pipe/template-search.pipe';
import { Data } from "./provider/data";
import { CompletedstatusComponent } from './report/completedstatus/completedstatus.component';
import { SuperadminComponent } from './superadmin/superadmin.component';

import { EmailTemplateComponent } from './email-template/edit/email-template.component';
import { ViewEmailTemplateComponent } from 'app/email-template/view/view.component';
import { CreatesurveyComponent } from './survey/create/createsurvey.component';
import { FillsurveyComponent } from './survey/fill/fillsurvey.component';
import { ViewsurveyComponent } from './survey/view/viewsurvey.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { RoutingComponent } from './routing/routing.component';

@NgModule({
  declarations: [
    AppComponent,
    FormtemplateComponent,
    FillChecklistComponent,
    AdministrationComponent,
    MydashboardComponent,
    CreateChecklistComponent,
    ViewTemplateComponent,
    ViewchecklistComponent,
   // TestComponent,
    Test2Component,
    CreateadminComponent,
    ValueComponent,
    ReportComponent,
    ShowErrorsComponent,
    UniqueNameValidatorDirective,
	AtleastOneValidatorDirective,
	HomeComponent,
	LoginComponent,
	ProfileComponent,
	RegisterComponent,
	DataFilterPipe,
	TemplateSearchPipe,
	CompletedstatusComponent,
	SuperadminComponent,
	EmailTemplateComponent,
	ViewEmailTemplateComponent,
	CreatesurveyComponent,
	FillsurveyComponent,
	ViewsurveyComponent,
	RoutingComponent
  ],
  imports: [
     DynamicFormsCoreModule.forRoot(), 
     DynamicFormsBootstrapUIModule, 
     BrowserModule,
     FormsModule,
     HttpModule,
	 DataTableModule,
	 TagInputModule, 
	 BrowserAnimationsModule,
     ReactiveFormsModule,
	 BsModalModule,
	 AppRoutingModule,
   FlashMessagesModule,
   AngularMultiSelectModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }

