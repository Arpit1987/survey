import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

	redirectUrl;
	checklistURL;
	
  constructor(
    private authService: AuthService,
		private router: Router,
		private location: Location
  ) {
		var pathString = location.path();
		console.log('login Component: pathString...');
		//console.log(pathString);  
		
		//console.log('SubString = ',pathString.substring(11,35));
		if(pathString.substring(1,10) === 'checklist' && pathString.substring(36,41) === 'fill'){
			this.setPreviousURL(pathString);
		}		 
	}

	setPreviousURL(pathString: string)
	{
		this.checklistURL = pathString;
		console.log(this.checklistURL);
	}

	getPreviousURL(){
		return this.checklistURL;
	}

  // Function to check if user is authorized to view route
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Check if user is logge din
	
	
	if (!this.authService.loggedIn())
	{
		console.log("you are not logged in");

		this.router.navigate(['/login']); // Return error and route to login page
		return false;
	}
	else {
		
		let expectedRoles = route.data["expectedRoles"] as Array<string>;
		let userRole = JSON.parse(this.authService.loadUser()).role;
		console.log("you are logged in", expectedRoles, userRole);				

		if(expectedRoles.indexOf(userRole) != -1){
			 console.log("you are logged in, and you have the right access");			 
			  //this.redirectUrl = state.url;
			  //this.router.navigate(this.redirectUrl);
			return true;
			
			
		}else{
			 console.log("you are logged in, but you dont have the right access. Contact Admin");
			 //this.redirectUrl = state.url;
			// console.log(this.redirectUrl);
			// this.router.navigate(this.redirectUrl);
			 return false;
		}
		
	}
	
	
	}
	
}
