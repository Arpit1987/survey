import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//Login related components
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import {RoutingComponent} from './routing/routing.component';

//Dashboard component
import { MydashboardComponent } from './mydashboard/mydashboard.component';

//Admin related Components
import { AdministrationComponent } from './administration/view/administration.component';
import { CreateadminComponent } from './administration/createadmin/createadmin.component';
import { ValueComponent } from './administration/createadmin/value.component';

//Report related Components
import { ReportComponent } from './report/report.component';

//Checklist related components
import { FormtemplateComponent } from './template/form/formtemplate.component';
import { ViewTemplateComponent } from './template/view/viewtemplate.component';
import { CreateChecklistComponent } from './checklist/create/createchecklist.component';
import { FillChecklistComponent } from './checklist/fill/fillchecklist.component';
import { ViewchecklistComponent } from './checklist/view/viewchecklist.component';
import { CompletedstatusComponent } from './report/completedstatus/completedstatus.component';
import { SuperadminComponent } from './superadmin/superadmin.component';

import { EmailTemplateComponent } from './email-template/edit/email-template.component';
import { ViewEmailTemplateComponent } from 'app/email-template/view/view.component';
import { CreatesurveyComponent } from './survey/create/createsurvey.component';
import { FillsurveyComponent } from './survey/fill/fillsurvey.component';
import { ViewsurveyComponent } from './survey/view/viewsurvey.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes = [
  {
    path: '',
    component: RoutingComponent // Default Route
  },
  {
    path: 'mydashboard',
    component: MydashboardComponent, // Dashboard Route,
    canActivate: [AuthGuard], // User must be logged in to view this route
	data: { 
      expectedRoles: ['Admin', 'View']
    }
  },
  {
    path: 'register',
    component: RegisterComponent, // Register Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'login',
    component: LoginComponent, // Login Route
    canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  },
  {
    path: 'profile',
    component: ProfileComponent, // Profile Route
    canActivate: [AuthGuard], // User must be logged in to view this route
	data: { 
      expectedRoles: ['Admin', 'View']
    }
  },
  {
    path: 'administration/view',
    component: AdministrationComponent, 
    canActivate: [AuthGuard],
	data: { 
      expectedRoles: ['Admin', 'View']
    } 	// User must be logged in to view this route
  },
   {
    path: 'administration/create',
    component:  CreateadminComponent, 
    canActivate: [AuthGuard],
	data: { 
      expectedRoles: ['Admin']
    } // User must be logged in to view this route
  },
  {
    path: 'administration/:id/edit',
    component:  CreateadminComponent, 
    canActivate: [AuthGuard],
	data: { 
      expectedRoles: ['Admin']
    } 	// User must be logged in to view this route
  },
   { 	path: 'administration/superadmin', 
		component: SuperadminComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['SuperAdmin']
		}
   },
  {
    path: 'report',
    component:  ReportComponent, 
    canActivate: [AuthGuard], // User must be logged in to view this route
	data: { 
      expectedRoles: ['Admin', 'View']
    }
  },
  {
    path: 'reportCompleted',
    component:  CompletedstatusComponent, 
    canActivate: [AuthGuard], // User must be logged in to view this route
	data: { 
      expectedRoles: ['Admin', 'View']
    }
  },
  
   { 
		path: 'checklist/create', 
		component: CreateChecklistComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
   },
   { 
		path: 'checklist/:id/fill', 
		component: FillChecklistComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
   },
   { 
		path: 'checklist/:id/fill/view', 
		component: FillChecklistComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
   },
   { 	
		path: 'checklist/view', 
		component: ViewchecklistComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
   },
   { 	
		path: 'checklist/:id', 
		component: CreateChecklistComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
   },
   { 	
		path: 'checklist/:id/edit', 
		component: CreateChecklistComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}	
   },
   
    { 
		path: 'template/create', 
		component: FormtemplateComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin']
		}
	},

   
   { 
		path: 'template/view', 
		component: ViewTemplateComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}	
   },
   { 
		path: 'template/:id/view', 
		component: FormtemplateComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
	},
   { 	path: 'template/:id/edit', 
		component: FormtemplateComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin']
		}
   },
   { 	path: 'email', 
   component: EmailTemplateComponent,
   //component: TestQuillComponent,
   canActivate: [AuthGuard],
   data: { 
     expectedRoles: ['Admin']
   }
  },

  { 
		path: 'email/view', 
		component: ViewEmailTemplateComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}	
   },
  
   { 
		path: 'email/:id/edit', 
		component: EmailTemplateComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
	},
  { 
		path: 'survey/create', 
		component: CreatesurveyComponent,
		canActivate: [AuthGuard],
		data: { 
			expectedRoles: ['Admin', 'View']
		}
   },
  
  
  
 
  { path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
